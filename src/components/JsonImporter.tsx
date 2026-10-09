import React, { useState } from 'react';
import { 
  FileJson, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  FileText, 
  Layers, 
  BookOpen, 
  Database,
  Sparkles,
  Check,
  Eye,
  Trash2,
  Code,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  cleanNotesHtml, 
  generateHinglishSlug, 
  transformReasoningSubject 
} from '../utils/reasoningTransformer';

interface JsonImporterProps {
  onError: (err: any) => void;
  onSuccess: (targetDocId: string) => void;
}

export const JsonImporter: React.FC<JsonImporterProps> = ({ onError, onSuccess }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Settings requested by user
  const [stripSvg, setStripSvg] = useState<boolean>(true);
  const [useHinglishIds, setUseHinglishIds] = useState<boolean>(true);
  const [preserveExistingEnglish, setPreserveExistingEnglish] = useState<boolean>(true);
  const [onlyReasoningMode, setOnlyReasoningMode] = useState<boolean>(false);

  // Target Settings
  const [targetCollection, setTargetCollection] = useState<string>('curriculum_updates');
  const [targetDocId, setTargetDocId] = useState<string>('syllabus_patwar');

  // Preview Mode
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewSubject, setPreviewSubject] = useState<any>(null);

  // Execution State
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [importCompleted, setImportCompleted] = useState<boolean>(false);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  // Validate JSON string
  const handleValidateJson = (text: string) => {
    setJsonInput(text);
    setValidationError(null);
    setImportCompleted(false);

    if (!text.trim()) {
      setParsedData(null);
      setPreviewSubject(null);
      return;
    }

    try {
      const obj = JSON.parse(text);
      setParsedData(obj);

      // Auto-detect target doc id
      if (obj.examLevel) {
        setTargetDocId(`syllabus_${obj.examLevel.toLowerCase().trim()}`);
      }

      // Generate preview
      generateTransformedPreview(obj);
    } catch (err: any) {
      setParsedData(null);
      setValidationError(err.message || 'अमान्य JSON फ़ॉर्मेट');
    }
  };

  // Generate preview based on options
  const generateTransformedPreview = (raw: any) => {
    if (!raw) return;

    let targetSubj: any = null;
    if (Array.isArray(raw.subjects)) {
      // Find Reasoning subject specifically
      targetSubj = raw.subjects.find((s: any) => 
        (s.name && s.name.toLowerCase().includes('reasoning')) ||
        (s.shortName && s.shortName.toLowerCase().includes('reasoning'))
      );
      // If no reasoning found, take the non-English subject, or the first subject
      if (!targetSubj) {
        targetSubj = raw.subjects.find((s: any) => 
          !(s.name && s.name.toLowerCase().includes('english')) &&
          !(s.shortName && s.shortName.toLowerCase().includes('english'))
        ) || raw.subjects[0];
      }
    } else if (raw.name && raw.topics) {
      targetSubj = raw;
    }

    if (targetSubj) {
      if (useHinglishIds || stripSvg) {
        const transformed = transformReasoningSubject(targetSubj);
        setPreviewSubject(transformed);
      } else {
        setPreviewSubject(targetSubj);
      }
    }
  };

  // Handle File Upload (.json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleValidateJson(content);
    };
    reader.onerror = () => {
      setValidationError('फ़ाइल पढ़ने में त्रुटि हुई');
    };
    reader.readAsText(file);
  };

  // Calculate statistics from parsed JSON
  const getStats = () => {
    if (!parsedData) return null;

    let subjectsCount = 0;
    let topicsCount = 0;
    let mcqsCount = 0;
    let pyqsCount = 0;

    const subjectsList: { id: string; name: string; topicsCount: number }[] = [];

    if (Array.isArray(parsedData.subjects)) {
      subjectsCount = parsedData.subjects.length;
      parsedData.subjects.forEach((subj: any) => {
        const tCount = Array.isArray(subj.topics) ? subj.topics.length : 0;
        topicsCount += tCount;
        subjectsList.push({
          id: subj.id || `subj_${Date.now()}`,
          name: subj.name || 'Unnamed Subject',
          topicsCount: tCount,
        });

        if (Array.isArray(subj.topics)) {
          subj.topics.forEach((t: any) => {
            if (Array.isArray(t.mcqs)) mcqsCount += t.mcqs.length;
            if (Array.isArray(t.pyqs)) pyqsCount += t.pyqs.length;

            if (Array.isArray(t.subtopics)) {
              t.subtopics.forEach((st: any) => {
                if (Array.isArray(st.mcqs)) mcqsCount += st.mcqs.length;
                if (Array.isArray(st.pyqs)) pyqsCount += st.pyqs.length;

                if (Array.isArray(st.units)) {
                  st.units.forEach((u: any) => {
                    if (Array.isArray(u.mcqs)) mcqsCount += u.mcqs.length;
                    if (Array.isArray(u.pyqs)) pyqsCount += u.pyqs.length;
                  });
                }
              });
            }
          });
        }
      });
    }

    return {
      examLevel: parsedData.examLevel || 'N/A',
      app: parsedData.app || 'N/A',
      subjectsCount,
      topicsCount,
      mcqsCount,
      pyqsCount,
      subjectsList,
    };
  };

  const stats = getStats();

  // Execute Import into Firestore
  const handleExecuteImport = async () => {
    if (!parsedData) return;

    setIsImporting(true);
    setProgress(5);
    setLogs([]);
    setImportCompleted(false);

    try {
      addLog(`[START] प्रोसेस शुरू: टारगेट 'curriculum_updates/${targetDocId}'`);

      // 1. Fetch current parent syllabus to preserve English and existing subject IDs
      addLog(`[STEP 1] मौजूदा सिलेबस डॉक्युमेंट चेक किया जा रहा है...`);
      const parentDocRef = doc(db, targetCollection, targetDocId);
      const parentSnap = await getDoc(parentDocRef);

      let existingSubjectIds: string[] = [];
      if (parentSnap.exists()) {
        const pData = parentSnap.data();
        existingSubjectIds = Array.isArray(pData?.subjectIds) ? pData.subjectIds : [];
        addLog(`[INFO] पैरेंट में पहले से मौजूद विषय IDs: [${existingSubjectIds.join(', ')}]`);
      }

      // Filter subjects to import
      let rawSubjectsToProcess = Array.isArray(parsedData.subjects) ? parsedData.subjects : [parsedData];
      
      // When preserving existing English or importing Reasoning, ensure English is not overwritten or misidentified
      if (preserveExistingEnglish) {
        rawSubjectsToProcess = rawSubjectsToProcess.filter((s: any) => {
          const isEnglish = (s.name && s.name.toLowerCase().includes('english')) ||
                            (s.shortName && s.shortName.toLowerCase().includes('english')) ||
                            (s.id === 'subj_1788269390218');
          if (isEnglish) {
            addLog(`[PRESERVE] English (${s.id || 'subj_1788269390218'}) सुरक्षित रखा गया (इसे Reasoning में नहीं मिलाया जाएगा)।`);
            return false;
          }
          return true;
        });
      }

      if (rawSubjectsToProcess.length === 0) {
        addLog(`[INFO] कोई नया विषय आयात करने के लिए शेष नहीं है।`);
        setIsImporting(false);
        return;
      }

      setProgress(20);

      // 2. Transform and Upload Subjects
      const newlyAddedSubjectIds: string[] = [];

      for (let i = 0; i < rawSubjectsToProcess.length; i++) {
        const rawSubj = rawSubjectsToProcess[i];
        const isReasoning = (rawSubj.name && rawSubj.name.toLowerCase().includes('reasoning')) ||
                            (rawSubj.shortName && rawSubj.shortName.toLowerCase().includes('reasoning'));

        // Transform: Strip SVG + Generate Hinglish IDs
        let processedSubj: any = rawSubj;
        let finalSubjectId = rawSubj.id || (isReasoning ? 'subj_reasoning' : `subj_${Date.now()}`);

        if (isReasoning && (useHinglishIds || stripSvg)) {
          addLog(`[TRANSFORM] Reasoning के नोट्स से SVG हटाया जा रहा है और हिंग्लिश आईडी बनाई जा रही है...`);
          processedSubj = transformReasoningSubject(rawSubj);
          finalSubjectId = processedSubj.id || 'subj_reasoning';
        }

        newlyAddedSubjectIds.push(finalSubjectId);

        addLog(`[STEP 2.${i + 1}] सबजेक्ट मेटाडेटा अपलोड हो रहा है: "${processedSubj.name}" (ID: ${finalSubjectId})...`);

        const subjectDocRef = doc(db, targetCollection, targetDocId, 'subjects', finalSubjectId);

        // FIRESTORE 1MB LIMIT FIX:
        // Extract heavy topics array. Store lightweight metadata on subject document (< 2 KB),
        // and store all 15 full topic documents in the 'topics' subcollection!
        const { topics = [], ...subjectMetadata } = processedSubj;

        await setDoc(subjectDocRef, {
          ...subjectMetadata,
          id: finalSubjectId,
          topicsCount: topics.length,
          topicsSummary: topics.map((t: any) => ({
            id: t.id,
            title: t.title || t.name,
          })),
          updatedAt: serverTimestamp(),
        });

        // Upload each topic and replicate deep subcollections (topics -> subtopics -> units)
        if (Array.isArray(topics) && topics.length > 0) {
          addLog(`[SUBCOLLECTION] ${topics.length} चैप्टर्स को subcollection 'topics' में सुरक्षित अपलोड किया जा रहा है...`);
          for (let tIdx = 0; tIdx < topics.length; tIdx++) {
            const topic = topics[tIdx];
            const topicDocRef = doc(db, targetCollection, targetDocId, 'subjects', finalSubjectId, 'topics', topic.id);
            
            const subtopics = Array.isArray(topic.subtopics) ? topic.subtopics : [];

            await setDoc(topicDocRef, {
              ...topic,
              _syllabusLevel: targetDocId,
              _subjectId: finalSubjectId,
              _order: tIdx,
              hasSubtopics: subtopics.length > 0,
              subtopicsCount: subtopics.length,
              updatedAt: serverTimestamp(),
            });

            // Replicate subtopics subcollection
            for (let sIdx = 0; sIdx < subtopics.length; sIdx++) {
              const st = subtopics[sIdx];
              const stId = st.id || `sub_${topic.id}_${sIdx + 1}`;
              const stDocRef = doc(db, targetCollection, targetDocId, 'subjects', finalSubjectId, 'topics', topic.id, 'subtopics', stId);
              
              const units = Array.isArray(st.units) ? st.units : [];

              await setDoc(stDocRef, {
                id: stId,
                title: st.title || `Subtopic ${sIdx + 1}`,
                hasUnits: units.length > 0,
                unitCount: units.length,
                pyqs: Array.isArray(st.pyqs) ? st.pyqs : [],
                mcqs: Array.isArray(st.mcqs) ? st.mcqs : [],
                video: st.video || "",
                _syllabusLevel: targetDocId,
                _subjectId: finalSubjectId,
                _topicId: topic.id,
                _order: sIdx,
                updatedAt: serverTimestamp(),
              });

              // Replicate units subcollection
              for (let uIdx = 0; uIdx < units.length; uIdx++) {
                const u = units[uIdx];
                const uId = u.id || `unit_${stId}_${uIdx + 1}`;
                const uDocRef = doc(db, targetCollection, targetDocId, 'subjects', finalSubjectId, 'topics', topic.id, 'subtopics', stId, 'units', uId);

                await setDoc(uDocRef, {
                  id: uId,
                  title: u.title || `Unit ${uIdx + 1}`,
                  notes: u.notes || "",
                  pyqs: Array.isArray(u.pyqs) ? u.pyqs : [],
                  mcqs: Array.isArray(u.mcqs) ? u.mcqs : [],
                  video: u.video || "",
                  _syllabusLevel: targetDocId,
                  _subjectId: finalSubjectId,
                  _topicId: topic.id,
                  _subtopicId: stId,
                  _order: uIdx,
                  updatedAt: serverTimestamp(),
                });
              }
            }

            addLog(`  ✓ चैप्टर ${tIdx + 1}/${topics.length}: "${topic.title}" (ID: ${topic.id}) + सबटॉपिक्स & यूनिट्स सब-कलेक्शन सेव हुए`);
            setProgress(30 + Math.round(((tIdx + 1) / topics.length) * 55));
          }
        }

        addLog(`[SUCCESS] विषय "${processedSubj.name}" के सभी ${topics.length} चैप्टर्स/नोट्स/MCQs सुरक्षित रूप से सेव हो गए!`);
      }

      // 3. Update Parent Syllabus Document
      addLog(`[STEP 3] पैरेंट डॉक्युमेंट '${targetDocId}' में विषय सूची अपडेट हो रही है...`);

      // Merge newly added subject IDs with existing IDs (no duplicates)
      const combinedSubjectIds = Array.from(new Set([...existingSubjectIds, ...newlyAddedSubjectIds]));

      await setDoc(parentDocRef, {
        level: parsedData.examLevel || targetDocId.replace('syllabus_', ''),
        appName: parsedData.app || 'Studyquake Exam Portal',
        version: parsedData.version || '2.0',
        schemaVersion: 2,
        subjectCount: combinedSubjectIds.length,
        subjectIds: combinedSubjectIds,
        lastUpdated: serverTimestamp(),
      }, { merge: true });

      addLog(`[SUCCESS] पैरेंट डॉक्युमेंट अपडेट हो गया: कुल विषय: ${combinedSubjectIds.length} [${combinedSubjectIds.join(', ')}]`);

      setProgress(100);
      setImportCompleted(true);
      addLog(`[COMPLETED] 🎉 बधाई! Reasoning विषय (Clean HTML Notes + Hinglish IDs) के साथ सफलतापूर्वक जुड़ चुका है।`);
      onSuccess(targetDocId);
    } catch (err: any) {
      console.error('Import error:', err);
      addLog(`[ERROR] त्रुटि: ${err.message || String(err)}`);
      onError(err);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-linear-to-r from-indigo-950/70 via-slate-900 to-indigo-950/50 p-6 rounded-2xl border border-indigo-500/20 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Patwar Reasoning Custom Transformer & Importer</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            Reasoning JSON Importer
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Hinglish IDs + No SVG Mode
            </span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            आपकी आवश्यकताओं के अनुसार: 
            <span className="text-amber-300 font-semibold"> (1) </span> नंबर्स की जगह साफ़ हिंग्लिश नाम आईडी, 
            <span className="text-amber-300 font-semibold"> (2) </span> नोट्स से SVG हटाकर केवल शुद्ध HTML, और 
            <span className="text-amber-300 font-semibold"> (3) </span> मौजूदा English को बिना छुए सिर्फ Reasoning जोड़ना।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition cursor-pointer shadow-lg shadow-indigo-600/20">
            <Upload className="w-4 h-4" />
            <span>.json फ़ाइल चुनें</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Configuration Settings Card */}
      <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>रूपांतरण सेटिंग्स (Your Custom Rules)</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
            ✓ ऑल रूल्स एक्टिव
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Rule 1: Hinglish IDs */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={useHinglishIds}
              onChange={(e) => {
                setUseHinglishIds(e.target.checked);
                if (parsedData) generateTransformedPreview(parsedData);
              }}
              className="mt-0.5 rounded text-indigo-600 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-white block">हिंग्लिश यूनिक आईडी (Hinglish IDs)</span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                नंबर्स (जैसे 17888...) की जगह <code className="text-indigo-300 font-mono">subj_reasoning</code>, <code className="text-indigo-300 font-mono">top_making_series</code> आदि।
              </span>
            </div>
          </label>

          {/* Rule 2: Strip SVG */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={stripSvg}
              onChange={(e) => {
                setStripSvg(e.target.checked);
                if (parsedData) generateTransformedPreview(parsedData);
              }}
              className="mt-0.5 rounded text-indigo-600 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-white block">नोट्स से SVG हटाएँ (Clean HTML)</span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                भारी SVG कोड हट जाएगा, केवल साफ़ टेबल्स, थ्योरी और लिस्ट्स सुरक्षित रहेंगी।
              </span>
            </div>
          </label>

          {/* Rule 3: Safe Append & Preserve Existing Subjects */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition">
            <input
              type="checkbox"
              checked={preserveExistingEnglish}
              onChange={(e) => setPreserveExistingEnglish(e.target.checked)}
              className="mt-0.5 rounded text-indigo-600 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-white block">मौजूदा विषय (English आदि) सुरक्षित रखें</span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                पुराने विषय जैसे SUBJ_1788269390218 कभी डिलीट या ओवरराइट नहीं होंगे, नए विषय केवल जुड़ेंगे।
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: JSON Paste Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileJson className="w-4 h-4 text-indigo-400" />
                <span>JSON फ़ाइल पेस्ट करें या ऊपर से फ़ाइल अपलोड करें</span>
              </label>

              {jsonInput && (
                <button
                  onClick={() => handleValidateJson('')}
                  className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>

            <textarea
              rows={12}
              placeholder='यहाँ किसी भी विषय (Reasoning, Maths, GK, Hindi, Computer आदि) की JSON फ़ाइल पेस्ट करें...'
              value={jsonInput}
              onChange={(e) => handleValidateJson(e.target.value)}
              className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 placeholder-slate-600 focus:outline-hidden focus:border-indigo-500 resize-none leading-relaxed"
              spellCheck={false}
            />

            {/* Validation Notification */}
            {validationError ? (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span><strong>JSON Error:</strong> {validationError}</span>
              </div>
            ) : parsedData ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>वैध JSON लोड हो गया: <strong>{parsedData.app || 'Patwar Exam Portal'}</strong></span>
                </div>
                {previewSubject && (
                  <button
                    onClick={() => setShowPreviewModal(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>रूपांतरित डेटा देखें (Preview)</span>
                  </button>
                )}
              </div>
            ) : null}
          </div>

          {/* Execution Box */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Firestore टारगेट & एक्शन</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Collection</span>
                <span className="text-slate-200 font-bold">{targetCollection}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[11px]">Document ID</span>
                <span className="text-indigo-400 font-bold">{targetDocId}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                सबजेक्ट को <code className="text-indigo-300 font-mono">/{targetCollection}/{targetDocId}/subjects/subj_reasoning</code> में सुरक्षित जोड़ा जाएगा।
              </span>

              <button
                disabled={!parsedData || isImporting}
                onClick={handleExecuteImport}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>डेटाबेस में जुड़ रहा है... ({progress}%)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>Reasoning जोड़ें (Start Import)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics & Live Logs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Detected Summary */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>पहचाना गया डेटा</span>
            </h4>

            {stats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400">Exam Level</div>
                    <div className="text-sm font-bold text-white uppercase font-mono">{stats.examLevel}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400">Reasoning Status</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">Ready to Add</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400">Reasoning Topics</div>
                    <div className="text-sm font-bold text-indigo-300 font-mono">15 मुख्य अध्याय</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400">New Subject ID</div>
                    <div className="text-sm font-bold text-amber-300 font-mono">subj_reasoning</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    बदलाव सारांश (Transformation Summary):
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>SVG हटाकर सिर्फ़ शुद्ध HTML नोट्स रहेंगे</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-300">
                    <Check className="w-3.5 h-3.5" />
                    <span>सभी IDs साफ़ हिंग्लिश नामों में बदलेंगी</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-300">
                    <Check className="w-3.5 h-3.5" />
                    <span>मौजूदा English विषय को नहीं छुआ जाएगा</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                बाएँ बॉक्स में अपनी Reasoning JSON फ़ाइल पेस्ट करें या .json फ़ाइल अपलोड करें।
              </div>
            )}
          </div>

          {/* Live Logs Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-semibold uppercase text-slate-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>लाइव एक्जीक्यूशन लॉग्स (Live Logs)</span>
              </h4>
              {isImporting && (
                <span className="text-[10px] text-emerald-400 animate-pulse font-mono">
                  Writing to DB...
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {isImporting || progress > 0 ? (
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-linear-to-r from-indigo-500 to-emerald-400 h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            ) : null}

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 h-44 overflow-y-auto font-mono text-[11px] text-slate-400 space-y-1 leading-relaxed">
              {logs.length === 0 ? (
                <div className="text-slate-600 italic">"Reasoning जोड़ें" बटन दबाते ही यहाँ हर स्टेप दिखेगा...</div>
              ) : (
                logs.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.includes('SUCCESS') || line.includes('COMPLETED')
                        ? 'text-emerald-400'
                        : line.includes('ERROR')
                        ? 'text-red-400 font-bold'
                        : line.includes('TRANSFORM')
                        ? 'text-amber-300'
                        : line.includes('STEP')
                        ? 'text-indigo-300'
                        : 'text-slate-400'
                    }
                  >
                    {line}
                  </div>
                ))
              )}
            </div>

            {importCompleted && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Reasoning डेटाबेस में जुड़ चुका है!</span>
                </div>
                <button
                  onClick={() => onSuccess(targetDocId)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                >
                  सिलेबस में देखें →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal: Check Transformed Hinglish IDs and Clean HTML Notes */}
      {showPreviewModal && previewSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl relative my-6 max-h-[85vh] flex flex-col">
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between pr-8">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">Cleaned & Transformed Preview</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  {previewSubject.name} 
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    ID: {previewSubject.id}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg text-xs cursor-pointer"
              >
                बंद करें
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
              <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800/50 text-indigo-200">
                नीचे देखिए: हर चैप्टर की आईडी रैंडम नंबर से बदलकर <strong>साफ़ हिंग्लिश नाम</strong> बन गई है और सभी नोट्स से <strong>SVG कोड हटाकर केवल क्लीन HTML</strong> कर दिया गया है।
              </div>

              {Array.isArray(previewSubject.topics) && previewSubject.topics.slice(0, 5).map((t: any, idx: number) => {
                const sampleUnit = t.subtopics?.[0]?.units?.[0];
                return (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm">
                        {idx + 1}. {t.title}
                      </div>
                      <span className="font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[11px] border border-emerald-800/40">
                        ID: {t.id}
                      </span>
                    </div>

                    {sampleUnit && (
                      <div className="mt-2 pt-2 border-t border-slate-900 space-y-1">
                        <div className="text-slate-400 font-mono text-[11px]">
                          Unit: {sampleUnit.title} ➔ <span className="text-indigo-300">ID: {sampleUnit.id}</span>
                        </div>
                        <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/60 font-mono text-[10px] text-slate-300 max-h-24 overflow-y-auto">
                          <span className="text-slate-500 block mb-1">नोट्स प्रीव्यू (No SVG, Clean HTML):</span>
                          {sampleUnit.notes ? sampleUnit.notes.substring(0, 250) + '...' : 'No notes'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {previewSubject.topics?.length > 5 && (
                <div className="text-center text-slate-500 font-mono text-xs">
                  + {previewSubject.topics.length - 5} और चैप्टर्स तैयार हैं...
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
              >
                समझ गया, बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
