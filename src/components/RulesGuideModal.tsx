import React from 'react';
import { ShieldAlert, X, Copy, Check, ExternalLink } from 'lucide-react';

interface RulesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorDetail?: string;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({ isOpen, onClose, errorDetail }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const sampleRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Development / Testing Mode: Allows read and write access
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleRules);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">Firebase Firestore Rules Guide</h3>
            <p className="text-sm text-slate-400">डेटाबेस में Read/Write परमिशन कैसे सेट करें</p>
          </div>
        </div>

        {errorDetail && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs font-mono break-all">
            <strong>Error:</strong> {errorDetail}
          </div>
        )}

        <div className="space-y-4 text-sm text-slate-300">
          <p>
            अगर Firestore से डेटा लोड करते समय <span className="text-amber-300 font-medium">Missing or insufficient permissions</span> एरर आता है, तो इसका मतलब आपके Firebase Console में <strong>Rules</strong> सेट करने होंगे:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-slate-300">
            <li>
              अपने <a href="https://console.firebase.google.com/project/studyquake586/firestore/rules" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-1 font-semibold">
                Firebase Console ➔ Cloud Firestore ➔ Rules <ExternalLink className="w-3 h-3" />
              </a> टैब पर जाएँ।
            </li>
            <li>नीचे दिए गए रूल्स को कॉपी करके वहाँ पेस्ट करें।</li>
            <li><strong>Publish</strong> बटन पर क्लिक करें। 10 सेकंड में रूल्स लागू हो जाएंगे!</li>
          </ol>

          <div className="relative">
            <div className="flex items-center justify-between bg-slate-950 px-4 py-2 rounded-t-xl border-t border-x border-slate-800 text-xs text-slate-400">
              <span>firestore.rules (Testing / Development Mode)</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-xs font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Rules'}
              </button>
            </div>
            <pre className="p-4 bg-black/80 rounded-b-xl border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
              {sampleRules}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition text-sm cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            समझ गया / Done
          </button>
        </div>
      </div>
    </div>
  );
};
