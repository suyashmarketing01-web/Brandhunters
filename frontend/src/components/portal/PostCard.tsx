import React from 'react';
import { motion } from 'motion/react';
import StatusBadge from './StatusBadge';
import { Calendar, Image, Video } from 'lucide-react';


interface Attachment {
  id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'video';
}

interface PostCardProps {
  key?: any;
  id: string;
  title?: string;
  description?: string;
  scheduled_date: string;
  status: 'Pending' | 'Approved' | 'Declined';
  attachments?: Attachment[];
  onClick?: () => void;
  showClient?: boolean;
  clientName?: string;
}


export default function PostCard({
  title,
  description,
  scheduled_date,
  status,
  attachments = [],
  onClick,
  showClient,
  clientName,
}: PostCardProps) {
  const thumbnail = attachments.find((a) => a.file_type === 'image');
  const videoCount = attachments.filter((a) => a.file_type === 'video').length;
  const imageCount = attachments.filter((a) => a.file_type === 'image').length;

  const formattedDate = new Date(scheduled_date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
      }}
      className="group"
    >
      {/* Thumbnail / Placeholder */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          background: thumbnail
            ? 'transparent'
            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        {thumbnail ? (
          <img
            src={thumbnail.file_url}
            alt={title || 'Post'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="group-hover:scale-110"
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '48px',
            }}
          >
            <Image />
          </div>
        )}

        {/* Status badge overlay */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <StatusBadge status={status} size="sm" />
        </div>

        {/* Media count overlay */}
        {(imageCount > 0 || videoCount > 0) && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              display: 'flex',
              gap: '8px',
            }}
          >
            {imageCount > 0 && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                <Image size={14} /> {imageCount}
              </span>
            )}
            {videoCount > 0 && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                <Video size={14} /> {videoCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {showClient && clientName && (
          <p
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
              fontWeight: 600,
            }}
          >
            {clientName}
          </p>
        )}

        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '6px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title || 'Untitled Post'}
        </h3>

        {description && (
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.5,
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '12px',
          }}
        >
          <Calendar size={14} />
          {formattedDate}
        </div>
      </div>
    </motion.div>
  );
}
