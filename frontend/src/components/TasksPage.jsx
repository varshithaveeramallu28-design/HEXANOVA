import React, { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, User, ExternalLink, Filter, Plus } from 'lucide-react';
import { updateTaskStatus } from '../services/api';

export default function TasksPage({ tasks, onUpdateTask, onSelectMeeting }) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [viewMode, setViewMode] = useState('kanban'); // kanban or list

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      onUpdateTask(taskId, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filterPriority !== 'ALL' && t.priority !== filterPriority) return false;
    return true;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'Todo');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'In Progress');
  const doneTasks = filteredTasks.filter(t => t.status === 'Done');

  const renderTaskCard = (task) => (
    <div 
      key={task.id}
      className="card-glass" 
      style={{ padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{task.title}</h4>
        <span className={`badge ${
          task.priority === 'High' ? 'badge-rose' : task.priority === 'Medium' ? 'badge-amber' : 'badge-indigo'
        }`}>
          {task.priority}
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{task.description}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <User size={14} /> {task.assignee || 'Unassigned'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} /> {task.due_date || 'No Date'}
        </div>
      </div>

      {task.is_overdue && (
        <span className="badge badge-rose" style={{ alignSelf: 'flex-start' }}>
          <AlertTriangle size={12} /> OVERDUE
        </span>
      )}

      {/* Source Meeting Clickable Link */}
      {task.source_meeting_title && (
        <div 
          onClick={() => onSelectMeeting(task.source_meeting_id)}
          style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          Source: {task.source_meeting_title} <ExternalLink size={12} />
        </div>
      )}

      {/* Quick Status Selector */}
      <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
        {['Todo', 'In Progress', 'Done'].map(st => (
          <button
            key={st}
            onClick={() => handleStatusChange(task.id, st)}
            style={{
              flex: 1,
              padding: '4px 0',
              fontSize: '0.7rem',
              borderRadius: '4px',
              fontWeight: task.status === st ? 700 : 500,
              background: task.status === st ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
              color: task.status === st ? '#fff' : 'var(--text-muted)'
            }}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Action Items & Task Tracker
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Tasks automatically extracted from meeting transcripts with ownership and deadlines.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Priority Filter */}
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem'
            }}
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <button 
            className="btn btn-secondary" 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
          >
            {viewMode === 'kanban' ? 'List View' : 'Kanban Board'}
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* TODO Column */}
          <div className="card-glass" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>TODO ({todoTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {todoTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="card-glass" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '2px', borderBottom: '2px solid var(--accent-amber)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>IN PROGRESS ({inProgressTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {inProgressTasks.map(renderTaskCard)}
            </div>
          </div>

          {/* DONE Column */}
          <div className="card-glass" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '2px', borderBottom: '2px solid var(--accent-emerald)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>DONE ({doneTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {doneTasks.map(renderTaskCard)}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredTasks.map(t => (
              <div key={t.id} style={{ padding: '16px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assignee: {t.assignee} | Due: {t.due_date}</span>
                </div>
                <span className={`badge ${t.status === 'Done' ? 'badge-emerald' : 'badge-amber'}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
