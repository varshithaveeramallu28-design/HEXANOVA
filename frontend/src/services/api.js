const BASE_URL = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API connection fallback:", err);
    return { status: "offline" };
  }
}

export async function fetchMeetings() {
  const res = await fetch(`${BASE_URL}/meetings`);
  if (!res.ok) throw new Error("Failed to fetch meetings");
  return await res.json();
}

export async function fetchMeetingById(id) {
  const res = await fetch(`${BASE_URL}/meetings/${id}`);
  if (!res.ok) throw new Error("Meeting not found");
  return await res.json();
}

export async function createMeeting(data) {
  const res = await fetch(`${BASE_URL}/meetings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create meeting");
  return await res.json();
}

export async function updateMeeting(id, data) {
  const res = await fetch(`${BASE_URL}/meetings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update meeting");
  return await res.json();
}

export async function deleteMeeting(id) {
  const res = await fetch(`${BASE_URL}/meetings/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error("Failed to delete meeting");
  return await res.json();
}

export async function analyzeMeeting(meetingId) {
  const res = await fetch(`${BASE_URL}/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ meeting_id: meetingId })
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.detail || "AI analysis failed");
  }
  return await res.json();
}

export async function generateAgenda(data) {
  const res = await fetch(`${BASE_URL}/ai/agenda`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to generate agenda");
  return await res.json();
}

export async function generateFollowUp(meetingId) {
  const res = await fetch(`${BASE_URL}/ai/follow-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ meeting_id: meetingId })
  });
  if (!res.ok) throw new Error("Failed to generate follow-up email");
  return await res.json();
}

export async function searchHindsightMemory(query) {
  const res = await fetch(`${BASE_URL}/memory/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  if (!res.ok) throw new Error("Memory search failed");
  return await res.json();
}

export async function fetchTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
}

export async function updateTaskStatus(taskId, status) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Failed to update task status");
  return await res.json();
}

export async function fetchDecisions() {
  const res = await fetch(`${BASE_URL}/decisions`);
  if (!res.ok) throw new Error("Failed to fetch decisions");
  return await res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return await res.json();
}

export async function fetchNotifications() {
  const res = await fetch(`${BASE_URL}/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return await res.json();
}

export async function markNotificationRead(id) {
  const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'PUT' });
  if (!res.ok) throw new Error("Failed to mark notification read");
  return await res.json();
}

export async function markAllNotificationsRead() {
  const res = await fetch(`${BASE_URL}/notifications/read-all`, { method: 'POST' });
  if (!res.ok) throw new Error("Failed to mark all notifications read");
  return await res.json();
}
