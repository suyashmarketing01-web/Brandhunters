import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarFilterProps {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  scheduledDates?: string[];
}

export default function CalendarFilter({ selectedDate, onDateSelect, scheduledDates = [] }: CalendarFilterProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const getDaysInMonth = (y: number, m: number) => {
    const date = new Date(y, m, 1);
    const days = [];
    const firstDayIndex = date.getDay();

    // Pad empty spaces for days of previous month
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

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
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

          return (
            <button
              key={day.toISOString()}
              onClick={() => {
                if (selected) {
                  onDateSelect(null); // Deselect
                } else {
                  onDateSelect(dateStr);
                }
              }}
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
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                if (!selected) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  (e.currentTarget as HTMLElement).style.background = todayDay ? 'rgba(194, 0, 0, 0.05)' : 'transparent';
                }
              }}
            >
              <span>{day.getDate()}</span>
              {hasPost && (
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: selected ? '#fff' : '#C20000',
                    marginTop: '2px',
                  }}
                />
              )}
            </button>
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
    </div>
  );
}
