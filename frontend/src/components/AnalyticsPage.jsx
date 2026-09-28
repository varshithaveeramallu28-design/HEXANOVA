import React from 'react';
import { BarChart3, Video, CheckSquare, FileText, Clock, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export default function AnalyticsPage({ analytics }) {
  const chartData = [
    { day: 'Mon', meetings: 2, decisions: 1, tasks: 3 },
    { day: 'Tue', meetings: 4, decisions: 3, tasks: 5 },
    { day: 'Wed', meetings: 3, decisions: 2, tasks: 4 },
    { day: 'Thu', meetings: 5, decisions: 4, tasks: 6 },
    { day: 'Fri', meetings: 2, decisions: 1, tasks: 2 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Meeting & Productivity Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time metrics on meeting volume, decision rate, and task completion velocity.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Total Meetings', val: '12', sub: 'Across 4 teams', icon: Video, color: 'var(--accent-primary)' },
          { label: 'Estimated Meeting Hours', val: '14.5 hrs', sub: 'Sub-second processing', icon: Clock, color: 'var(--accent-purple)' },
          { label: 'Decision Rate', val: '1.8 / meeting', sub: '100% indexed', icon: FileText, color: 'var(--accent-emerald)' },
          { label: 'Task Completion Rate', val: '78%', sub: '+12% this sprint', icon: TrendingUp, color: 'var(--accent-amber)' }
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="card-glass" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{k.label}</span>
                <Icon size={20} color={k.color} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>{k.val}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Decision Velocity vs. Tasks</h3>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="decisions" fill="var(--accent-emerald)" radius={[4, 4, 0, 0]} name="Decisions" />
                <Bar dataKey="tasks" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} name="Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Weekly Meeting Duration (Hours)</h3>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="meetings" stroke="var(--accent-purple)" fill="var(--accent-light)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
