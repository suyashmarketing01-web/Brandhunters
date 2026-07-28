interface StatusBadgeProps {
  status: 'Pending' | 'Approved' | 'Declined';
  size?: 'sm' | 'md' | 'lg';
}

const statusStyles = {
  Pending: {
    bg: 'rgba(217, 119, 6, 0.08)',
    border: 'rgba(217, 119, 6, 0.25)',
    text: '#D97706',
    dot: '#D97706',
  },
  Approved: {
    bg: 'rgba(5, 150, 105, 0.08)',
    border: 'rgba(5, 150, 105, 0.25)',
    text: '#059669',
    dot: '#059669',
  },
  Declined: {
    bg: 'rgba(220, 38, 38, 0.08)',
    border: 'rgba(220, 38, 38, 0.25)',
    text: '#DC2626',
    dot: '#DC2626',
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
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: s.text,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: '9999px',
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
