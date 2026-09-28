import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Key, Check } from 'lucide-react';

export default function SettingsPage({ user, onUpdateUser }) {
  const [role, setRole] = useState(user?.role || 'Manager');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, role });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Account & System Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Manage your profile, role access permissions, and notification preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="card-glass" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={20} color="var(--accent-primary)" /> User Profile & Role Support
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Full Name</label>
            <input type="text" value={user?.full_name || "Varsha Sharma"} readOnly style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Email Address</label>
            <input type="email" value={user?.email || "varsha@example.com"} readOnly style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)' }} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Role-Based Access Control (RBAC)</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-primary)', fontWeight: 600 }}>
            <option value="Employee">Employee (Own meetings, assigned tasks)</option>
            <option value="Manager">Manager (Team meetings & analytics)</option>
            <option value="Admin">Admin (System-wide configuration)</option>
          </select>
        </div>

        <hr style={{ borderColor: 'var(--border-color)' }} />

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={20} color="var(--accent-purple)" /> Notification Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" checked={emailNotifs} onChange={e => setEmailNotifs(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Enable Email Follow-Ups & Summaries</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" checked={reminders} onChange={e => setReminders(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Upcoming Meeting & Deadline Reminders</span>
          </label>
        </div>

        {saved && (
          <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', textAlign: 'center', fontWeight: 700 }}>
            ✓ Preferences saved successfully!
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
