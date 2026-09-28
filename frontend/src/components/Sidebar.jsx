import React from 'react';
import { LayoutDashboard, Video, Calendar, CheckSquare, FileText, Brain, BarChart3, Settings, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'meetings', label: 'Meetings', icon: Video },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tasks', label: 'Tasks & Actions', icon: CheckSquare },
    { id: 'decisions', label: 'Decisions Ledger', icon: FileText },
    { id: 'memory', label: 'AI Meeting Memory', icon: Brain, badge: 'Hindsight' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside style={{
      width: collapsed ? '80px' : '260px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-purple) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0
          }}>
            <Brain size={20} />
          </div>
          {!collapsed && (
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              Meeting <span style={{ color: 'var(--accent-primary)' }}>AI</span>
            </span>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: 'var(--text-muted)',
            padding: '6px',
            borderRadius: '6px',
            display: collapsed ? 'none' : 'flex'
          }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Navigation List */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '12px 0' : '12px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-light)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.9rem',
                transition: 'var(--transition)',
                position: 'relative'
              }}
            >
              <Icon size={20} style={{ flexShrink: 0, color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
              {!collapsed && (
                <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Indicator Footer */}
      {!collapsed && (
        <div style={{ padding: '16px', margin: '16px 12px', background: 'var(--bg-surface-elevated)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>NVIDIA NIM Engine</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latency-optimized AI microservices active.</p>
        </div>
      )}
    </aside>
  );
}
