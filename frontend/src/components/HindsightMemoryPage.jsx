import React, { useState } from 'react';
import { Brain, Search, Sparkles, ExternalLink, MessageSquare, ArrowRight, Database, History, BookOpen } from 'lucide-react';
import { searchHindsightMemory } from '../services/api';

export default function HindsightMemoryPage({ onSelectMeeting }) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    "What did we decide about authentication?",
    "Which meetings discussed Supabase RLS?",
    "What tasks are assigned to Priya Verma?",
    "What decisions are still pending final approval?"
  ];

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setSearching(true);
    try {
      const res = await searchHindsightMemory(q);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-indigo" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              🧠 25% CORE INFRASTRUCTURE
            </span>
            <span className="badge badge-emerald">Hindsight Memory Engine v2.0</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            🧠 AI Meeting Memory Workspace
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Ask natural language questions across your organization's entire meeting history.
          </p>
        </div>
      </div>

      {/* Main Search Interface */}
      <div className="card-glass" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px'
          }}>
            <Search size={22} color="var(--accent-primary)" />
            <input
              type="text"
              placeholder="Ask anything about past meetings, decisions, topics, or action items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                width: '100%',
                fontSize: '1rem'
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleSearch()} disabled={searching} style={{ padding: '12px 24px', fontSize: '1rem' }}>
            {searching ? 'Querying Hindsight...' : 'Ask Memory'}
          </button>
        </div>

        {/* Suggested Quick Question Chips */}
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
            SUGGESTED MEMORY QUESTIONS:
          </span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => { setQuery(sq); handleSearch(sq); }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'var(--transition)'
                }}
              >
                💡 {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer & Source Citation Display */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grounded Answer Card */}
          <div className="card-glass" style={{ padding: '28px', borderLeft: '5px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)' }}>
                <Brain size={22} /> Hindsight Grounded Answer
              </h3>
              <span className="badge badge-emerald">Confidence: {Math.round(result.hindsight_confidence_score * 100)}%</span>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {result.answer}
            </p>
          </div>

          {/* Clickable Source Meetings */}
          <div className="card-glass" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--accent-purple)" /> Source Meetings & Context Citations
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {result.sources?.map((src) => (
                <div 
                  key={src.id}
                  onClick={() => onSelectMeeting(src.id)}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  className="card-glass"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{src.title}</h4>
                    <span className="badge badge-indigo">{src.platform}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Date: {src.date} | Match Reason: {src.match_reason}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    <span>Open Meeting Workspace</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
