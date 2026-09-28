import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, ExternalLink } from 'lucide-react';

export default function CalendarPage({ meetings, onSelectMeeting }) {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Meeting Calendar
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Schedule and view all upcoming and completed team meetings.
          </p>
        </div>
      </div>

      <div className="card-glass" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>September 2026</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}><ChevronLeft size={16} /></button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px' }}><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Month Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-muted)', paddingBottom: '8px' }}>
              {d}
            </div>
          ))}

          {daysInMonth.map(day => {
            const dayStr = `2026-09-${day < 10 ? '0' + day : day}`;
            const dayMeetings = meetings.filter(m => m.date === dayStr);

            return (
              <div 
                key={day}
                style={{
                  minHeight: '100px',
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface-elevated)',
                  border: day === 28 ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: day === 28 ? 800 : 500, color: day === 28 ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                  {day}
                </span>

                {dayMeetings.map(m => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMeeting(m.id)}
                    style={{
                      padding: '4px 6px',
                      borderRadius: '4px',
                      background: 'var(--accent-light)',
                      color: 'var(--accent-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={m.title}
                  >
                    📅 {m.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
