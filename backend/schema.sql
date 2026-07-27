-- ============================================================
-- Brand Hunters — Instagram Post Handling Platform Schema
-- Run this once against your Supabase PostgreSQL database
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

----------------------------------------------------------
-- CLIENTS
----------------------------------------------------------

CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_name TEXT NOT NULL,
    contact_person TEXT,

    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

----------------------------------------------------------
-- POSTS
----------------------------------------------------------

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

    title TEXT,

    description TEXT,

    scheduled_date DATE NOT NULL,

    scheduled_time TIME,

    status TEXT NOT NULL DEFAULT 'Pending'
        CHECK (status IN ('Pending','Approved','Declined')),

    admin_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

----------------------------------------------------------
-- ATTACHMENTS
----------------------------------------------------------

CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

    file_name TEXT,

    file_url TEXT NOT NULL,

    file_type TEXT NOT NULL
        CHECK (file_type IN ('image','video')),

    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

----------------------------------------------------------
-- CLIENT SUGGESTIONS
----------------------------------------------------------

CREATE TABLE IF NOT EXISTS suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

    message TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

----------------------------------------------------------
-- STATUS HISTORY
----------------------------------------------------------

CREATE TABLE IF NOT EXISTS post_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,

    old_status TEXT,

    new_status TEXT,

    changed_by TEXT,

    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

----------------------------------------------------------
-- INDEXES
----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_posts_client
ON posts(client_id);

CREATE INDEX IF NOT EXISTS idx_posts_status
ON posts(status);

CREATE INDEX IF NOT EXISTS idx_posts_date
ON posts(scheduled_date);

CREATE INDEX IF NOT EXISTS idx_attachment_post
ON attachments(post_id);

CREATE INDEX IF NOT EXISTS idx_suggestion_post
ON suggestions(post_id);

CREATE INDEX IF NOT EXISTS idx_suggestion_client
ON suggestions(client_id);

----------------------------------------------------------
-- AUTO UPDATE updated_at
----------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_posts_updated_at ON posts;

CREATE TRIGGER trigger_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

----------------------------------------------------------
-- VIEW FOR ADMIN DASHBOARD
----------------------------------------------------------

CREATE OR REPLACE VIEW admin_dashboard AS
SELECT

    (SELECT COUNT(*) FROM clients) AS total_clients,

    (SELECT COUNT(*) FROM posts) AS total_posts,

    (SELECT COUNT(*) FROM posts WHERE status='Pending') AS pending_posts,

    (SELECT COUNT(*) FROM posts WHERE status='Approved') AS approved_posts,

    (SELECT COUNT(*) FROM posts WHERE status='Declined') AS declined_posts,

    (SELECT COUNT(*) FROM posts WHERE scheduled_date = CURRENT_DATE) AS todays_posts,

    (SELECT COUNT(*) FROM posts WHERE scheduled_date > CURRENT_DATE) AS upcoming_posts;

----------------------------------------------------------
-- VIEW FOR CLIENT DASHBOARD
----------------------------------------------------------

CREATE OR REPLACE VIEW client_post_overview AS
SELECT

    c.id AS client_id,
    c.company_name,

    p.id AS post_id,
    p.title,
    p.description,
    p.scheduled_date,
    p.scheduled_time,
    p.status,

    (
        SELECT COUNT(*)
        FROM attachments a
        WHERE a.post_id = p.id
    ) AS attachment_count,

    (
        SELECT COUNT(*)
        FROM suggestions s
        WHERE s.post_id = p.id
    ) AS suggestion_count

FROM clients c
JOIN posts p
ON c.id = p.client_id;
