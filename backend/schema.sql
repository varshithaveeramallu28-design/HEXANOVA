-- AI Meeting Intelligence — Supabase PostgreSQL Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'Employee' CHECK (role IN ('Employee', 'Manager', 'Admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Meetings
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    platform TEXT DEFAULT 'Google Meet' CHECK (platform IN ('Google Meet', 'Zoom', 'YouTube', 'In Person', 'Other')),
    meeting_url TEXT,
    google_meet_url TEXT,
    zoom_url TEXT,
    youtube_url TEXT,
    status TEXT DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'Processing')),
    transcript TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Meeting Participants
CREATE TABLE IF NOT EXISTS public.meeting_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'Attendee',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Summaries & Insights (NVIDIA NIM Output)
CREATE TABLE IF NOT EXISTS public.summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID UNIQUE REFERENCES public.meetings(id) ON DELETE CASCADE,
    summary_text TEXT NOT NULL,
    key_topics JSONB DEFAULT '[]'::jsonb,
    participants_mentioned JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Decisions Ledger
CREATE TABLE IF NOT EXISTS public.decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    decision_text TEXT NOT NULL,
    topic TEXT,
    owner TEXT,
    status TEXT DEFAULT 'Final' CHECK (status IN ('Draft', 'Final', 'Superseded')),
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Action Items / Tasks
CREATE TABLE IF NOT EXISTS public.action_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    assignee TEXT DEFAULT 'Unassigned',
    due_date DATE,
    priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    status TEXT DEFAULT 'Todo' CHECK (status IN ('Todo', 'In Progress', 'Done')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Hindsight Memories
CREATE TABLE IF NOT EXISTS public.hindsight_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    memory_type TEXT DEFAULT 'summary' CHECK (memory_type IN ('summary', 'decision', 'action_item', 'topic')),
    content TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'reminder' CHECK (type IN ('reminder', 'summary', 'task', 'decision', 'system')),
    is_read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notification Preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT true,
    meeting_reminders BOOLEAN DEFAULT true,
    task_due_reminders BOOLEAN DEFAULT true,
    ai_summary_notifications BOOLEAN DEFAULT true,
    decision_alerts BOOLEAN DEFAULT true,
    in_app_notifications BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_meetings_user_id ON public.meetings(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON public.meetings(date);
CREATE INDEX IF NOT EXISTS idx_decisions_user_id ON public.decisions(user_id);
CREATE INDEX IF NOT EXISTS idx_decisions_meeting_id ON public.decisions(meeting_id);
CREATE INDEX IF NOT EXISTS idx_action_items_user_id ON public.action_items(user_id);
CREATE INDEX IF NOT EXISTS idx_action_items_meeting_id ON public.action_items(meeting_id);
CREATE INDEX IF NOT EXISTS idx_hindsight_user_id ON public.hindsight_memories(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id, is_read);

-- Row Level Security (RLS) Policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hindsight_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Sample RLS Policy for Meetings
CREATE POLICY "Users can manage their own meetings" 
ON public.meetings 
FOR ALL 
USING (auth.uid() = user_id);
