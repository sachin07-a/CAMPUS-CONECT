-- ==============================================================================
-- CAMPUSCONNECT: Complete Normalized PostgreSQL Database Schema
-- Supports multi-tenant universities, branches, semesters, notes, notices,
-- events, clubs, community Q&A, polls, placements, and audit logs.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. UNIVERSITIES & DEPARTMENTS
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(100) UNIQUE NOT NULL, -- e.g. 'rvce.edu.in'
    logo_url TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. BRANCHES & ACADEMIC STRUCTURE
CREATE TABLE IF NOT EXISTS branches (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'cse', 'aiml', 'ise'
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    code VARCHAR(20) NOT NULL, -- 'CSE'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'Code2',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'cs301'
    code VARCHAR(20) NOT NULL, -- 'CS301'
    name VARCHAR(255) NOT NULL,
    branch_id VARCHAR(50) REFERENCES branches(id) ON DELETE CASCADE,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    units_count INT DEFAULT 5,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id VARCHAR(50) REFERENCES subjects(id) ON DELETE CASCADE,
    unit_number INT NOT NULL CHECK (unit_number BETWEEN 1 AND 5),
    title VARCHAR(255) NOT NULL,
    topics TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. USERS & PROFILES
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'club_admin', 'admin');

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    branch_id VARCHAR(50) REFERENCES branches(id) ON DELETE SET NULL,
    semester INT DEFAULT 1 CHECK (semester BETWEEN 0 AND 8),
    section VARCHAR(10) DEFAULT 'A',
    student_id VARCHAR(50) NOT NULL,
    cgpa NUMERIC(4,2) DEFAULT 0.00,
    phone VARCHAR(30),
    bio TEXT,
    interests TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ENGINEERING NOTES & RESOURCE REPOSITORY
CREATE TYPE note_status AS ENUM ('pending', 'approved', 'rejected', 'needs_review');
CREATE TYPE note_file_type AS ENUM ('pdf', 'pptx', 'docx', 'zip');

CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    branch_id VARCHAR(50) REFERENCES branches(id) ON DELETE CASCADE,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    subject_id VARCHAR(50) REFERENCES subjects(id) ON DELETE CASCADE,
    unit_number INT NOT NULL CHECK (unit_number BETWEEN 1 AND 5),
    topic VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    file_url TEXT NOT NULL,
    file_type note_file_type DEFAULT 'pdf',
    file_size VARCHAR(50),
    uploader_id UUID REFERENCES users(id) ON DELETE CASCADE,
    downloads_count INT DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    status note_status DEFAULT 'pending',
    moderation_note TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    pages_count INT DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS note_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(note_id, user_id)
);

-- 6. ANNOUNCEMENTS & OFFICIAL NOTICE BOARD
CREATE TYPE announcement_category AS ENUM (
    'university', 'department', 'examination', 'placement',
    'scholarship', 'holiday', 'academic', 'emergency', 'general'
);
CREATE TYPE announcement_priority AS ENUM ('urgent', 'high', 'normal');

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category announcement_category DEFAULT 'general',
    priority announcement_priority DEFAULT 'normal',
    target_audience VARCHAR(50) DEFAULT 'all', -- 'all', 'branch', 'semester'
    target_branch VARCHAR(50) REFERENCES branches(id) ON DELETE SET NULL,
    target_semester INT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(100) NOT NULL,
    attachment_name VARCHAR(255),
    attachment_url TEXT,
    attachment_size VARCHAR(50),
    is_pinned BOOLEAN DEFAULT FALSE,
    expiry_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcement_reads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(announcement_id, user_id)
);

-- 7. CLUBS & STUDENT SOCIETIES
CREATE TYPE club_category AS ENUM (
    'technical', 'coding', 'aiml', 'robotics', 'cultural',
    'literary', 'sports', 'entrepreneurship', 'photography', 'music', 'social_service'
);

CREATE TABLE IF NOT EXISTS clubs (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'club_acm', 'club_gdsc'
    name VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category club_category NOT NULL,
    logo_url TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    faculty_coordinator JSONB NOT NULL, -- {name, email, department}
    social_links JSONB DEFAULT '{}', -- {github, linkedin, instagram, website}
    established_year INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS club_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id VARCHAR(50) REFERENCES clubs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'member', 'coordinator', 'lead'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(club_id, user_id)
);

CREATE TABLE IF NOT EXISTS club_followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id VARCHAR(50) REFERENCES clubs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(club_id, user_id)
);

-- 8. EVENTS & HACKATHONS
CREATE TYPE event_category AS ENUM ('workshop', 'hackathon', 'seminar', 'cultural', 'competition', 'orientation');

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    club_id VARCHAR(50) REFERENCES clubs(id) ON DELETE CASCADE,
    category event_category NOT NULL,
    event_date DATE NOT NULL,
    event_time VARCHAR(100) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    poster_url TEXT NOT NULL,
    registration_deadline DATE NOT NULL,
    max_participants INT DEFAULT 100,
    speakers JSONB DEFAULT '[]',
    schedule JSONB DEFAULT '[]',
    faqs JSONB DEFAULT '[]',
    is_online BOOLEAN DEFAULT FALSE,
    fee VARCHAR(50) DEFAULT 'Free',
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ticket_code VARCHAR(50) UNIQUE NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- 9. COMMUNITY DISCUSSIONS & POLLS
CREATE TYPE post_type AS ENUM ('question', 'discussion', 'poll');
CREATE TYPE channel_type AS ENUM ('general', 'branch', 'semester', 'subject');

CREATE TABLE IF NOT EXISTS community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    post_type post_type NOT NULL,
    channel channel_type NOT NULL,
    branch_id VARCHAR(50) REFERENCES branches(id) ON DELETE SET NULL,
    semester INT,
    subject_id VARCHAR(50) REFERENCES subjects(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    upvotes_count INT DEFAULT 0,
    is_solved BOOLEAN DEFAULT FALSE,
    solved_comment_id UUID,
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS community_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    upvotes_count INT DEFAULT 0,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_upvotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

CREATE TABLE IF NOT EXISTS poll_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    option_text VARCHAR(255) NOT NULL,
    votes_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS poll_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(poll_option_id, user_id)
);

-- 10. PLACEMENTS & INTERNSHIPS
CREATE TYPE placement_type AS ENUM ('internship', 'full_time');
CREATE TYPE work_mode AS ENUM ('on_campus', 'off_campus', 'remote');

CREATE TABLE IF NOT EXISTS placements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    logo_url TEXT,
    role VARCHAR(255) NOT NULL,
    placement_type placement_type NOT NULL,
    work_mode work_mode NOT NULL,
    location VARCHAR(255) NOT NULL,
    stipend VARCHAR(100) NOT NULL,
    min_cgpa NUMERIC(4,2) DEFAULT 0.00,
    eligible_branches TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    deadline DATE NOT NULL,
    apply_url TEXT NOT NULL,
    applicants_count INT DEFAULT 0,
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. SAVED BOOKMARKS & NOTIFICATIONS
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL, -- 'note', 'announcement', 'event', 'placement', 'post'
    entity_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(100) NOT NULL, -- User UUID or 'all'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    target_tab VARCHAR(50),
    target_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    target VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_notes_branch_sem ON notes(branch_id, semester);
CREATE INDEX IF NOT EXISTS idx_notes_subject_unit ON notes(subject_id, unit_number);
CREATE INDEX IF NOT EXISTS idx_notes_status ON notes(status);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_posts_channel ON community_posts(channel, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_placements_deadline ON placements(deadline);