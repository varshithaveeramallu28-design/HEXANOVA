import React, { useState } from 'react';
import { X, Sparkles, Check, Edit, Calendar } from 'lucide-react';
import { generateAgenda } from '../services/api';

export default function AgendaModal({ meeting, onClose }) {
  const [loading, setLoading] = useState(false);
  const [agenda, setAgenda] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateAgenda({
        title: meeting.title,
        description: meeting.description,
        participants: meeting.participants || []
      });
      setAgenda(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '600px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent-primary)" /> Pre-Meeting AI Agenda Builder
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        {!agenda ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <Calendar size={48} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Generate Agenda for "{meeting?.title}"</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
              NVIDIA NIM will synthesize clear meeting objectives, discussion topics, key questions, and expected outcomes.
            </p>
            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Synthesizing Agenda...' : 'Generate Pre-Meeting Agenda'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px', fontSize: '0.85rem' }}>MEETING OBJECTIVE</h4>
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{agenda.objective}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Discussion Points</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {agenda.discussion_points?.map((dp, i) => <li key={i}>{dp}</li>)}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px' }}>Suggested Questions to Ask</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {agenda.suggested_questions?.map((sq, i) => <li key={i}>{sq}</li>)}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button className="btn btn-secondary" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
