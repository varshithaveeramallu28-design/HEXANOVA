import React from 'react';
import { Video, CheckSquare, FileText, Brain, Calendar, Clock, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard({ meetings, tasks, decisions, analytics, onOpenMeeting, onCreateMeeting, onNavigateTab }) {
  const upcomingMeetings = meetings.filter(m => m.status === 'Scheduled');
  const recentMeetings = meetings.filter(m => m.status === 'Completed').slice(0, 5);

  const kpis = [
    { label: "Today's Meetings", value: upcomingMeetings.length, icon: Calendar, trend: "+1 today", color: "var(--accent-primary)" },
    { label: "Total Meetings", value: meetings.length, icon: Video, trend: "+3 this week", color: "var(--accent-purple)" },
    { label: "Pending Tasks", value: tasks.filter(t => t.status !== 'Done').length, icon: CheckSquare, trend: "2 high priority", color: "var(--accent-amber)" },
    { label: "Extracted Decisions", value: decisions.length, icon: FileText, trend: "100% indexed", color: "var(--accent-emerald)" }
  ];

  const chartData = [
    { day: 'Mon', meetings: 2 },
    { day: 'Tue', meetings: 4 },
    { day: 'Wed', meetings: 3 },
    { day: 'Thu', meetings: 5 },
    { day: 'Fri', meetings: 2 },
    { day: 'Sat', meetings: 1 }
  ];

  const pieData = [
    { name: 'Done', value: tasks.filter(t => t.status === 'Done').length || 1, color: '#10B981' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length || 1, color: '#F59E0B' },
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length || 2, color: '#6366F1' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Good morning, Varsha 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Here's your organizational meeting intelligence overview.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onCreateMeeting}>
          + New Meeting
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="card-glass" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{kpi.label}</span>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: kpi.color
                }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{kpi.trend}</div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts & Upcoming Meetings */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Meeting Velocity Chart */}
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Meeting Activity & Frequency</h3>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="meetings" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorMeetings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Breakdown */}
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Action Item Breakdown</h3>
          <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent & Upcoming Meetings Table */}
      <div className="card-glass" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent & Upcoming Meetings</h3>
          <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.8rem' }} onClick={() => onNavigateTab('meetings')}>
            View All Meetings
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Meeting Title</th>
                <th style={{ padding: '12px' }}>Date & Time</th>
                <th style={{ padding: '12px' }}>Platform</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'var(--transition)' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 700 }}>{m.title}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>{m.date} ({m.start_time})</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span className="badge badge-indigo">{m.platform}</span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span className={`badge ${m.status === 'Completed' ? 'badge-emerald' : 'badge-amber'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => onOpenMeeting(m)}>
                      Open Workspace <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
