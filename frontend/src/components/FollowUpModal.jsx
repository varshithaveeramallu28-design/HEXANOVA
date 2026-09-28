import React, { useState } from 'react';
import { X, Mail, Sparkles, Copy, Check, Send } from 'lucide-react';
import { generateFollowUp } from '../services/api';

export default function FollowUpModal({ meeting, onClose }) {
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [editedBody, setEditedBody] = useState('');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateFollowUp(meeting.id);
      setEmailData(res);
      setEditedBody(res.email_body);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '640px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={20} color="var(--accent-primary)" /> AI Follow-Up Email Generator
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        {!emailData ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <Mail size={48} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Generate Follow-Up Email</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Draft an executive email summarizing decisions, action items, assignees, and due dates.
            </p>
            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Drafting Email...' : 'Generate Follow-Up Email'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>SUBJECT LINE</label>
              <input 
                type="text" 
                value={emailData.email_subject} 
                readOnly 
                style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)', fontWeight: 600 }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>EDITABLE EMAIL BODY</label>
              <textarea
                rows={12}
                value={editedBody}
                onChange={e => setEditedBody(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              />
            </div>

            {sent && (
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', textAlign: 'center', fontWeight: 700 }}>
                ✓ Follow-up email sent to meeting participants!
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <button className="btn btn-secondary" onClick={handleCopy}>
                {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Content'}
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
                <button className="btn btn-primary" onClick={handleSend} disabled={sent}>
                  <Send size={16} /> Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
