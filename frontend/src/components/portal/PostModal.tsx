import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, ChevronRight, Download, Calendar,
  Check, X, XCircle, Send, MessageSquare, Image, Video
} from 'lucide-react';
import StatusBadge from './StatusBadge';

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

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    title?: string;
    description?: string;
    scheduled_date: string;
    scheduled_time?: string;
    status: 'Pending' | 'Approved' | 'Declined';
    attachments?: Attachment[];
    suggestions?: Suggestion[];
  };
  isClient?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onSuggestion?: (message: string) => void;
}

export default function PostModal({
  isOpen,
  onClose,
  post,
  isClient = false,
  onAccept,
  onDecline,
  onSuggestion,
}: PostModalProps) {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [sending, setSending] = useState(false);

  const attachments = post.attachments || [];
  const suggestions = post.suggestions || [];

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  const handleSendSuggestion = async () => {
    if (!suggestion.trim() || !onSuggestion) return;
    setSending(true);
    try {
      await onSuggestion(suggestion.trim());
      setSuggestion('');
    } finally {
      setSending(false);
    }
  };

  const formattedDate = new Date(post.scheduled_date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'sticky',
                top: '16px',
                float: 'right',
                marginRight: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: '#ffffff',
                color: '#111',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>

            {/* Media slider */}
            {attachments.length > 0 && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                {attachments[currentMedia].file_type === 'image' ? (
                  <img
                    src={attachments[currentMedia].file_url}
                    alt={attachments[currentMedia].file_name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <video
                    src={attachments[currentMedia].file_url}
                    controls
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}

                {/* Navigation arrows */}
                {attachments.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentMedia((p) =>
                          p === 0 ? attachments.length - 1 : p - 1
                        )
                      }
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        background: '#ffffff',
                        color: '#111',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMedia((p) =>
                          p === attachments.length - 1 ? 0 : p + 1
                        )
                      }
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        background: '#ffffff',
                        color: '#111',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Dots */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '6px',
                      }}
                    >
                      {attachments.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentMedia(i)}
                          style={{
                            width: i === currentMedia ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            background:
                              i === currentMedia
                                ? '#C20000'
                                : 'rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Download button */}
                <button
                  onClick={() =>
                    handleDownload(
                      attachments[currentMedia]?.file_url,
                      attachments[currentMedia]?.file_name || 'download'
                    )
                  }
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '10px',
                    color: '#111',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            )}

            {/* Post details */}
            <div style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#111',
                  }}
                >
                  {post.title || 'Untitled Post'}
                </h2>
                <StatusBadge status={post.status} size="lg" />
              </div>

              {post.description && (
                <p
                  style={{
                    color: 'rgba(0,0,0,0.7)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}
                >
                  {post.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(0,0,0,0.4)',
                  fontSize: '13px',
                  marginBottom: '24px',
                }}
              >
                <Calendar size={15} />
                {formattedDate}
                {post.scheduled_time && ` at ${post.scheduled_time}`}
              </div>

              {/* Download all files */}
              {attachments.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '24px',
                  }}
                >
                  {attachments.map((att) => (
                    <button
                      key={att.id}
                      onClick={() => handleDownload(att.file_url, att.file_name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        background: 'rgba(0,0,0,0.03)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '8px',
                        color: 'rgba(0,0,0,0.7)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Download size={13} />
                      {att.file_name || 'File'}
                    </button>
                  ))}
                </div>
              )}

              {/* Client actions */}
              {isClient && post.status === 'Pending' && (
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <button
                    onClick={onAccept}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <Check size={18} /> Accept Post
                  </button>
                  <button
                    onClick={onDecline}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '12px',
                      color: '#EF4444',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <XCircle size={18} /> Decline
                  </button>
                </div>
              )}

              {/* Suggestions section */}
              {isClient && (
                <div
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    paddingTop: '20px',
                  }}
                >
                  <h3
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#111',
                      marginBottom: '16px',
                    }}
                  >
                    <MessageSquare size={16} /> Suggestions
                  </h3>

                  {/* Existing suggestions */}
                  {suggestions.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '16px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}
                    >
                      {suggestions.map((s) => (
                        <div
                          key={s.id}
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(0,0,0,0.02)',
                            borderRadius: '10px',
                            border: '1px solid rgba(0,0,0,0.05)',
                          }}
                        >
                          <p
                            style={{
                              color: 'rgba(0,0,0,0.7)',
                              fontSize: '13px',
                              lineHeight: 1.5,
                            }}
                          >
                            {s.message}
                          </p>
                          <p
                            style={{
                              color: 'rgba(0,0,0,0.35)',
                              fontSize: '11px',
                              marginTop: '6px',
                            }}
                          >
                            {new Date(s.created_at).toLocaleString('en-IN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New suggestion input */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleSendSuggestion()
                      }
                      placeholder="Type your suggestion here..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        background: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderRadius: '10px',
                        color: '#111',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={handleSendSuggestion}
                      disabled={sending || !suggestion.trim()}
                      style={{
                        padding: '12px 18px',
                        background: suggestion.trim()
                          ? 'linear-gradient(135deg, #C20000, #FF4444)'
                          : 'rgba(0,0,0,0.03)',
                        border: 'none',
                        borderRadius: '10px',
                        color: suggestion.trim() ? '#fff' : 'rgba(0,0,0,0.3)',
                        cursor: suggestion.trim() ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                        opacity: suggestion.trim() ? 1 : 0.5,
                      }}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
