import React, { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { PostDocument } from '../types';
import { 
  Newspaper, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  X, 
  RefreshCw, 
  Tag, 
  Calendar, 
  User, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface PostsManagerProps {
  onError: (err: any) => void;
}

export const PostsManager: React.FC<PostsManagerProps> = ({ onError }) => {
  const [posts, setPosts] = useState<PostDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Exam Updates');
  const [author, setAuthor] = useState('StudyQuake Team');
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['12th', 'Rajasthan']);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, 'posts');

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs: PostDocument[] = snapshot.docs.map((d) => ({
          id: d.id,
          title: d.data().title || 'Untitled Post',
          ...d.data(),
        }));
        setPosts(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        onError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const openCreateModal = () => {
    setEditingPostId(null);
    setTitle('');
    setContent('');
    setCategory('Exam Updates');
    setAuthor('StudyQuake Team');
    setStatus('published');
    setTags(['StudyQuake']);
    setModalOpen(true);
  };

  const openEditModal = (post: PostDocument) => {
    setEditingPostId(post.id);
    setTitle(post.title || '');
    setContent(post.content || '');
    setCategory(post.category || 'General');
    setAuthor(post.author || 'StudyQuake Team');
    setStatus(post.status || 'published');
    setTags(post.tags || []);
    setModalOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingPostId) {
        const postRef = doc(db, 'posts', editingPostId);
        await updateDoc(postRef, {
          title: title.trim(),
          content: content.trim(),
          category: category.trim(),
          author: author.trim(),
          status,
          tags,
          updatedAt: serverTimestamp(),
        });
      } else {
        const colRef = collection(db, 'posts');
        await addDoc(colRef, {
          title: title.trim(),
          content: content.trim(),
          category: category.trim(),
          author: author.trim(),
          status,
          tags,
          createdAt: serverTimestamp(),
        });
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Failed to save post:', err);
      onError(err);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (err) {
      console.error('Failed to delete post:', err);
      onError(err);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedFilter === 'all' ? true : p.status === selectedFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase">
            <Newspaper className="w-4 h-4" />
            <span>Cloud Firestore Collection</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-3">
            posts
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-normal">
              {posts.length} Post{posts.length !== 1 ? 's' : ''}
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            स्टडी नोट्स, एग्जाम नोटिफिकेशन्स और आर्टिकल्स को यहाँ सीधे Firestore में मैनेज करें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>नया Post बनाएँ</span>
          </button>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="पोस्ट टाइटल, कंटेंट या केटेगरी सर्च करें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'published', 'draft'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedFilter(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
                selectedFilter === mode
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-3" />
          <p className="text-sm">Firestore से `posts` लोड हो रहे हैं...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200">कोई Post नहीं मिला</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
            `posts` कलेक्शन में कोई पोस्ट उपलब्ध नहीं है।
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition cursor-pointer"
          >
            पहला Post जोड़ें
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                    {post.category || 'General'}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      post.status === 'published'
                        ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                        : 'bg-amber-950/70 text-amber-400 border border-amber-800/50'
                    }`}
                  >
                    {post.status || 'published'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white leading-snug line-clamp-2">
                  {post.title}
                </h4>

                {post.content && (
                  <p className="text-xs text-slate-400 line-clamp-3">
                    {post.content}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{post.author || 'Admin'}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(post)}
                    className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create / Edit Post */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative my-6">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-1">
              {editingPostId ? 'Edit Post' : 'नया Post तैयार करें'}
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Target Collection: posts {editingPostId ? `(doc: ${editingPostId})` : ''}
            </p>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Post Title (शीर्षक)
                </label>
                <input
                  type="text"
                  required
                  placeholder="जैसे: Rajasthan Patwar 2026 Syllabus Released"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category (श्रेणी)
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Post Content (सामग्री / नोट्स)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="पोस्ट का विवरण या महत्वपूर्ण जानकारी..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tags (टैग्स)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 bg-indigo-950 text-indigo-300 rounded-md border border-indigo-800"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="टैग लिखकर Add करें..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tagInput.trim()) {
                          setTags([...tags, tagInput.trim()]);
                          setTagInput('');
                        }
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tagInput.trim()) {
                        setTags([...tags, tagInput.trim()]);
                        setTagInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
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
                  {editingPostId ? 'Update Post' : 'Post Publish करें'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
