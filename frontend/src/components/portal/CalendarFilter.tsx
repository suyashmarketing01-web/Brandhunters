import { useState, useRef, useEffect } from 'react';
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

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const formatDate = (day: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const isToday = (day: number) => {
    const date = new Date(year, month, day);
    return date.getTime() === today.getTime();
  };

  const isSelected = (day: number) => selectedDate === formatDate(day);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
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
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <h3
          style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          {monthName}
        </h3>

        <button
          onClick={nextMonth}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
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
              color: 'rgba(255,255,255,0.35)',
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
              key={day}
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
                  ? '2px solid rgba(255,255,255,0.2)'
                  : '1px solid transparent',
                background: selected
                  ? 'rgba(194, 0, 0, 0.2)'
                  : 'transparent',
                color: selected
                  ? '#fff'
                  : todayDay
                  ? '#C20000'
                  : 'rgba(255,255,255,0.7)',
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
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selected) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <span>{day}</span>
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
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Clear date filter
        </button>
      )}
    </div>
  );
}
