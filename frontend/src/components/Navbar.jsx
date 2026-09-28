import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, User, ChevronDown, Sparkles, X } from 'lucide-react';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  unreadCount, 
  onOpenNotifications, 
  user, 
  onSearch, 
  searchResults,
  onSelectSearchResult 
}) {
  const [query, setQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      onSearch(val);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <header style={{
      height: '64px',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Search Input Container */}
      <div style={{ position: 'relative', width: '380px' }}>
        <div style={{
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
            placeholder="Search meetings, decisions, tasks, memories..."
            value={query}
            onChange={handleSearchChange}
            onFocus={() => query.trim().length > 1 && setShowSearchResults(true)}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '0.875rem'
            }}
          />
          {query && (
            <button onClick={() => { setQuery(''); setShowSearchResults(false); }} style={{ color: 'var(--text-muted)' }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        {showSearchResults && searchResults && (
          <div className="card-glass" style={{
            position: 'absolute',
            top: '48px',
            left: 0,
            right: 0,
            maxHeight: '360px',
            overflowY: 'auto',
            zIndex: 100,
            padding: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Search Results</span>
              <button onClick={() => setShowSearchResults(false)} style={{ color: 'var(--text-muted)' }}><X size={14} /></button>
            </div>

            {searchResults.meetings && searchResults.meetings.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>MEETINGS</span>
                {searchResults.meetings.map(m => (
                  <div key={m.id} onClick={() => { onSelectSearchResult('meetings', m.id); setShowSearchResults(false); }} style={{ padding: '8px', cursor: 'pointer', borderRadius: '6px', fontSize: '0.85rem' }}>
                    📅 {m.title} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({m.date})</span>
                  </div>
                ))}
              </div>
            )}

            {searchResults.decisions && searchResults.decisions.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>DECISIONS</span>
                {searchResults.decisions.map(d => (
                  <div key={d.id} onClick={() => { onSelectSearchResult('decisions', d.id); setShowSearchResults(false); }} style={{ padding: '8px', cursor: 'pointer', borderRadius: '6px', fontSize: '0.85rem' }}>
                    💡 {d.decision_text}
                  </div>
                ))}
              </div>
            )}

            {(!searchResults.meetings || searchResults.meetings.length === 0) && (!searchResults.decisions || searchResults.decisions.length === 0) && (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No matching results found for "{query}".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={18} color="#FBBF24" /> : <Moon size={18} color="#6366F1" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            position: 'relative'
          }}
          title="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              background: 'var(--accent-rose)',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-color)'
            }}
          >
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128"}
              alt="Avatar"
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left', display: 'none', mdDisplay: 'block' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>{user?.full_name || "Varsha Sharma"}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.role || "Manager"}</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
        </div>
      </div>
    </header>
  );
}
