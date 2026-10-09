import React, { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Database, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  RefreshCw, 
  Code, 
  FileJson, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface RawExplorerProps {
  onError: (err: any) => void;
}

export const RawExplorer: React.FC<RawExplorerProps> = ({ onError }) => {
  const [collectionName, setCollectionName] = useState('curriculum_updates');
  const [documents, setDocuments] = useState<{ id: string; data: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<{ id: string; data: any } | null>(null);

  // Edit / Add modal
  const [isAdding, setIsAdding] = useState(false);
  const [newDocId, setNewDocId] = useState('');
  const [jsonText, setJsonText] = useState('{\n  "title": "Example",\n  "status": "active"\n}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCollectionDocs = async (targetCollection: string) => {
    if (!targetCollection.trim()) return;
    setLoading(true);
    setSelectedDoc(null);
    try {
      const colRef = collection(db, targetCollection.trim());
      const snapshot = await getDocs(colRef);
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        data: d.data(),
      }));
      setDocuments(docs);
      if (docs.length > 0) {
        setSelectedDoc(docs[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch ${targetCollection}:`, err);
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionDocs(collectionName);
  }, []);

  const handleSaveDoc = async () => {
    try {
      setJsonError(null);
      const parsedData = JSON.parse(jsonText);
      const targetId = isAdding ? newDocId.trim() : selectedDoc?.id;
      if (!targetId) {
        setJsonError('Document ID cannot be empty');
        return;
      }

      setSaving(true);
      const docRef = doc(db, collectionName.trim(), targetId);
      await setDoc(docRef, {
        ...parsedData,
        updatedAt: serverTimestamp(),
      });

      setIsAdding(false);
      setNewDocId('');
      await fetchCollectionDocs(collectionName);
    } catch (err: any) {
      console.error('Error parsing or saving JSON:', err);
      setJsonError(err.message || 'Invalid JSON format');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!window.confirm(`Delete document "${id}" permanently from "${collectionName}"?`)) return;
    try {
      await deleteDoc(doc(db, collectionName.trim(), id));
      await fetchCollectionDocs(collectionName);
    } catch (err) {
      console.error('Delete error:', err);
      onError(err);
    }
  };

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(documents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${collectionName}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Database className="w-4 h-4" />
            <span>Direct Firestore Explorer</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Raw Collection Inspector
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            StudyQuake डेटाबेस के किसी भी कलेक्शन को लाइव ब्राउज़, एडिट और बैकअप करें।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportToJson}
            disabled={documents.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON Backup</span>
          </button>

          <button
            onClick={() => {
              setIsAdding(true);
              setNewDocId(`doc_${Date.now()}`);
              setJsonText(JSON.stringify({ name: 'New Item', createdAt: new Date().toISOString() }, null, 2));
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>नया Document</span>
          </button>
        </div>
      </div>

      {/* Collection Selector Tabs / Input */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <span className="text-xs font-mono text-slate-400 px-2">Collection:</span>
        {['curriculum_updates', 'posts', 'student_attempts'].map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setCollectionName(preset);
              fetchCollectionDocs(preset);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
              collectionName === preset
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {preset}
          </button>
        ))}

        <div className="flex items-center gap-2 ml-auto">
          <input
            type="text"
            placeholder="Custom collection name..."
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchCollectionDocs(collectionName);
            }}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white placeholder-slate-500 font-mono w-48"
          />
          <button
            onClick={() => fetchCollectionDocs(collectionName)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Explorer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents in Collection */}
        <div className="lg:col-span-5 bg-slate-900/70 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>Documents ({documents.length})</span>
            <span>Collection: {collectionName}</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-indigo-400 mb-2" />
              दस्तावेज़ लोड हो रहे हैं...
            </div>
          ) : documents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              कोई डॉक्यूमेंट नहीं मिला।
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {documents.map((d) => {
                const isSelected = selectedDoc?.id === d.id && !isAdding;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      setIsAdding(false);
                      setSelectedDoc(d);
                      setJsonText(JSON.stringify(d.data, null, 2));
                      setJsonError(null);
                    }}
                    className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileJson className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="font-semibold truncate">{d.id}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDoc(d.id);
                      }}
                      className="text-slate-500 hover:text-red-400 p-1 rounded transition opacity-50 hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: JSON Editor / Viewer */}
        <div className="lg:col-span-7 bg-slate-900/70 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">
                {isAdding ? 'Creating New Document' : 'Document Data Editor'}
              </span>
              <h4 className="text-base font-bold font-mono text-indigo-300 mt-0.5">
                {isAdding ? (
                  <input
                    type="text"
                    placeholder="Enter document ID..."
                    value={newDocId}
                    onChange={(e) => setNewDocId(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                  />
                ) : (
                  selectedDoc?.id || 'No Document Selected'
                )}
              </h4>
            </div>

            <button
              onClick={handleSaveDoc}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-medium transition cursor-pointer shadow-md shadow-emerald-600/20 disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save to Firestore'}</span>
            </button>
          </div>

          {jsonError && (
            <div className="p-2.5 bg-red-950/70 border border-red-800/80 rounded-xl text-red-300 text-xs font-mono">
              <strong>Error:</strong> {jsonError}
            </div>
          )}

          <div className="relative">
            <textarea
              rows={16}
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setJsonError(null);
              }}
              className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 focus:outline-hidden focus:border-indigo-500 resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
