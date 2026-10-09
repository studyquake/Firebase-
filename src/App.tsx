import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CurriculumManager } from './components/CurriculumManager';
import { JsonImporter } from './components/JsonImporter';
import { PostsManager } from './components/PostsManager';
import { StudentAttemptsManager } from './components/StudentAttemptsManager';
import { RawExplorer } from './components/RawExplorer';
import { RulesGuideModal } from './components/RulesGuideModal';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  ShieldAlert, 
  Flame,
  ArrowRight,
  Database
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'importer' | 'posts' | 'attempts' | 'raw'>('importer');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showRulesGuide, setShowRulesGuide] = useState(false);

  const handleError = (err: any) => {
    const msg = err?.message || String(err);
    setGlobalError(msg);
    if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('insufficient')) {
      setShowRulesGuide(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRulesGuide={() => setShowRulesGuide(true)}
      />

      {/* Global Error Banner (e.g. if Firestore rules block access) */}
      {globalError && (
        <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-3 text-amber-200 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Firestore Notice:</strong> {globalError}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRulesGuide(true)}
                className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition cursor-pointer flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Rules Fix देखें</span>
              </button>
              <button
                onClick={() => setGlobalError(null)}
                className="text-slate-400 hover:text-white px-2 py-0.5"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Project Connection Status Bar */}
        <div className="p-4 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Live Firebase Connected: <span className="font-mono text-indigo-400 font-bold">studyquake586</span>
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Cloud Firestore (default) • Regions & Collections sync active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Active Collections:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 font-mono text-[11px] border border-slate-700/60">
              curriculum_updates
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 font-mono text-[11px] border border-slate-700/60">
              posts
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 font-mono text-[11px] border border-slate-700/60">
              student_attempts
            </span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'curriculum' && <CurriculumManager onError={handleError} />}
        {activeTab === 'importer' && (
          <JsonImporter
            onError={handleError}
            onSuccess={(docId) => {
              setActiveTab('curriculum');
            }}
          />
        )}
        {activeTab === 'posts' && <PostsManager onError={handleError} />}
        {activeTab === 'attempts' && <StudentAttemptsManager onError={handleError} />}
        {activeTab === 'raw' && <RawExplorer onError={handleError} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>StudyQuake Firebase Cloud Firestore Manager</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Project: studyquake586</span>
            <span>•</span>
            <a
              href="https://console.firebase.google.com/project/studyquake586/firestore"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              Console खोलें <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Rules Guide Modal */}
      <RulesGuideModal
        isOpen={showRulesGuide}
        onClose={() => setShowRulesGuide(false)}
        errorDetail={globalError || undefined}
      />
    </div>
  );
}
