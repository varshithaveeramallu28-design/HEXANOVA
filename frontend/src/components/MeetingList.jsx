import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Plus, ExternalLink, Search, Sparkles } from 'lucide-react';

export default function MeetingList({ meetings, onOpenMeeting, onCreateMeeting }) {
  const [filterPlatform, setFilterPlatform] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = meetings.filter(m => {
    if (filterPlatform !== 'ALL' && m.platform !== filterPlatform) return false;
    if (searchQuery.trim() && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Meeting Workspaces
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Browse and manage all captured meetings and AI transcripts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onCreateMeeting}>
          + Create Meeting
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1,
          minWidth: '280px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 14px'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search meeting titles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', width: '100%', fontSize: '0.875rem' }}
          />
        </div>

        <select
          value={filterPlatform}
          onChange={e => setFilterPlatform(e.target.value)}
          style={{
            background: 'var(--bg-surface-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem'
          }}
        >
          <option value="ALL">All Platforms</option>
          <option value="Google Meet">Google Meet</option>
          <option value="Zoom">Zoom</option>
          <option value="YouTube">YouTube</option>
        </select>
      </div>

      {/* Grid of Meeting Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map(m => (
          <div key={m.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-indigo">{m.platform}</span>
                <span className={`badge ${m.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                  {m.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>{m.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.description || "No description provided."}
              </p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {m.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} /> {m.participants?.length || 0} People
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => onOpenMeeting(m)}>
              Open Workspace <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
