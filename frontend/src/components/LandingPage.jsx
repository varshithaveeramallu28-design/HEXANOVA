import React from 'react';
import { Sparkles, Brain, CheckCircle, Zap, Shield, ArrowRight, Video, Search, Mail, Play } from 'lucide-react';

export default function LandingPage({ onGetStarted, onExploreDemo }) {
  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Landing Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-purple) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            <Brain size={24} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            AI Meeting <span style={{ color: 'var(--accent-primary)' }}>Intelligence</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-secondary" onClick={onExploreDemo}>
            <Play size={16} /> Explore Demo
          </button>
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px 60px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          background: 'var(--accent-light)',
          color: 'var(--accent-primary)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '24px'
        }}>
          <Sparkles size={16} /> Powered by NVIDIA NIM & Hindsight Memory
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Turn Every Meeting Into<br />Actionable Intelligence
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 36px',
          lineHeight: 1.6
        }}>
          Transform meeting conversations into summaries, decisions, action items, and searchable organizational memory. Never forget a decision again.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }} onClick={onGetStarted}>
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }} onClick={onExploreDemo}>
            Watch Live Preview
          </button>
        </div>
      </section>

      {/* Interactive Hero Preview Mockup */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div className="card-glass" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '12px' }}>AI Meeting Workspace — Live Preview</span>
            </div>
            <span className="badge badge-indigo">NVIDIA NIM Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-primary)' }}>
                <Sparkles size={18} /> AI Summary & Highlights
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Team agreed on implementing OAuth 2.0 with Supabase Auth, reducing auth latency by 40%. RLS policies will be enforced prior to staging release.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-emerald)' }}>
                <CheckCircle size={18} /> Extracted Decisions & Tasks
              </h4>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-emerald)' }}>✓</span> Decision: Standardize on OAuth 2.0 Auth flow.
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-amber)' }}>⌛</span> Task: Complete Supabase RLS Migration (Priya V.)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>How AI Meeting Intelligence Works</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '56px' }}>Four effortless steps to organizational memory and task clarity.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {[
              { num: '01', title: 'Capture Meeting', desc: 'Add video links (Google Meet, Zoom, YouTube) or paste/upload transcripts.' },
              { num: '02', title: 'Analyze with AI', desc: 'NVIDIA NIM processes transcripts to extract summaries, topics, decisions, and tasks.' },
              { num: '03', title: 'Hindsight Memory', desc: 'Conversations are stored in cross-meeting memory for instant natural-language Q&A.' },
              { num: '04', title: 'Automate & Follow-Up', desc: 'Generate follow-up emails, track Kanban task statuses, and send reminders.' }
            ].map((step, idx) => (
              <div key={idx} className="card-glass" style={{ padding: '32px 24px', textAlign: 'left', position: 'relative' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.2, position: 'absolute', top: '16px', right: '20px' }}>
                  {step.num}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2026 AI Meeting Intelligence Platform. Built with NVIDIA NIM & Supabase.</p>
      </footer>
    </div>
  );
}
