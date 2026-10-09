import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { StudentAttemptDocument } from '../types';
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Trash2, 
  RefreshCw, 
  Award, 
  UserCheck, 
  BarChart3, 
  X, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface StudentAttemptsManagerProps {
  onError: (err: any) => void;
}

export const StudentAttemptsManager: React.FC<StudentAttemptsManagerProps> = ({ onError }) => {
  const [attempts, setAttempts] = useState<StudentAttemptDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Add attempt modal
  const [modalOpen, setModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [testTitle, setTestTitle] = useState('12th Physics Mock Test #1');
  const [score, setScore] = useState<number>(85);
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [timeSpent, setTimeSpent] = useState<number>(45);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, 'student_attempts');

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs: StudentAttemptDocument[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setAttempts(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching student_attempts:', error);
        onError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateAttempt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !testTitle.trim()) return;

    const calcPercentage = Math.round((Number(score) / (Number(totalMarks) || 100)) * 100);
    const isPassed = calcPercentage >= 40;

    try {
      const colRef = collection(db, 'student_attempts');
      await addDoc(colRef, {
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim() || undefined,
        testTitle: testTitle.trim(),
        score: Number(score),
        totalMarks: Number(totalMarks),
        percentage: calcPercentage,
        passed: isPassed,
        timeSpentMinutes: Number(timeSpent),
        createdAt: serverTimestamp(),
      });

      setModalOpen(false);
      setStudentName('');
      setStudentEmail('');
      setScore(85);
      setTotalMarks(100);
    } catch (err) {
      console.error('Failed to add student attempt:', err);
      onError(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this attempt record?')) return;
    try {
      await deleteDoc(doc(db, 'student_attempts', id));
    } catch (err) {
      console.error('Failed to delete attempt:', err);
      onError(err);
    }
  };

  const filteredAttempts = attempts.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.studentName?.toLowerCase().includes(q) ||
      a.studentEmail?.toLowerCase().includes(q) ||
      a.testTitle?.toLowerCase().includes(q)
    );
  });

  // Analytics stats
  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalAttempts)
    : 0;
  const passCount = attempts.filter((a) => a.passed !== false).length;
  const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Cloud Firestore Collection</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            student_attempts
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-normal">
              {totalAttempts} Record{totalAttempts !== 1 ? 's' : ''}
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            छात्रों के टेस्ट पेपर्स, मॉक एग्ज़ाम्स और क्विज़ रिजल्ट्स का डेटा देखें व मैनेज करें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>नया Attempt जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-950/60 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/40">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Total Attempts</div>
            <div className="text-2xl font-bold text-white">{totalAttempts}</div>
          </div>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/40">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Average Score</div>
            <div className="text-2xl font-bold text-emerald-400">{avgScore}%</div>
          </div>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/40">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Pass Rate</div>
            <div className="text-2xl font-bold text-purple-300">{passRate}%</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="स्टूडेंट का नाम, ईमेल या टेस्ट का नाम सर्च करें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Attempts Table */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-3" />
          <p className="text-sm">Firestore से `student_attempts` लोड हो रहे हैं...</p>
        </div>
      ) : filteredAttempts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200">कोई Attempts नहीं मिले</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
            `student_attempts` कलेक्शन में अभी कोई डेटा मौजूद नहीं है।
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition cursor-pointer"
          >
            पहला Record जोड़ें
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Percentage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredAttempts.map((att) => {
                  const pct = att.percentage ?? Math.round(((att.score || 0) / (att.totalMarks || 100)) * 100);
                  const isPass = att.passed !== false && pct >= 40;

                  return (
                    <tr key={att.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="text-sm font-semibold">{att.studentName || 'Anonymous Student'}</div>
                        {att.studentEmail && (
                          <div className="text-[11px] text-slate-500">{att.studentEmail}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {att.testTitle || 'General Assessment'}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {att.score ?? 0} / {att.totalMarks ?? 100}
                      </td>
                      <td className="py-3.5 px-4 font-bold">
                        <span className={pct >= 60 ? 'text-emerald-400' : pct >= 40 ? 'text-amber-400' : 'text-red-400'}>
                          {pct}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            isPass
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                              : 'bg-red-950 text-red-400 border border-red-800/60'
                          }`}
                        >
                          {isPass ? 'Passed' : 'Needs Work'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(att.id)}
                          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                          title="Delete attempt"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create Attempt */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">नया Student Attempt जोड़ें</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Target Collection: student_attempts
            </p>

            <form onSubmit={handleCreateAttempt} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Student Name (छात्र का नाम)
                </label>
                <input
                  type="text"
                  required
                  placeholder="जैसे: Ramesh Choudhary"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Student Email (वैकल्पिक)
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Test / Exam Title
                </label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Time (Min)
                  </label>
                  <input
                    type="number"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  Attempt सेव करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
