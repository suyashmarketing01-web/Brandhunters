import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PostStatusInfo {
  scheduled_date: string;
  status: 'Pending' | 'Approved' | 'Declined';
}

interface CalendarFilterProps {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  scheduledDates?: string[];
  /** Pass full post data for status-aware dot colors & tooltips */
  posts?: PostStatusInfo[];
}

export default function CalendarFilter({ selectedDate, onDateSelect, scheduledDates = [], posts = [] }: CalendarFilterProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const getDaysInMonth = (y: number, m: number) => {
    const date = new Date(y, m, 1);
    const days = [];
    const firstDayIndex = date.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    while (date.getMonth() === m) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(year, month);

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    const sel = new Date(selectedDate);
    return (
      date.getDate() === sel.getDate() &&
      date.getMonth() === sel.getMonth() &&
      date.getFullYear() === sel.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };

  /** Get status summary for a given date string */
  const getDateStatusSummary = (dateStr: string) => {
    const datePosts = posts.filter((p) => p.scheduled_date === dateStr);
    const approved = datePosts.filter((p) => p.status === 'Approved').length;
    const declined = datePosts.filter((p) => p.status === 'Declined').length;
    const pending = datePosts.filter((p) => p.status === 'Pending').length;
    return { total: datePosts.length, approved, declined, pending };
  };

  /** Determine the dot color based on post statuses for that date */
  const getDotColor = (dateStr: string, isSelectedDay: boolean) => {
    if (isSelectedDay) return '#fff';
    const summary = getDateStatusSummary(dateStr);
    if (summary.total === 0) return '#C20000';
    if (summary.approved === summary.total) return '#059669'; // all approved = green
    if (summary.declined > 0) return '#DC2626'; // any declined = red
    if (summary.pending > 0) return '#D97706'; // any pending = amber
    return '#059669';
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        position: 'relative',
      }}
    >
      {/* Month nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: 'rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            color: '#111',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.08)';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.03)';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#111',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: 'rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            color: '#111',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.08)';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.03)';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '8px',
        }}
      >
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.4)',
              fontSize: '11px',
              fontWeight: 600,
              padding: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div
        ref={scrollRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
        }}
      >
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const selected = isSelected(day);
          const todayDay = isToday(day);
          const dateStr = formatDate(day);
          const hasPost = scheduledDates.includes(dateStr);
          const summary = hasPost ? getDateStatusSummary(dateStr) : null;
          const dotColor = hasPost ? getDotColor(dateStr, selected) : '';
          const isHovered = hoveredDate === dateStr;

          return (
            <div key={day.toISOString()} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  if (selected) {
                    onDateSelect(null);
                  } else {
                    onDateSelect(dateStr);
                  }
                }}
                onMouseEnter={() => setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '10px',
                  border: selected
                    ? '2px solid #C20000'
                    : todayDay
                    ? '2px solid rgba(194, 0, 0, 0.3)'
                    : '1px solid transparent',
                  background: selected
                    ? 'linear-gradient(135deg, #C20000, #FF4444)'
                    : todayDay
                    ? 'rgba(194, 0, 0, 0.05)'
                    : 'transparent',
                  color: selected
                    ? '#fff'
                    : todayDay
                    ? '#C20000'
                    : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '13px',
                  fontWeight: selected || todayDay ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isHovered && hasPost && !selected ? 'scale(1.12)' : 'scale(1)',
                  boxShadow: isHovered && hasPost && !selected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <span>{day.getDate()}</span>
                {hasPost && (
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: dotColor,
                      marginTop: '2px',
                      transition: 'background 0.3s ease',
                      boxShadow: !selected ? `0 0 4px ${dotColor}` : 'none',
                    }}
                  />
                )}
              </button>

              {/* Hover tooltip showing post status breakdown */}
              {isHovered && hasPost && summary && summary.total > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '105%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#111',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    zIndex: 50,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                    animation: 'tooltipFadeIn 0.2s ease',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '2px', fontSize: '12px' }}>
                    {summary.total} post{summary.total > 1 ? 's' : ''}
                  </div>
                  {summary.approved > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                      {summary.approved} Approved
                    </div>
                  )}
                  {summary.pending > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D97706', display: 'inline-block' }} />
                      {summary.pending} Pending
                    </div>
                  )}
                  {summary.declined > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', display: 'inline-block' }} />
                      {summary.declined} Declined
                    </div>
                  )}
                  {/* Arrow */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '10px',
                      height: '10px',
                      background: '#111',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Clear filter */}
      {selectedDate && (
        <button
          onClick={() => onDateSelect(null)}
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '8px',
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            color: '#C20000',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)';
          }}
        >
          Clear Date Filter
        </button>
      )}

      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
