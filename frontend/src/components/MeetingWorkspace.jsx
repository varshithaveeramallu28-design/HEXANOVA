import React, { useState } from 'react';
import { 
  Video, Calendar, Clock, Users, Sparkles, CheckCircle, FileText, 
  ExternalLink, Play, Mail, FileCheck, ArrowLeft, Upload, Edit, RefreshCw
} from 'lucide-react';
import { analyzeMeeting } from '../services/api';

export default function MeetingWorkspace({ 
  meeting, 
  onBack, 
  onOpenAgendaModal, 
  onOpenFollowUpModal,
  onOpenTranscriptUploadModal,
  onUpdateMeeting 
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!meeting) return null;

  const handleRunAiAnalysis = async () => {
    setAnalyzing(true);
    setErrorMsg('');
    try {
      const result = await analyzeMeeting(meeting.id);
      onUpdateMeeting({
        ...meeting,
        summary: result.summary,
        decisions: result.decisions,
        action_items: result.action_items,
        status: 'Completed'
      });
    } catch (err) {
      setErrorMsg(err.message || "AI Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back Button & Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Meetings
        </button>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => onOpenAgendaModal(meeting)}>
            <Calendar size={16} /> Pre-Meeting Agenda
          </button>
          <button className="btn btn-secondary" onClick={() => onOpenFollowUpModal(meeting)}>
            <Mail size={16} /> Generate Follow-Up Email
          </button>
          <button className="btn btn-primary" onClick={handleRunAiAnalysis} disabled={analyzing}>
            {analyzing ? <RefreshCw size={16} className="spin" /> : <Sparkles size={16} />}
            {analyzing ? 'Analyzing with NVIDIA NIM...' : 'Generate AI Insights'}
          </button>
        </div>
      </div>

      {/* Meeting Title Banner Card */}
      <div className="card-glass" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge badge-indigo">{meeting.platform}</span>
              <span className={`badge ${meeting.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                {meeting.status}
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{meeting.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{meeting.description}</p>
          </div>

          {/* External Platform Links (Google Meet / Zoom / YouTube) */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {meeting.google_meet_url && (
              <a href={meeting.google_meet_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                Join Google Meet <ExternalLink size={14} />
              </a>
            )}
            {meeting.zoom_url && (
              <a href={meeting.zoom_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem', background: '#2D8CFF' }}>
                Join Zoom <ExternalLink size={14} />
              </a>
            )}
            {meeting.youtube_url && (
              <a href={meeting.youtube_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem', background: '#FF0000' }}>
                Watch YouTube <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} /> {meeting.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> {meeting.start_time} - {meeting.end_time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} /> {meeting.participants?.length || 0} Participants
          </div>
        </div>
      </div>

      {errorMsg && (
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '24px' }}>
        {[
          { id: 'summary', label: 'AI Summary & Insights', icon: Sparkles },
          { id: 'decisions', label: `Decisions (${meeting.decisions?.length || 0})`, icon: FileText },
          { id: 'tasks', label: `Action Items (${meeting.action_items?.length || 0})`, icon: CheckCircle },
          { id: 'transcript', label: 'Transcript', icon: FileCheck },
          { id: 'participants', label: 'Participants', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 4px',
                borderBottom: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem'
              }}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'summary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {meeting.summary ? (
            <div className="card-glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)' }}>
                <Sparkles size={20} /> Executive Summary
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '24px' }}>
                {meeting.summary.summary_text}
              </p>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Key Discussion Topics</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {meeting.summary.key_topics?.map((topic, i) => (
                  <span key={i} className="badge badge-indigo" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                    # {topic}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="card-glass" style={{ padding: '40px', textAlign: 'center' }}>
              <Sparkles size={40} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No AI Insights Generated Yet</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Click 'Generate AI Insights' to process transcript with NVIDIA NIM LLM services.
              </p>
              <button className="btn btn-primary" onClick={handleRunAiAnalysis}>
                Run AI Analysis
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'decisions' && (
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Extracted Decisions</h3>
          {meeting.decisions && meeting.decisions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {meeting.decisions.map((d, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', borderLeft: '4px solid var(--accent-emerald)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{d.decision_text}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Owner: {d.owner || 'Team'} | Topic: {d.topic || 'General'}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No decisions recorded for this meeting.</p>
          )}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Extracted Action Items</h3>
          {meeting.action_items && meeting.action_items.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {meeting.action_items.map((t, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assigned to: {t.assignee} | Due: {t.due_date}</div>
                  </div>
                  <span className={`badge ${t.status === 'Done' ? 'badge-emerald' : 'badge-amber'}`}>{t.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No action items extracted yet.</p>
          )}
        </div>
      )}

      {activeTab === 'transcript' && (
        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Meeting Transcript</h3>
            <button className="btn btn-secondary" onClick={() => onOpenTranscriptUploadModal(meeting)}>
              <Upload size={16} /> Upload / Paste Transcript
            </button>
          </div>
          <pre style={{
            background: 'var(--bg-surface-elevated)',
            padding: '20px',
            borderRadius: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap',
            color: 'var(--text-secondary)',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {meeting.transcript || "No transcript added yet. Click 'Upload / Paste Transcript' to add content."}
          </pre>
        </div>
      )}

      {activeTab === 'participants' && (
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Meeting Participants</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {meeting.participants?.map((p, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {p.charAt(0)}
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
