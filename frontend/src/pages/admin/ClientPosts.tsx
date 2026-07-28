import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, ArrowLeft, Calendar, FileText, Image, Video, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/portal/StatusBadge';
import PostModal from '../../components/portal/PostModal';
import FileUpload from '../../components/portal/FileUpload';

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
  const { clientId } = useParams<{ clientId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Form
  const [form, setForm] = useState({
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '',
    admin_notes: '',
  });
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [creating, setCreating] = useState(false);

  const { adminToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      fetchClientInfo();
      fetchPosts();
    }
  }, [clientId]);

  const fetchClientInfo = async () => {
    try {
      const res = await fetch(`/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setClient(data.data);
    } catch (err) {
      console.error('Error fetching client details:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/posts?client_id=${clientId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) setPosts(data.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const openPostDetail = async (post: Post) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedPost(data.data);
      }
    } catch (err) {
      console.error('Error fetching post detail:', err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    setCreating(true);

    try {
      // Step 1: Create the post with JSON body
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          title: form.title || null,
          description: form.description || null,
          scheduled_date: form.scheduled_date,
          scheduled_time: form.scheduled_time || null,
          admin_notes: form.admin_notes || null,
        }),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.error || data.message || 'Failed to create post');
        return;
      }

      const newPostId = data.data.id;

      // Step 2: Upload attachments (if any) to the upload endpoint
      if (uploadFiles.length > 0) {
        const formData = new FormData();
        uploadFiles.forEach((file) => {
          formData.append('files', file);
        });

        const uploadRes = await fetch(`/api/upload/${newPostId}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          console.warn('Post created but file upload failed:', uploadData.error);
          alert('Post created, but some attachments failed to upload.');
        }
      }

      // Reset form
      setForm({
        title: '',
        description: '',
        scheduled_date: '',
        scheduled_time: '',
        admin_notes: '',
      });
      setUploadFiles([]);
      setShowCreate(false);
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error creating post');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0,0,0,0.1)',
            borderTopColor: '#C20000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <button
          onClick={() => navigate('/admin/clients')}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '10px',
            padding: '10px',
            color: '#111',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#111',
              fontFamily: '"Space Grotesk", sans-serif',
              margin: 0,
            }}
          >
            {client?.company_name || 'Loading client...'}
          </h1>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px', margin: '4px 0 0' }}>
            {client?.email}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', margin: 0 }}>Scheduled Content</h2>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #C20000, #FF4444)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(194,0,0,0.2)',
          }}
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* Tabular Posts Layout */}
      {posts.length > 0 ? (
        <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.01)' }}>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled Date</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Post Name</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description / Caption</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Media Preview</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Suggestions</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
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
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    className="portal-table-row"
                  >
                    {/* Scheduled Date */}
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111', fontWeight: 500 }}>
                      {new Date(post.scheduled_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {post.scheduled_time && (
                        <span style={{ display: 'block', fontSize: '11px', color: 'rgba(0,0,0,0.4)', marginTop: '4px' }}>
                          {post.scheduled_time}
                        </span>
                      )}
                    </td>

                    {/* Post Name */}
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111', fontWeight: 700 }}>
                      {post.title || 'Untitled Post'}
                    </td>

                    {/* Description */}
                    <td
                      style={{
                        padding: '16px 20px',
                        fontSize: '13px',
                        color: 'rgba(0,0,0,0.6)',
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
                            border: '1px solid rgba(0,0,0,0.08)',
                          }}
                        />
                      ) : hasVideo ? (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(0,0,0,0.03)',
                            border: '1px solid rgba(0,0,0,0.08)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(0,0,0,0.4)',
                          }}
                        >
                          <Video size={16} />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(0,0,0,0.01)',
                            border: '1px dashed rgba(0,0,0,0.1)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(0,0,0,0.3)',
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
                        color: latestSuggestion ? '#EF4444' : 'rgba(0,0,0,0.3)',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: latestSuggestion ? 600 : 400,
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
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)' }}>
          <FileText size={48} style={{ color: 'rgba(0,0,0,0.1)', margin: '0 auto 16px' }} />
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '16px' }}>
            No scheduled posts for this client yet.
          </p>
        </div>
      )}

      {/* Post details modal */}
      {selectedPost && (
        <PostModal
          isOpen={true}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          isClient={false}
        />
      )}

      {/* Create post modal */}
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
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff', borderRadius: '24px',
                border: '1px solid rgba(0,0,0,0.08)',
                width: '100%', maxWidth: '560px', maxHeight: '90vh',
                overflow: 'auto', padding: '32px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111', margin: 0 }}>Create Post</h2>
                <button onClick={() => setShowCreate(false)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)', color: 'rgba(0,0,0,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreate}>
                {/* Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Post title"
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#111', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Post description / caption"
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#111', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Schedule date/time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date *</label>
                    <input
                      type="date"
                      value={form.scheduled_date}
                      onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#111', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</label>
                    <input
                      type="time"
                      value={form.scheduled_time}
                      onChange={(e) => setForm({ ...form, scheduled_time: e.target.value })}
                      placeholder="e.g. 10:00 AM"
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#111', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Admin notes */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Notes</label>
                  <textarea
                    value={form.admin_notes}
                    onChange={(e) => setForm({ ...form, admin_notes: e.target.value })}
                    placeholder="Internal notes (not visible to client)"
                    rows={2}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', color: '#111', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>

                {/* File Upload */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attachments</label>
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
                    boxShadow: '0 4px 20px rgba(194,0,0,0.2)',
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
          background-color: rgba(0, 0, 0, 0.02) !important;
        }
      `}</style>
    </div>
  );
}
