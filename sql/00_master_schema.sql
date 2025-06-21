-- DebutEdu Master Schema
-- Version 1.1
-- This script contains all tables, RLS policies, and RPC functions
-- for the teacher and admin dashboards.
-- Execute this script in your Supabase SQL Editor.
-- =================================================================

-- =================================================================
-- Section 1: Helper Functions
-- =================================================================

-- Checks if the currently authenticated user is an admin.
CREATE OR REPLACE FUNCTION is_admin(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- This function now directly checks the user_profiles table.
    -- Assumes user_profiles is populated via a trigger from auth.users.
    SELECT role INTO user_role FROM public.user_profiles WHERE user_id = p_user_id;
    RETURN user_role = 'admin';
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
END;
$$;


-- =================================================================
-- Section 2: Core Tables (Users, Auth, Links)
-- =================================================================

-- Stores public user profile information, synced from auth.users.
CREATE TABLE public.user_profiles (
    user_id UUID PRIMARY KEY NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    name TEXT,
    email TEXT UNIQUE,
    phone_number TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_auth_users FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
COMMENT ON TABLE public.user_profiles IS 'Clerk(auth.users)와 동기화되는 공개 프로필 정보';

-- Stores requests for role verification (student, parent).
CREATE TABLE public.auth_requests (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL,
    requester_name TEXT,
    requester_role TEXT NOT NULL,
    student_name TEXT,
    student_grade TEXT,
    parent_name TEXT,
    parent_phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE
);
COMMENT ON TABLE public.auth_requests IS '재원생/학부모 역할 인증 요청';

-- Links parent accounts to student accounts.
CREATE TABLE public.parent_student_links (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    parent_id UUID NOT NULL,
    student_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    UNIQUE (parent_id, student_id)
);
COMMENT ON TABLE public.parent_student_links IS '학부모와 학생 계정 연결';


-- =================================================================
-- Section 3: Teacher-related Tables (Classes, Attendance, Scores)
-- =================================================================

-- Stores information about classes.
CREATE TABLE public.classes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE public.classes IS '수업(반) 정보';

-- Junction table for teachers, students, and classes.
CREATE TABLE public.class_members (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    class_id BIGINT NOT NULL,
    user_id UUID NOT NULL,
    role TEXT NOT NULL, -- teacher, student
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    UNIQUE(class_id, user_id)
);
COMMENT ON TABLE public.class_members IS '반 구성원 (교사, 학생)';

-- Stores daily attendance records.
CREATE TABLE public.attendance (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    class_id BIGINT NOT NULL,
    student_id UUID NOT NULL,
    attendance_date DATE NOT NULL,
    status TEXT NOT NULL, -- present, late, absent
    teacher_comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    UNIQUE (class_id, student_id, attendance_date)
);
COMMENT ON TABLE public.attendance IS '일일 출결 기록';

-- Stores daily scores for students.
CREATE TABLE public.daily_scores (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    class_id BIGINT NOT NULL,
    student_id UUID NOT NULL,
    teacher_id UUID NOT NULL,
    score_date DATE NOT NULL,
    score INT,
    max_score INT,
    level TEXT,
    teacher_comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.user_profiles(user_id) ON DELETE SET NULL,
    UNIQUE (class_id, student_id, score_date)
);
COMMENT ON TABLE public.daily_scores IS '일일 학습 성취도 기록';


-- =================================================================
-- Section 4: Admin-related Tables (Payments, Notifications)
-- =================================================================

-- Stores records of monthly payments for each student.
CREATE TABLE public.payment_logs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id UUID NOT NULL,
    class_id BIGINT,
    payment_for_month DATE NOT NULL,
    amount INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid, paid
    paid_at TIMESTAMPTZ,
    payment_method TEXT,
    memo TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL,
    UNIQUE (student_id, payment_for_month)
);
COMMENT ON TABLE public.payment_logs IS '학생들의 월별 결제 기록';

-- Logs all notifications sent to users (e.g., payment reminders).
CREATE TABLE public.notifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    recipient_id UUID NOT NULL,
    content TEXT NOT NULL,
    type TEXT, -- e.g., payment_reminder, new_post
    status TEXT NOT NULL DEFAULT 'sent', -- sent, delivered, read, failed
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_recipient FOREIGN KEY (recipient_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE
);
COMMENT ON TABLE public.notifications IS '사용자에게 발송된 알림 기록';


-- =================================================================
-- Section 5: Community Tables (Posts, Comments)
-- These were defined early in the project.
-- =================================================================
CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE public.posts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    category_id INTEGER REFERENCES public.categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.comments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    post_id BIGINT REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =================================================================
-- Section 6: Admin & Teacher Interaction Tables (NEW)
-- =================================================================

CREATE TABLE public.consultations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id UUID NOT NULL,
    class_id BIGINT,
    teacher_id UUID,
    consultation_date DATE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.user_profiles(user_id) ON DELETE SET NULL
);
COMMENT ON TABLE public.consultations IS '학생/학부모 상담 기록';

CREATE TABLE public.student_memos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id UUID NOT NULL,
    author_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE
);
COMMENT ON TABLE public.student_memos IS '학생에 대한 관리자/강사 전용 내부 메모';


-- =================================================================
-- Section 7: Row Level Security (RLS) Policies
-- =================================================================

-- RLS for user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.user_profiles TO service_role;
CREATE POLICY "Allow admin full access on user_profiles" ON public.user_profiles FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow users to see all profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow users to update their own profile" ON public.user_profiles FOR UPDATE USING (user_id = auth.uid());

-- RLS for auth_requests
ALTER TABLE public.auth_requests ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.auth_requests TO service_role;
CREATE POLICY "Allow admin full access to auth_requests" ON public.auth_requests FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow users to see and manage their own auth_requests" ON public.auth_requests FOR ALL USING (user_id = auth.uid());

-- RLS for parent_student_links
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.parent_student_links TO service_role;
CREATE POLICY "Allow admin full access to links" ON public.parent_student_links FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow parents to see their own links" ON public.parent_student_links FOR SELECT USING (parent_id = auth.uid());

-- RLS for classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.classes TO service_role;
CREATE POLICY "Allow admin full access to classes" ON public.classes FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow members to see their class" ON public.classes FOR SELECT USING (EXISTS (SELECT 1 FROM class_members WHERE class_id = id AND user_id = auth.uid()));

-- RLS for class_members
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.class_members TO service_role;
CREATE POLICY "Allow admin full access to class members" ON public.class_members FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow teachers to see members of their class" ON public.class_members FOR SELECT USING (EXISTS (SELECT 1 FROM class_members cm WHERE cm.class_id = public.class_members.class_id AND cm.user_id = auth.uid() AND cm.role = 'teacher'));

-- RLS for attendance
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.attendance TO service_role;
CREATE POLICY "Allow admin full access on attendance" ON public.attendance FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow teachers to manage attendance for their classes" ON public.attendance FOR ALL USING (EXISTS (SELECT 1 FROM class_members WHERE class_id = public.attendance.class_id AND user_id = auth.uid() AND role = 'teacher'));
CREATE POLICY "Allow students/parents to see their own attendance" ON public.attendance FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM parent_student_links WHERE student_id = public.attendance.student_id AND parent_id = auth.uid()));

-- RLS for daily_scores
ALTER TABLE public.daily_scores ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.daily_scores TO service_role;
CREATE POLICY "Allow admin full access on daily_scores" ON public.daily_scores FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow teachers to manage scores for their classes" ON public.daily_scores FOR ALL USING (EXISTS (SELECT 1 FROM class_members WHERE class_id = public.daily_scores.class_id AND user_id = auth.uid() AND role = 'teacher'));
CREATE POLICY "Allow students/parents to see their own scores" ON public.daily_scores FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM parent_student_links WHERE student_id = public.daily_scores.student_id AND parent_id = auth.uid()));

-- RLS for payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.payment_logs TO service_role;
CREATE POLICY "Allow admin full access on payment_logs" ON public.payment_logs FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow parents/students to see their own payment logs" ON public.payment_logs FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM parent_student_links WHERE student_id = public.payment_logs.student_id AND parent_id = auth.uid()));

-- RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.notifications TO service_role;
CREATE POLICY "Allow admin full access on notifications" ON public.notifications FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Allow users to see their own notifications" ON public.notifications FOR SELECT USING (recipient_id = auth.uid());

-- RLS for community tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.posts TO service_role;
GRANT ALL ON public.comments TO service_role;
GRANT ALL ON public.categories TO service_role;

CREATE POLICY "Allow users to manage their own posts" ON public.posts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Allow all authenticated users to see posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow users to manage their own comments" ON public.comments FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Allow all authenticated users to see comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Allow all authenticated users to see categories" ON public.categories FOR SELECT USING (true);

-- RLS for consultations (NEW)
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.consultations TO service_role;
CREATE POLICY "Allow admin full access on consultations" ON public.consultations FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow teachers to manage consultations for their students" ON public.consultations FOR ALL
    USING (EXISTS (SELECT 1 FROM class_members cm JOIN user_profiles up ON cm.user_id = up.user_id WHERE cm.class_id = public.consultations.class_id AND cm.user_id = auth.uid() AND up.role = 'teacher'))
    WITH CHECK (EXISTS (SELECT 1 FROM class_members cm JOIN user_profiles up ON cm.user_id = up.user_id WHERE cm.class_id = public.consultations.class_id AND cm.user_id = auth.uid() AND up.role = 'teacher'));
CREATE POLICY "Allow parents/students to see their own consultations" ON public.consultations FOR SELECT
    USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM parent_student_links psl WHERE psl.student_id = public.consultations.student_id AND psl.parent_id = auth.uid()));

-- RLS for student_memos (NEW, internal only)
ALTER TABLE public.student_memos ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.student_memos TO service_role;
CREATE POLICY "Allow admin full access on memos" ON public.student_memos FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Allow teachers to see/create memos for their students" ON public.student_memos FOR ALL
    USING (EXISTS (SELECT 1 FROM class_members cm WHERE cm.user_id = auth.uid() AND cm.role = 'teacher' AND cm.class_id IN (SELECT class_id FROM class_members WHERE user_id = public.student_memos.student_id)))
    WITH CHECK (author_id = auth.uid());

-- =================================================================
-- Section 8: Remote Procedure Calls (RPC)
-- =================================================================

-- Function to get the list of classes a teacher is assigned to.
CREATE OR REPLACE FUNCTION get_teacher_classes(p_teacher_id uuid)
RETURNS TABLE(class_id BIGINT, class_name TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT (is_admin(auth.uid()) OR p_teacher_id = auth.uid()) THEN
        RAISE EXCEPTION 'Not authorized';
    END IF;

    RETURN QUERY
    SELECT c.id, c.name
    FROM public.classes c
    JOIN public.class_members cm ON c.id = cm.class_id
    WHERE cm.user_id = p_teacher_id AND cm.role = 'teacher';
END;
$$;

-- Function to get students in a specific class.
CREATE OR REPLACE FUNCTION get_students_in_class(p_class_id BIGINT)
RETURNS TABLE (
    user_id UUID,
    name TEXT,
    email TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT (is_admin(auth.uid()) OR EXISTS(SELECT 1 FROM class_members WHERE class_id = p_class_id AND user_id = auth.uid() AND role = 'teacher')) THEN
        RAISE EXCEPTION 'Not authorized';
    END IF;

    RETURN QUERY
    SELECT up.user_id, up.name, up.email
    FROM public.user_profiles up
    JOIN public.class_members cm ON up.user_id = cm.user_id
    WHERE cm.class_id = p_class_id AND cm.role = 'student' AND up.is_verified = TRUE;
END;
$$;


-- Function to handle an auth request (approve/reject).
CREATE OR REPLACE FUNCTION handle_auth_request(
  p_request_id BIGINT,
  p_action TEXT -- 'approve' or 'reject'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_role TEXT;
  v_student_name TEXT;
  v_parent_name TEXT;
  v_parent_phone TEXT;
  v_parent_profile public.user_profiles;
  v_student_profile public.user_profiles;
BEGIN
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Admin privileges required';
  END IF;

  SELECT user_id, requester_role, student_name, parent_name, parent_phone INTO v_user_id, v_role, v_student_name, v_parent_name, v_parent_phone
  FROM public.auth_requests
  WHERE id = p_request_id;

  IF p_action = 'approve' THEN
    UPDATE public.user_profiles SET is_verified = TRUE, role = v_role WHERE user_id = v_user_id;
    
    -- If parent, try to find and link student
    IF v_role = 'parent' THEN
      SELECT * INTO v_student_profile FROM public.user_profiles WHERE name = v_student_name AND role = 'student' AND is_verified = TRUE LIMIT 1;
      IF v_student_profile IS NOT NULL THEN
        INSERT INTO public.parent_student_links (parent_id, student_id)
        VALUES (v_user_id, v_student_profile.user_id)
        ON CONFLICT (parent_id, student_id) DO NOTHING;
      END IF;
    END IF;

    -- If student, try to find and link parent
    IF v_role = 'student' THEN
      SELECT * INTO v_parent_profile FROM public.user_profiles WHERE name = v_parent_name AND phone_number = v_parent_phone AND role = 'parent' AND is_verified = TRUE LIMIT 1;
      IF v_parent_profile IS NOT NULL THEN
        INSERT INTO public.parent_student_links (parent_id, student_id)
        VALUES (v_parent_profile.user_id, v_user_id)
        ON CONFLICT (parent_id, student_id) DO NOTHING;
      END IF;
    END IF;

    UPDATE public.auth_requests SET status = 'approved' WHERE id = p_request_id;
  ELSIF p_action = 'reject' THEN
    UPDATE public.auth_requests SET status = 'rejected' WHERE id = p_request_id;
  END IF;
END;
$$;

-- Function to get key statistics for the admin dashboard (UPDATED)
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
    v_total_students INT;
    v_consulted_this_month INT;
BEGIN
    IF NOT is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Admin privileges required';
    END IF;

    -- Calculate unconsulted students
    SELECT COUNT(*) INTO v_total_students FROM user_profiles WHERE role = 'student' AND is_verified = true;
    SELECT COUNT(DISTINCT student_id) INTO v_consulted_this_month FROM consultations WHERE consultation_date >= date_trunc('month', current_date);

    SELECT json_build_object(
        'pending_auth_requests', (SELECT COUNT(*) FROM auth_requests WHERE status = 'pending'),
        'total_students', v_total_students,
        'total_classes', (SELECT COUNT(*) FROM classes),
        'total_teachers', (SELECT COUNT(*) FROM user_profiles WHERE role = 'teacher' AND is_verified = true),
        'today_attendance_count', (SELECT COUNT(*) FROM attendance WHERE attendance_date = current_date),
        'unpaid_this_month', (SELECT COUNT(*) FROM payment_logs WHERE status = 'unpaid' AND payment_for_month = date_trunc('month', current_date)::date),
        'unconsulted_this_month', GREATEST(0, v_total_students - v_consulted_this_month),
        'recent_payments_week', (SELECT COUNT(*) FROM payment_logs WHERE status = 'paid' AND paid_at >= now() - interval '7 days')
    ) INTO result;

    RETURN result;
END;
$$;

-- Function to get unpaid students list for admin dashboard
CREATE OR REPLACE FUNCTION get_unpaid_students_list(
    p_month date DEFAULT date_trunc('month', current_date)::date,
    p_class_id BIGINT DEFAULT NULL
)
RETURNS TABLE (
    user_id UUID,
    name TEXT,
    phone_number TEXT,
    class_name TEXT,
    unpaid_amount INT,
    unpaid_month DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Admin privileges required';
    END IF;

    RETURN QUERY
    SELECT
        up.user_id,
        up.name,
        up.phone_number,
        c.name as class_name,
        pl.amount as unpaid_amount,
        pl.payment_for_month as unpaid_month
    FROM public.payment_logs pl
    JOIN public.user_profiles up ON pl.student_id = up.user_id
    LEFT JOIN public.classes c ON pl.class_id = c.id
    WHERE pl.status = 'unpaid'
      AND pl.payment_for_month = p_month
      AND (p_class_id IS NULL OR pl.class_id = p_class_id);
END;
$$;


-- Function to get consultation stats for the dashboard panel (NEW)
CREATE OR REPLACE FUNCTION get_consultation_stats_by_month(
    p_month date DEFAULT date_trunc('month', current_date)::date
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_students INT;
    v_consulted_count INT;
    v_completion_rate NUMERIC;
BEGIN
    IF NOT is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Admin privileges required';
    END IF;

    SELECT COUNT(*) INTO v_total_students FROM user_profiles WHERE role = 'student' AND is_verified = true;
    SELECT COUNT(DISTINCT student_id) INTO v_consulted_count FROM consultations WHERE date_trunc('month', consultation_date) = date_trunc('month', p_month);

    IF v_total_students > 0 THEN
        v_completion_rate := (v_consulted_count::numeric / v_total_students::numeric) * 100;
    ELSE
        v_completion_rate := 0;
    END IF;

    RETURN json_build_object(
        'total_students', v_total_students,
        'consulted_count', v_consulted_count,
        'unconsulted_count', v_total_students - v_consulted_count,
        'completion_rate', round(v_completion_rate, 2)
    );
END;
$$;