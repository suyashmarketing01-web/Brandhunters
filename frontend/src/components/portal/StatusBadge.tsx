interface StatusBadgeProps {
  status: 'Pending' | 'Approved' | 'Declined';
  size?: 'sm' | 'md' | 'lg';
}

const statusStyles = {
  Pending: {
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.4)',
    text: '#F59E0B',
    glow: '0 0 12px rgba(245, 158, 11, 0.25)',
    dot: '#F59E0B',
  },
  Approved: {
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)',
    text: '#10B981',
    glow: '0 0 12px rgba(16, 185, 129, 0.25)',
    dot: '#10B981',
  },
  Declined: {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.4)',
    text: '#EF4444',
    glow: '0 0 12px rgba(239, 68, 68, 0.25)',
    dot: '#EF4444',
  },
};

const sizeClasses = {
  sm: { padding: '2px 8px', fontSize: '11px', dotSize: 6 },
  md: { padding: '4px 12px', fontSize: '12px', dotSize: 7 },
  lg: { padding: '6px 16px', fontSize: '13px', dotSize: 8 },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const s = statusStyles[status];
  const sz = sizeClasses[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: s.text,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: '9999px',
        boxShadow: s.glow,
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: sz.dotSize,
          height: sz.dotSize,
          borderRadius: '50%',
          background: s.dot,
          animation: status === 'Pending' ? 'pulse 2s ease-in-out infinite' : undefined,
        }}
      />
      {status}
    </span>
  );
}
