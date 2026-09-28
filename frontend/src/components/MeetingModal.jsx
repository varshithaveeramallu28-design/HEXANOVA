import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Link, Users, FileText } from 'lucide-react';
import { createMeeting } from '../services/api';

export default function MeetingModal({ onClose, onMeetingCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-09-28');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [platform, setPlatform] = useState('Google Meet');
  const [googleMeetUrl, setGoogleMeetUrl] = useState('');
  const [zoomUrl, setZoomUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [participantsText, setParticipantsText] = useState('');
  const [transcript, setTranscript] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      const participants = participantsText.split(',').map(p => p.strip ? p.strip() : p.trim()).filter(Boolean);
      const newM = await createMeeting({
        title,
        description,
        date,
        start_time: startTime + ':00',
        end_time: endTime + ':00',
        platform,
        google_meet_url: googleMeetUrl,
        zoom_url: zoomUrl,
        youtube_url: youtubeUrl,
        participants: participants.length ? participants : ['Varsha Sharma'],
        transcript
      });
      onMeetingCreated(newM);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '640px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Create New Meeting Workspace</h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Meeting Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Q4 Product Architecture Sync"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Description</label>
            <textarea
              rows={2}
              placeholder="Brief overview of meeting goals..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Start Time</label>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>End Time</label>
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }}>
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom</option>
              <option value="YouTube">YouTube</option>
              <option value="In Person">In Person</option>
            </select>
          </div>

          {/* Platform URLs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)' }}>VIDEO PLATFORM LINKS (OPTIONAL)</span>
            {platform === 'Google Meet' && (
              <input type="url" placeholder="Google Meet URL (https://meet.google.com/...)" value={googleMeetUrl} onChange={e => setGoogleMeetUrl(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            )}
            {platform === 'Zoom' && (
              <input type="url" placeholder="Zoom Join URL (https://zoom.us/j/...)" value={zoomUrl} onChange={e => setZoomUrl(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            )}
            {platform === 'YouTube' && (
              <input type="url" placeholder="YouTube Video URL (https://youtube.com/watch?...)" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            )}
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Participants (comma separated)</label>
            <input type="text" placeholder="e.g. Priya Verma, Alex Chen, Rahul Sharma" value={participantsText} onChange={e => setParticipantsText(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Transcript Content (Paste now or upload later)</label>
            <textarea rows={4} placeholder="Paste conversation transcript here..." value={transcript} onChange={e => setTranscript(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Creating...' : 'Create Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
