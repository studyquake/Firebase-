import React, { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { CurriculumDocument, SubjectDocument } from '../types';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  FolderPlus, 
  ListTree, 
  Layers, 
  Check, 
  X, 
  RefreshCw,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle
} from 'lucide-react';

interface CurriculumManagerProps {
  onError: (err: any) => void;
}

export const CurriculumManager: React.FC<CurriculumManagerProps> = ({ onError }) => {
  const [syllabi, setSyllabi] = useState<CurriculumDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string | null>(null);
  
  // Subcollection state
  const [subjects, setSubjects] = useState<SubjectDocument[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [viewingSubject, setViewingSubject] = useState<any | null>(null);
  const [subcollectionTopics, setSubcollectionTopics] = useState<any[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(null);

  // New syllabus modal / form state
  const [showAddSyllabusModal, setShowAddSyllabusModal] = useState(false);
  const [newSyllabusId, setNewSyllabusId] = useState('');
  const [newLevel, setNewLevel] = useState('');

  // Editing Syllabus fields state
  const [editingFields, setEditingFields] = useState(false);
  const [editLevel, setEditLevel] = useState('');
  const [editSchemaVersion, setEditSchemaVersion] = useState<number>(2);
  const [editSubjectIds, setEditSubjectIds] = useState<string[]>([]);
  const [newSubjectIdInput, setNewSubjectIdInput] = useState('');

  // Add Subject modal state
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectChapters, setSubjectChapters] = useState(10);
  const [subjectDescription, setSubjectDescription] = useState('');

  // Save feedback
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. Listen to `curriculum_updates` collection
  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, 'curriculum_updates');
    
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs: CurriculumDocument[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setSyllabi(docs);
        setLoading(false);
        if (docs.length > 0 && !selectedSyllabusId) {
          setSelectedSyllabusId(docs[0].id);
        }
      },
      (error) => {
        console.error('Error fetching curriculum_updates:', error);
        onError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update edit form when selected syllabus changes
  const selectedSyllabus = syllabi.find((s) => s.id === selectedSyllabusId);

  useEffect(() => {
    if (selectedSyllabus) {
      setEditLevel(selectedSyllabus.level || '');
      setEditSchemaVersion(selectedSyllabus.schemaVersion ?? 2);
      setEditSubjectIds(selectedSyllabus.subjectIds || []);
      setEditingFields(false);
    }
  }, [selectedSyllabusId, selectedSyllabus]);

  // 2. Listen to `subjects` subcollection for the active syllabus
  useEffect(() => {
    if (!selectedSyllabusId) {
      setSubjects([]);
      return;
    }

    setLoadingSubjects(true);
    const subjectsColRef = collection(db, 'curriculum_updates', selectedSyllabusId, 'subjects');

    const unsubscribe = onSnapshot(
      subjectsColRef,
      (snapshot) => {
        const subList: SubjectDocument[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setSubjects(subList);
        setLoadingSubjects(false);
      },
      (error) => {
        console.error(`Error fetching subjects for ${selectedSyllabusId}:`, error);
        setLoadingSubjects(false);
      }
    );

    return () => unsubscribe();
  }, [selectedSyllabusId]);

  // 3. When viewingSubject is selected, fetch topics from its subcollection if any
  useEffect(() => {
    if (!viewingSubject || !selectedSyllabusId) {
      setSubcollectionTopics([]);
      setExpandedTopicId(null);
      setExpandedUnitId(null);
      return;
    }

    setLoadingTopics(true);
    const topicsColRef = collection(db, 'curriculum_updates', selectedSyllabusId, 'subjects', viewingSubject.id, 'topics');
    
    getDocs(topicsColRef)
      .then((snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setSubcollectionTopics(list);
        setLoadingTopics(false);
      })
      .catch((err) => {
        console.error(`Error loading topics subcollection for ${viewingSubject.id}:`, err);
        setSubcollectionTopics([]);
        setLoadingTopics(false);
      });
  }, [viewingSubject, selectedSyllabusId]);

  // Handler: Save modified syllabus document fields
  const handleSaveSyllabusFields = async () => {
    if (!selectedSyllabusId) return;
    try {
      const docRef = doc(db, 'curriculum_updates', selectedSyllabusId);
      await updateDoc(docRef, {
        level: editLevel,
        schemaVersion: Number(editSchemaVersion),
        subjectCount: editSubjectIds.length,
        subjectIds: editSubjectIds,
        updatedAt: serverTimestamp(),
      });
      setEditingFields(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to update syllabus:', err);
      onError(err);
    }
  };

  // Handler: Create new syllabus
  const handleCreateSyllabus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSyllabusId.trim()) return;

    const formattedId = newSyllabusId.trim().toLowerCase().replace(/\s+/g, '_');
    try {
      const docRef = doc(db, 'curriculum_updates', formattedId);
      await setDoc(docRef, {
        level: newLevel || 'General',
        schemaVersion: 2,
        subjectCount: 0,
        subjectIds: [],
        createdAt: serverTimestamp(),
      });
      setShowAddSyllabusModal(false);
      setNewSyllabusId('');
      setNewLevel('');
      setSelectedSyllabusId(formattedId);
    } catch (err) {
      console.error('Failed to create syllabus:', err);
      onError(err);
    }
  };

  // Handler: Delete syllabus
  const handleDeleteSyllabus = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete syllabus '${id}'? This will remove its entry.`)) return;
    try {
      await deleteDoc(doc(db, 'curriculum_updates', id));
      if (selectedSyllabusId === id) {
        setSelectedSyllabusId(syllabi.find((s) => s.id !== id)?.id || null);
      }
    } catch (err) {
      console.error('Failed to delete syllabus:', err);
      onError(err);
    }
  };

  // Handler: Add new Subject to subcollection
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSyllabusId || !subjectName.trim()) return;

    try {
      const subjectsColRef = collection(db, 'curriculum_updates', selectedSyllabusId, 'subjects');
      const subjectDocRef = await addDoc(subjectsColRef, {
        name: subjectName.trim(),
        code: subjectCode.trim() || subjectName.trim().substring(0, 3).toUpperCase(),
        chaptersCount: Number(subjectChapters),
        description: subjectDescription.trim(),
        createdAt: serverTimestamp(),
      });

      // Also append subject ID or name to subjectIds array if not already present
      const updatedSubjectIds = Array.from(new Set([...editSubjectIds, subjectDocRef.id]));
      const parentDocRef = doc(db, 'curriculum_updates', selectedSyllabusId);
      await updateDoc(parentDocRef, {
        subjectIds: updatedSubjectIds,
        subjectCount: updatedSubjectIds.length,
      });

      setShowAddSubjectModal(false);
      setSubjectName('');
      setSubjectCode('');
      setSubjectChapters(10);
      setSubjectDescription('');
    } catch (err) {
      console.error('Failed to add subject:', err);
      onError(err);
    }
  };

  // Handler: Delete Subject from subcollection
  const handleDeleteSubject = async (subjectId: string) => {
    if (!selectedSyllabusId) return;
    if (!window.confirm('Delete this subject from curriculum?')) return;
    try {
      const subDocRef = doc(db, 'curriculum_updates', selectedSyllabusId, 'subjects', subjectId);
      await deleteDoc(subDocRef);

      // Remove from parent subjectIds
      const updated = editSubjectIds.filter((id) => id !== subjectId);
      const parentDocRef = doc(db, 'curriculum_updates', selectedSyllabusId);
      await updateDoc(parentDocRef, {
        subjectIds: updated,
        subjectCount: updated.length,
      });
    } catch (err) {
      console.error('Failed to delete subject:', err);
      onError(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar with actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Cloud Firestore Collection</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            curriculum_updates
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-normal">
              {syllabi.length} Document{syllabi.length !== 1 ? 's' : ''}
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            StudyQuake के सिलेबस, विषय (Subjects) और उनकी डिटेल्स यहाँ से मैनेज करें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSyllabusModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>नया Syllabus जोड़ें</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
          <p className="text-sm">Firestore से `curriculum_updates` लोड हो रहा है...</p>
        </div>
      ) : syllabi.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200">कोई Syllabus नहीं मिला</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
            `curriculum_updates` कलेक्शन में अभी कोई डॉक्यूमेंट मौजूद नहीं है या रूल्स की वजह से एक्सेस नहीं मिल पा रहा।
          </p>
          <button
            onClick={() => setShowAddSyllabusModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition cursor-pointer"
          >
            पहला Syllabus बनाएँ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Syllabi List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Documents List
            </div>
            <div className="space-y-2">
              {syllabi.map((syl) => {
                const isSelected = syl.id === selectedSyllabusId;
                return (
                  <div
                    key={syl.id}
                    onClick={() => setSelectedSyllabusId(syl.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/40'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <ListTree className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-mono text-sm font-semibold text-slate-200 truncate">
                          {syl.id}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>Level: {syl.level || 'N/A'}</span>
                          <span>•</span>
                          <span>{syl.subjectCount ?? (syl.subjectIds?.length || 0)} Subjects</span>
                        </div>
                      </div>
                    </div>

                    <button
                      title="Delete Syllabus"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSyllabus(syl.id);
                      }}
                      className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition opacity-60 hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Syllabus Details & Subcollections */}
          <div className="lg:col-span-8 space-y-6">
            {selectedSyllabus ? (
              <>
                {/* Document Fields Card */}
                <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-slate-400 uppercase">Document ID</span>
                      <h3 className="text-xl font-bold font-mono text-indigo-300">
                        {selectedSyllabus.id}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {saveSuccess && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                          <Check className="w-3.5 h-3.5" /> Saved!
                        </span>
                      )}

                      {editingFields ? (
                        <>
                          <button
                            onClick={() => setEditingFields(false)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveSyllabusFields}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition cursor-pointer shadow-md shadow-emerald-600/20"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Changes
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingFields(true)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-medium transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Fields
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-400 font-mono mb-1">level (string)</div>
                      {editingFields ? (
                        <input
                          type="text"
                          value={editLevel}
                          onChange={(e) => setEditLevel(e.target.value)}
                          className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-hidden"
                        />
                      ) : (
                        <div className="text-base font-semibold text-slate-200">
                          {selectedSyllabus.level || '—'}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-400 font-mono mb-1">schemaVersion (int64)</div>
                      {editingFields ? (
                        <input
                          type="number"
                          value={editSchemaVersion}
                          onChange={(e) => setEditSchemaVersion(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-indigo-500/50 rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-hidden"
                        />
                      ) : (
                        <div className="text-base font-semibold text-slate-200">
                          {selectedSyllabus.schemaVersion ?? 2}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-400 font-mono mb-1">subjectCount (int64)</div>
                      <div className="text-base font-semibold text-slate-200">
                        {editSubjectIds.length}
                      </div>
                    </div>
                  </div>

                  {/* subjectIds array field */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                      <span>subjectIds (array)</span>
                      <span>{editSubjectIds.length} items</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {editSubjectIds.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-mono"
                        >
                          {item}
                          {editingFields && (
                            <button
                              onClick={() => {
                                setEditSubjectIds(editSubjectIds.filter((_, i) => i !== idx));
                              }}
                              className="hover:text-red-400 text-indigo-400 transition"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}

                      {editSubjectIds.length === 0 && (
                        <span className="text-xs text-slate-500 italic">No subjectIds in array</span>
                      )}
                    </div>

                    {editingFields && (
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="नया subjectId जोड़ें (जैसे: physics, math, hindi)..."
                          value={newSubjectIdInput}
                          onChange={(e) => setNewSubjectIdInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newSubjectIdInput.trim()) {
                                setEditSubjectIds([...editSubjectIds, newSubjectIdInput.trim()]);
                                setNewSubjectIdInput('');
                              }
                            }
                          }}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 w-72"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newSubjectIdInput.trim()) {
                              setEditSubjectIds([...editSubjectIds, newSubjectIdInput.trim()]);
                              setNewSubjectIdInput('');
                            }
                          }}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Add to Array
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcollection: subjects Card */}
                <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-mono text-indigo-400">
                        Subcollection: curriculum_updates/{selectedSyllabus.id}/subjects
                      </div>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        Subjects ({subjects.length})
                      </h4>
                    </div>

                    <button
                      onClick={() => setShowAddSubjectModal(true)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer shadow-md shadow-indigo-600/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>नया Subject जोड़ें</span>
                    </button>
                  </div>

                  {loadingSubjects ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400 mb-2" />
                      Subjects लोड हो रहे हैं...
                    </div>
                  ) : subjects.length === 0 ? (
                    <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-dashed border-slate-800 text-slate-400">
                      <p className="text-sm">इस सिलेबस के लिए कोई subcollection `subjects` दस्तावेज़ नहीं मिले।</p>
                      <button
                        onClick={() => setShowAddSubjectModal(true)}
                        className="mt-3 text-xs text-indigo-400 hover:underline font-semibold cursor-pointer"
                      >
                        + पहला Subject डॉक्यूमेंट जोड़ें
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {subjects.map((sub) => {
                        const topicsCount = Array.isArray(sub.topics) ? sub.topics.length : (sub.topicsCount ?? 0);
                        return (
                          <div
                            key={sub.id}
                            className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition space-y-3 relative group"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
                                  {sub.code || sub.id}
                                </span>
                                <h5 className="text-base font-semibold text-slate-200 mt-1">
                                  {sub.name || sub.id}
                                </h5>
                              </div>
                              <div className="flex items-center gap-1">
                                {topicsCount > 0 && (
                                  <button
                                    onClick={() => setViewingSubject(sub)}
                                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2 py-1 rounded bg-indigo-950/60 border border-indigo-800/40 cursor-pointer"
                                    title="Topics देखें"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>{topicsCount} Topics</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteSubject(sub.id)}
                                  className="text-slate-500 hover:text-red-400 p-1 rounded transition opacity-50 group-hover:opacity-100 cursor-pointer"
                                  title="Delete Subject"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {sub.description && (
                              <p className="text-xs text-slate-400 line-clamp-2">
                                {sub.description}
                              </p>
                            )}

                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 font-mono">
                              <span>Topics: {topicsCount}</span>
                              <span className="text-[11px] text-slate-600">ID: {sub.id.substring(0, 14)}...</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Modal: Add Syllabus */}
      {showAddSyllabusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowAddSyllabusModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">नया Syllabus Document बनाएँ</h3>
            <p className="text-xs text-slate-400 mb-4">
              `curriculum_updates` कलेक्शन में नया डॉक्यूमेंट ID सेट करें
            </p>

            <form onSubmit={handleCreateSyllabus} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                  Document ID (जैसे: syllabus_reet, syllabus_upsc, syllabus_10th)
                </label>
                <input
                  type="text"
                  required
                  placeholder="syllabus_exam_name"
                  value={newSyllabusId}
                  onChange={(e) => setNewSyllabusId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 font-mono">
                  Level (string)
                </label>
                <input
                  type="text"
                  placeholder="12th, State Exam, Graduation, etc."
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSyllabusModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  डॉक्यूमेंट बनाएँ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Subject to Subcollection */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowAddSubjectModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">नया Subject जोड़ें</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Target: curriculum_updates/{selectedSyllabusId}/subjects
            </p>

            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Subject Name (विषय का नाम)
                </label>
                <input
                  type="text"
                  required
                  placeholder="जैसे: Rajasthan History, Physics, General Hindi"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    placeholder="HIST, PHY, GEO"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Chapters Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={subjectChapters}
                    onChange={(e) => setSubjectChapters(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  विवरण / Description (वैकल्पिक)
                </label>
                <textarea
                  rows={3}
                  placeholder="विषय का संक्षेप में विवरण या टॉपिक्स..."
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  Subject सेव करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Subject Topics Details */}
      {viewingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl relative my-6 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setViewingSubject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-800 flex items-center justify-between pr-8">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400">Subject Overview & Syllabus Hierarchy</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  {viewingSubject.name}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono font-normal">
                    {subcollectionTopics.length > 0 ? subcollectionTopics.length : (Array.isArray(viewingSubject.topics) ? viewingSubject.topics.length : (viewingSubject.topicsCount ?? 0))} Topics
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-normal">
                    ({viewingSubject.id})
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {loadingTopics ? (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                  <span className="text-xs font-mono">Firestore Subcollection से Topics लोड हो रहे हैं...</span>
                </div>
              ) : (() => {
                const activeTopicsList = subcollectionTopics.length > 0 
                  ? subcollectionTopics 
                  : (Array.isArray(viewingSubject.topics) ? viewingSubject.topics : []);

                if (activeTopicsList.length === 0) {
                  return (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      इस विषय के लिए कोई टॉपिक उपलब्ध नहीं है।
                    </div>
                  );
                }

                return activeTopicsList.map((t: any, index: number) => {
                  const topicId = t.id || `topic_${index}`;
                  const isTopicExpanded = expandedTopicId === topicId;
                  const subtopics = Array.isArray(t.subtopics) ? t.subtopics : [];
                  
                  let totalUnits = 0;
                  let totalPyqs = 0;
                  let totalMcqs = 0;

                  subtopics.forEach((st: any) => {
                    if (Array.isArray(st.units)) {
                      totalUnits += st.units.length;
                      st.units.forEach((u: any) => {
                        if (Array.isArray(u.pyqs)) totalPyqs += u.pyqs.length;
                        if (Array.isArray(u.mcqs)) totalMcqs += u.mcqs.length;
                      });
                    }
                    if (Array.isArray(st.pyqs)) totalPyqs += st.pyqs.length;
                    if (Array.isArray(st.mcqs)) totalMcqs += st.mcqs.length;
                  });

                  if (Array.isArray(t.pyqs)) totalPyqs += t.pyqs.length;
                  if (Array.isArray(t.mcqs)) totalMcqs += t.mcqs.length;

                  return (
                    <div
                      key={topicId}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
                    >
                      {/* Topic Header */}
                      <div 
                        onClick={() => setExpandedTopicId(isTopicExpanded ? null : topicId)}
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-indigo-950 text-indigo-400 text-xs flex items-center justify-center font-mono font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-200">
                              {t.title || t.name || 'Untitled Topic'}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-500">ID: {t.id}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {subtopics.length > 0 && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {subtopics.length} Subtopics
                            </span>
                          )}
                          {totalUnits > 0 && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                              {totalUnits} Units
                            </span>
                          )}
                          {totalPyqs > 0 && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                              {totalPyqs} PYQs
                            </span>
                          )}
                          {totalMcqs > 0 && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                              {totalMcqs} MCQs
                            </span>
                          )}
                          {isTopicExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400 ml-1" />
                          )}
                        </div>
                      </div>

                      {/* Topic Subtopics & Units Accordion */}
                      {isTopicExpanded && (
                        <div className="p-4 pt-0 border-t border-slate-900 space-y-3 bg-slate-900/30">
                          {subtopics.length > 0 ? (
                            subtopics.map((st: any, sIdx: number) => {
                              const units = Array.isArray(st.units) ? st.units : [];
                              return (
                                <div
                                  key={st.id || sIdx}
                                  className="border border-slate-800/80 rounded-xl p-3 bg-slate-950/50 space-y-2 mt-3"
                                >
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                      {st.title || `Subtopic ${sIdx + 1}`}
                                    </h5>
                                    {units.length > 0 && (
                                      <span className="text-[10px] font-mono text-cyan-400">
                                        {units.length} Unit(s)
                                      </span>
                                    )}
                                  </div>

                                  {/* Units inside Subtopic */}
                                  {units.length > 0 && (
                                    <div className="space-y-2 pt-1 pl-2 border-l border-slate-800">
                                      {units.map((u: any, uIdx: number) => {
                                        const unitId = u.id || `unit_${sIdx}_${uIdx}`;
                                        const isUnitExpanded = expandedUnitId === unitId;
                                        const uPyqs = Array.isArray(u.pyqs) ? u.pyqs : [];
                                        const uMcqs = Array.isArray(u.mcqs) ? u.mcqs : [];

                                        return (
                                          <div
                                            key={unitId}
                                            className="bg-slate-900/70 border border-slate-800 rounded-lg p-2.5 text-xs space-y-2"
                                          >
                                            <div
                                              onClick={() => setExpandedUnitId(isUnitExpanded ? null : unitId)}
                                              className="flex items-center justify-between cursor-pointer select-none"
                                            >
                                              <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                                  Unit {uIdx + 1}
                                                </span>
                                                <span className="font-medium text-slate-300">
                                                  {u.title || u.id}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                                {u.notes && (
                                                  <span className="px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40">
                                                    Notes
                                                  </span>
                                                )}
                                                {uPyqs.length > 0 && (
                                                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                                                    {uPyqs.length} PYQs
                                                  </span>
                                                )}
                                                {uMcqs.length > 0 && (
                                                  <span className="px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                                                    {uMcqs.length} MCQs
                                                  </span>
                                                )}
                                                {isUnitExpanded ? (
                                                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                                ) : (
                                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                                )}
                                              </div>
                                            </div>

                                            {/* Unit Content Details */}
                                            {isUnitExpanded && (
                                              <div className="pt-2 border-t border-slate-800 space-y-3">
                                                {u.notes && (
                                                  <div className="space-y-1">
                                                    <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                                                      <FileText className="w-3 h-3 text-blue-400" /> Notes Preview:
                                                    </span>
                                                    <div 
                                                      className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 max-h-48 overflow-y-auto leading-relaxed prose prose-invert prose-xs"
                                                      dangerouslySetInnerHTML={{ __html: u.notes }}
                                                    />
                                                  </div>
                                                )}

                                                {uPyqs.length > 0 && (
                                                  <div className="space-y-1.5">
                                                    <span className="text-[10px] uppercase font-mono text-emerald-400 flex items-center gap-1">
                                                      <HelpCircle className="w-3 h-3" /> PYQs ({uPyqs.length}):
                                                    </span>
                                                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                                      {uPyqs.map((q: any, qIdx: number) => (
                                                        <div key={q.id || qIdx} className="bg-slate-950 p-2 rounded border border-slate-800/80 text-[11px] space-y-1">
                                                          <div className="flex items-start justify-between gap-2">
                                                            <span className="font-medium text-slate-200">
                                                              Q{qIdx + 1}. {q.q}
                                                            </span>
                                                            {q.sourceLabel && (
                                                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
                                                                {q.sourceLabel}
                                                              </span>
                                                            )}
                                                          </div>
                                                          {Array.isArray(q.opts) && (
                                                            <div className="grid grid-cols-2 gap-1 pt-1">
                                                              {q.opts.map((opt: string, optIdx: number) => (
                                                                <div 
                                                                  key={optIdx} 
                                                                  className={`px-2 py-1 rounded text-[10px] font-mono ${
                                                                    optIdx === q.ans 
                                                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold' 
                                                                      : 'bg-slate-900 text-slate-400'
                                                                  }`}
                                                                >
                                                                  {String.fromCharCode(65 + optIdx)}. {opt}
                                                                </div>
                                                              ))}
                                                            </div>
                                                          )}
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-xs text-slate-500 italic p-2">
                              कोई Subtopic नहीं है।
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setViewingSubject(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
