import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, ArrowLeft, X, Filter,
  Calendar as CalendarIcon, FileText, Clock, Video, Image
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PostModal from '../../components/portal/PostModal';
import FileUpload from '../../components/portal/FileUpload';
import StatusBadge from '../../components/portal/StatusBadge';


interface Attachment {
  id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'video';
}

interface Post {
  id: string;
  client_id: string;
  title: string | null;
  description: string | null;
  scheduled_date: string;
  scheduled_time: string | null;
  status: 'Pending' | 'Approved' | 'Declined';
  admin_notes: string | null;
  attachments: Attachment[];
  suggestions?: any[];
  post_status_history?: any[];
}

interface ClientInfo {
  id: string;
  company_name: string;
  email: string;
}

export default function ClientPosts() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { adminToken } = useAuth();

  const [client, setClient] = useState<ClientInfo | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Create form
  const [form, setForm] = useState({
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '',
    admin_notes: '',
  });
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchClient();
    fetchPosts();
  }, [clientId, statusFilter, dateFilter]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setClient(data.data);
    } catch (err) {
      console.error('Failed to fetch client:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      let url = `/api/posts?client_id=${clientId}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (dateFilter) url += `&date=${dateFilter}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.scheduled_date) return;
    setCreating(true);
    try {
      // 1. Create post
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ ...form, client_id: clientId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // 2. Upload files if any
      if (uploadFiles.length > 0) {
        const formData = new FormData();
        uploadFiles.forEach((f) => formData.append('files', f));

        await fetch(`/api/upload/${data.data.id}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
          body: formData,
        });
      }

      setShowCreate(false);
      setForm({ title: '', description: '', scheduled_date: '', scheduled_time: '', admin_notes: '' });
      setUploadFiles([]);
      fetchPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setCreating(false);
    }
  };

  const openPostDetail = async (post: Post) => {
    // Fetch full detail with suggestions & history
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedPost(data.data);
        setShowDetail(true);
      }
    } catch (err) {
      setSelectedPost(post);
      setShowDetail(true);
    }
  };

  const statusOptions = ['', 'Pending', 'Approved', 'Declined'];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#C20000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <button
          onClick={() => navigate('/admin/clients')}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: '"Space Grotesk", sans-serif' }}>
            {client?.company_name || 'Client Posts'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            {client?.email} · {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          marginTop: '20px',
        }}
      >
        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Status filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <Filter size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="" style={{ background: '#1a1a24' }}>All Status</option>
              <option value="Pending" style={{ background: '#1a1a24' }}>Pending</option>
              <option value="Approved" style={{ background: '#1a1a24' }}>Approved</option>
              <option value="Declined" style={{ background: '#1a1a24' }}>Declined</option>
            </select>
          </div>

          {/* Date filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <CalendarIcon size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', cursor: 'pointer', colorScheme: 'dark' }}
            />
            {dateFilter && (
              <button onClick={() => setDateFilter('')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Create button */}
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
            background: 'linear-gradient(135deg, #C20000, #FF4444)', border: 'none', borderRadius: '12px',
            color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(194,0,0,0.3)',
          }}
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* Tabular Posts Layout */}
      {posts.length > 0 ? (
        <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled Date</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Post Name</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description / Caption</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Media Preview</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Suggestions</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const thumbnail = post.attachments.find((a) => a.file_type === 'image');
                const hasVideo = post.attachments.some((a) => a.file_type === 'video');
                const latestSuggestion = post.suggestions && post.suggestions.length > 0
                  ? post.suggestions[post.suggestions.length - 1].message
                  : null;

                return (
                  <tr
                    key={post.id}
                    onClick={() => openPostDetail(post)}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="portal-table-row"
                  >
                    {/* Scheduled Date */}
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                      {new Date(post.scheduled_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {post.scheduled_time && (
                        <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                          {post.scheduled_time}
                        </span>
                      )}
                    </td>

                    {/* Post Name */}
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#fff', fontWeight: 700 }}>
                      {post.title || 'Untitled Post'}
                    </td>

                    {/* Description */}
                    <td
                      style={{
                        padding: '16px 20px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        maxWidth: '300px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {post.description || 'No caption provided'}
                    </td>

                    {/* Media Preview */}
                    <td style={{ padding: '16px 20px' }}>
                      {thumbnail ? (
                        <img
                          src={thumbnail.file_url}
                          alt="preview"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      ) : hasVideo ? (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.4)',
                          }}
                        >
                          <Video size={16} />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px dashed rgba(255,255,255,0.08)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.2)',
                          }}
                        >
                          <Image size={16} />
                        </div>
                      )}
                    </td>

                    {/* Client Suggestions */}
                    <td
                      style={{
                        padding: '16px 20px',
                        fontSize: '13px',
                        color: latestSuggestion ? '#EF4444' : 'rgba(255,255,255,0.3)',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {latestSuggestion || 'No suggestions'}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '16px 20px' }}>
                      <StatusBadge status={post.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <FileText size={48} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
            No posts yet. Create the first post for this client!
          </p>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostModal
          isOpen={showDetail}
          onClose={() => { setShowDetail(false); setSelectedPost(null); }}
          post={{
            ...selectedPost,
            title: selectedPost.title || undefined,
            description: selectedPost.description || undefined,
            scheduled_time: selectedPost.scheduled_time || undefined,
          }}
          isClient={false}
        />
      )}

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreate(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0f0f14', borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '100%', maxWidth: '560px', maxHeight: '90vh',
                overflow: 'auto', padding: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>Create Post</h2>
                <button onClick={() => setShowCreate(false)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreate}>
                {/* Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Post title"
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Post description / caption"
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled Date *</label>
                    <input
                      type="date"
                      value={form.scheduled_date}
                      onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</label>
                    <input
                      type="time"
                      value={form.scheduled_time}
                      onChange={(e) => setForm({ ...form, scheduled_time: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', colorScheme: 'dark', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Admin Notes */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Notes</label>
                  <textarea
                    value={form.admin_notes}
                    onChange={(e) => setForm({ ...form, admin_notes: e.target.value })}
                    placeholder="Internal notes (not visible to client)"
                    rows={2}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>

                {/* File Upload */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attachments</label>
                  <FileUpload onFilesSelected={setUploadFiles} />
                </div>

                <button
                  type="submit"
                  disabled={creating}
                  style={{
                    width: '100%', padding: '14px',
                    background: 'linear-gradient(135deg, #C20000, #FF4444)',
                    border: 'none', borderRadius: '12px', color: '#fff',
                    fontSize: '15px', fontWeight: 700, cursor: creating ? 'wait' : 'pointer',
                    boxShadow: '0 4px 24px rgba(194,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {creating ? 'Creating...' : <><Plus size={18} /> Create Post</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .portal-table-row:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}
