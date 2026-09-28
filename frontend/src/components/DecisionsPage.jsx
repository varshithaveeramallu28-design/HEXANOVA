import React, { useState } from 'react';
import { FileText, Search, ExternalLink, Filter, ShieldCheck } from 'lucide-react';

export default function DecisionsPage({ decisions, onSelectMeeting }) {
  const [selectedTopic, setSelectedTopic] = useState('ALL');

  const topics = ['ALL', ...Array.from(new Set(decisions.map(d => d.topic).filter(Boolean)))];

  const filteredDecisions = decisions.filter(d => {
    if (selectedTopic !== 'ALL' && d.topic !== selectedTopic) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Organizational Decisions Ledger
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Single source of truth for key architecture and business decisions extracted across meetings.
          </p>
        </div>
      </div>

      {/* Topic Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: selectedTopic === t ? 700 : 500,
              background: selectedTopic === t ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
              color: selectedTopic === t ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              transition: 'var(--transition)'
            }}
          >
            {t === 'ALL' ? 'All Topics' : `# ${t}`}
          </button>
        ))}
      </div>

      {/* Decisions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredDecisions.map(d => (
          <div key={d.id} className="card-glass" style={{ padding: '24px', borderLeft: '4px solid var(--accent-emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                  <ShieldCheck size={12} /> {d.status || 'Final Decision'}
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '4px' }}>{d.decision_text}</h3>
              </div>
              <span className="badge badge-indigo">Topic: {d.topic || 'General'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div>Owner: <strong style={{ color: 'var(--text-primary)' }}>{d.owner || 'Team Lead'}</strong> | Date: {d.date}</div>
              
              <button 
                className="btn btn-outline" 
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                onClick={() => onSelectMeeting(d.source_meeting_id)}
              >
                Source: {d.source_meeting_title} <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
