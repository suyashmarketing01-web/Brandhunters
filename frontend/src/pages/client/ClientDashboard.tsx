import { useState, useEffect } from 'react';
import { FileText, Calendar as CalendarIcon, Filter, Video, Image } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CalendarFilter from '../../components/portal/CalendarFilter';
import PostModal from '../../components/portal/PostModal';
import StatusBadge from '../../components/portal/StatusBadge';

interface Attachment {
  id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'video';
}

interface Suggestion {
  id: string;
  message: string;
  created_at: string;
}

interface Post {
  id: string;
  title: string | null;
  description: string | null;
  scheduled_date: string;
  scheduled_time: string | null;
  status: 'Pending' | 'Approved' | 'Declined';
  attachments: Attachment[];
  suggestions?: Suggestion[];
}

export default function ClientDashboard() {
  const { clientToken } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Fetch all posts once to allow client-side filtering and full calendar dot markers
      const res = await fetch('/api/posts/client/me', {
        headers: { Authorization: `Bearer ${clientToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch client posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetail = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${clientToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setSelectedPost(data.data);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Failed to fetch post details:', err);
    }
  };

  const handleStatusChange = async (postId: string, newStatus: 'Approved' | 'Declined') => {
    try {
      const res = await fetch(`/api/posts/${postId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh details
        fetchPostDetail(postId);
        // Refresh posts list
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddSuggestion = async (message: string) => {
    if (!selectedPost) return;
    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${clientToken}`,
        },
        body: JSON.stringify({ post_id: selectedPost.id, message }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh details to show suggestion immediately
        fetchPostDetail(selectedPost.id);
      }
    } catch (err) {
      console.error('Failed to send suggestion:', err);
    }
  };

  // Extract all unique dates where posts are scheduled
  const scheduledDates = Array.from(new Set(posts.map((p) => p.scheduled_date))) as string[];

  // Filter posts client-side
  const filteredPosts = posts.filter((post) => {
    const matchesDate = !selectedDate || post.scheduled_date === selectedDate;
    const matchesStatus = !statusFilter || post.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="portal-grid">
      {/* Sidebar calendar filter (Desktop left side, Mobile top) */}
      <div className="portal-sidebar">
        <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', marginBottom: '8px' }}>
              Filter by Date
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '16px' }}>
              Select a date on the calendar below to show scheduled posts for that day.
            </p>
            <CalendarFilter
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              scheduledDates={scheduledDates}
            />
          </div>

          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
              Filter by Status
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <Filter size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', cursor: 'pointer', width: '100%' }}
              >
                <option value="" style={{ background: '#0f0f14' }}>All Statuses</option>
                <option value="Pending" style={{ background: '#0f0f14' }}>Pending Approval</option>
                <option value="Approved" style={{ background: '#0f0f14' }}>Approved</option>
                <option value="Declined" style={{ background: '#0f0f14' }}>Declined</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main post grid list */}
      <div className="portal-main">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: '"Space Grotesk", sans-serif', marginBottom: '6px' }}>
            Scheduled Posts
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            {selectedDate
              ? `Displaying posts scheduled for ${new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`
              : 'Displaying all scheduled Instagram content'}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#C20000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : filteredPosts.length > 0 ? (
          /* Premium Table Format */
          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scheduled Date</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Post Name</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description / Caption</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Media Preview</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => {
                  const thumbnail = post.attachments.find((a) => a.file_type === 'image');
                  const hasVideo = post.attachments.some((a) => a.file_type === 'video');

                  return (
                    <tr
                      key={post.id}
                      onClick={() => fetchPostDetail(post.id)}
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
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px' }}>
            <FileText size={48} style={{ color: 'rgba(255,255,255,0.1)', margin: '0 auto 16px' }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontWeight: 500 }}>
              No scheduled posts found
            </p>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginTop: '6px' }}>
              Check back later or contact your account manager if you expect scheduled content here.
            </p>
          </div>
        )}
      </div>

      {/* Post Modal popup */}
      {selectedPost && (
        <PostModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPost(null);
          }}
          post={{
            ...selectedPost,
            title: selectedPost.title || undefined,
            description: selectedPost.description || undefined,
            scheduled_time: selectedPost.scheduled_time || undefined,
          }}
          isClient={true}
          onAccept={() => handleStatusChange(selectedPost.id, 'Approved')}
          onDecline={() => handleStatusChange(selectedPost.id, 'Declined')}
          onSuggestion={handleAddSuggestion}
        />
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .portal-grid {
            grid-template-columns: 300px 1fr !important;
          }
        }
        .portal-table-row:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}
