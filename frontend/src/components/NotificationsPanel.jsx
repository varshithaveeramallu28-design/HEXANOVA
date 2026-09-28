import React from 'react';
import { Bell, X, Check, CheckCheck, Clock, Calendar, CheckSquare, Sparkles } from 'lucide-react';

export default function NotificationsPanel({ notifications, onClose, onMarkRead, onMarkAllRead }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 150,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="card-glass" style={{
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        borderRadius: 0,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Notifications</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={onMarkAllRead} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
              <CheckCheck size={14} /> Mark All Read
            </button>
            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications && notifications.length > 0 ? (
            notifications.map(n => (
              <div 
                key={n.id}
                onClick={() => onMarkRead(n.id)}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: n.is_read ? 'var(--bg-surface-elevated)' : 'var(--accent-light)',
                  border: n.is_read ? '1px solid var(--border-color)' : '1px solid var(--accent-primary)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{n.title}</h4>
                  {!n.is_read && <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>NEW</span>}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{n.message}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.created_at}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No unread notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
