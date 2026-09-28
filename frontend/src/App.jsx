import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MeetingList from './components/MeetingList';
import MeetingWorkspace from './components/MeetingWorkspace';
import TasksPage from './components/TasksPage';
import DecisionsPage from './components/DecisionsPage';
import HindsightMemoryPage from './components/HindsightMemoryPage';
import CalendarPage from './components/CalendarPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import NotificationsPanel from './components/NotificationsPanel';

import MeetingModal from './components/MeetingModal';
import AgendaModal from './components/AgendaModal';
import FollowUpModal from './components/FollowUpModal';
import TranscriptUploadModal from './components/TranscriptUploadModal';

import { 
  fetchMeetings, 
  fetchTasks, 
  fetchDecisions, 
  fetchNotifications, 
  markNotificationRead, 
  markAllNotificationsRead 
} from './services/api';

export default function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data states
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  // Search state
  const [searchResults, setSearchResults] = useState(null);

  // User state
  const [user, setUser] = useState({
    id: "demo-user-123",
    full_name: "Varsha Sharma",
    email: "varsha@example.com",
    role: "Manager",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
  });

  // Modals
  const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [agendaMeetingTarget, setAgendaMeetingTarget] = useState(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpMeetingTarget, setFollowUpMeetingTarget] = useState(null);
  const [showTranscriptUploadModal, setShowTranscriptUploadModal] = useState(false);
  const [transcriptMeetingTarget, setTranscriptMeetingTarget] = useState(null);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  // Sync dark mode class with DOM body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Load initial backend data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const mData = await fetchMeetings();
      setMeetings(mData);
      
      const tData = await fetchTasks();
      setTasks(tData);

      const dData = await fetchDecisions();
      setDecisions(dData);

      const nData = await fetchNotifications();
      setNotifications(nData.notifications || []);
      setUnreadNotifCount(nData.unread_count || 0);
    } catch (err) {
      console.warn("API load fallback:", err);
    }
  };

  const handleGlobalSearch = (query) => {
    const qLower = query.toLowerCase();
    const matchedM = meetings.filter(m => m.title.toLowerCase().includes(qLower));
    const matchedD = decisions.filter(d => d.decision_text.toLowerCase().includes(qLower));
    setSearchResults({
      meetings: matchedM,
      decisions: matchedD
    });
  };

  const handleSelectSearchResult = (type, id) => {
    if (type === 'meetings') {
      const target = meetings.find(m => m.id === id);
      if (target) {
        setSelectedMeeting(target);
        setActiveTab('workspace');
      }
    } else if (type === 'decisions') {
      setActiveTab('decisions');
    }
  };

  const handleOpenMeetingWorkspace = (meeting) => {
    setSelectedMeeting(meeting);
    setActiveTab('workspace');
  };

  const handleMeetingCreated = (newMeeting) => {
    setMeetings([newMeeting, ...meetings]);
    setSelectedMeeting(newMeeting);
    setActiveTab('workspace');
  };

  const handleUpdateMeeting = (updatedMeeting) => {
    setMeetings(meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
    setSelectedMeeting(updatedMeeting);
    // Reload tasks & decisions
    fetchTasks().then(setTasks).catch(() => {});
    fetchDecisions().then(setDecisions).catch(() => {});
  };

  const handleUpdateTask = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleMarkNotificationRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadNotifCount(Math.max(0, unreadNotifCount - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadNotifCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  if (showLanding) {
    return (
      <LandingPage
        onGetStarted={() => setShowLanding(false)}
        onExploreDemo={() => setShowLanding(false)}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'workspace') setSelectedMeeting(null);
        }}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Right Content Section */}
      <div className="main-wrapper">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          unreadCount={unreadNotifCount}
          onOpenNotifications={() => setShowNotificationsDrawer(true)}
          user={user}
          onSearch={handleGlobalSearch}
          searchResults={searchResults}
          onSelectSearchResult={handleSelectSearchResult}
        />

        <main className="main-content">
          {activeTab === 'dashboard' && (
            <Dashboard
              meetings={meetings}
              tasks={tasks}
              decisions={decisions}
              onOpenMeeting={handleOpenMeetingWorkspace}
              onCreateMeeting={() => setShowCreateMeetingModal(true)}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'meetings' && (
            <MeetingList
              meetings={meetings}
              onOpenMeeting={handleOpenMeetingWorkspace}
              onCreateMeeting={() => setShowCreateMeetingModal(true)}
            />
          )}

          {activeTab === 'workspace' && selectedMeeting && (
            <MeetingWorkspace
              meeting={selectedMeeting}
              onBack={() => setActiveTab('meetings')}
              onOpenAgendaModal={(m) => { setAgendaMeetingTarget(m); setShowAgendaModal(true); }}
              onOpenFollowUpModal={(m) => { setFollowUpMeetingTarget(m); setShowFollowUpModal(true); }}
              onOpenTranscriptUploadModal={(m) => { setTranscriptMeetingTarget(m); setShowTranscriptUploadModal(true); }}
              onUpdateMeeting={handleUpdateMeeting}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarPage
              meetings={meetings}
              onSelectMeeting={(mId) => {
                const target = meetings.find(m => m.id === mId);
                if (target) handleOpenMeetingWorkspace(target);
              }}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksPage
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onSelectMeeting={(mId) => {
                const target = meetings.find(m => m.id === mId);
                if (target) handleOpenMeetingWorkspace(target);
              }}
            />
          )}

          {activeTab === 'decisions' && (
            <DecisionsPage
              decisions={decisions}
              onSelectMeeting={(mId) => {
                const target = meetings.find(m => m.id === mId);
                if (target) handleOpenMeetingWorkspace(target);
              }}
            />
          )}

          {activeTab === 'memory' && (
            <HindsightMemoryPage
              onSelectMeeting={(mId) => {
                const target = meetings.find(m => m.id === mId);
                if (target) handleOpenMeetingWorkspace(target);
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              user={user}
              onUpdateUser={setUser}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {showCreateMeetingModal && (
        <MeetingModal
          onClose={() => setShowCreateMeetingModal(false)}
          onMeetingCreated={handleMeetingCreated}
        />
      )}

      {showAgendaModal && agendaMeetingTarget && (
        <AgendaModal
          meeting={agendaMeetingTarget}
          onClose={() => setShowAgendaModal(false)}
        />
      )}

      {showFollowUpModal && followUpMeetingTarget && (
        <FollowUpModal
          meeting={followUpMeetingTarget}
          onClose={() => setShowFollowUpModal(false)}
        />
      )}

      {showTranscriptUploadModal && transcriptMeetingTarget && (
        <TranscriptUploadModal
          meeting={transcriptMeetingTarget}
          onClose={() => setShowTranscriptUploadModal(false)}
          onUpdateMeeting={handleUpdateMeeting}
        />
      )}

      {showNotificationsDrawer && (
        <NotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotificationsDrawer(false)}
          onMarkRead={handleMarkNotificationRead}
          onMarkAllRead={handleMarkAllNotificationsRead}
        />
      )}
    </div>
  );
}
