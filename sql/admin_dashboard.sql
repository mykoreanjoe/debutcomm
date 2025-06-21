-- =================================================================
-- Step 1: Payment Logs Table
-- Stores records of monthly payments for each student.
-- =================================================================
CREATE TABLE public.payment_logs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id UUID NOT NULL,
    class_id BIGINT,
    payment_for_month DATE NOT NULL,
    amount INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid',
    paid_at TIMESTAMPTZ,
    payment_method TEXT,
    memo TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL,
    UNIQUE (student_id, payment_for_month)
);

COMMENT ON TABLE public.payment_logs IS '학생들의 월별 결제 기록을 저장합니다.';
COMMENT ON COLUMN public.payment_logs.payment_for_month IS '결제가 해당하는 월 (매월 1일로 저장)';
COMMENT ON COLUMN public.payment_logs.status IS '결제 상태 (unpaid, paid)';
COMMENT ON COLUMN public.payment_logs.memo IS '관리자용 메모';

-- RLS for payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_logs TO service_role;

CREATE POLICY "Allow admin full access on payment_logs"
ON public.payment_logs FOR ALL
USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow users to see own or children's payment logs"
ON public.payment_logs FOR SELECT
USING (
    student_id = (SELECT user_id FROM public.user_profiles WHERE user_id = auth.uid()) OR
    EXISTS (
        SELECT 1 FROM parent_student_links psl
        WHERE psl.student_id = public.payment_logs.student_id AND psl.parent_id = (SELECT user_id FROM public.user_profiles WHERE user_id = auth.uid())
    )
);


-- =================================================================
-- Step 2: Notifications Table
-- Logs all notifications sent to users (e.g., payment reminders).
-- =================================================================
CREATE TABLE public.notifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    recipient_id UUID NOT NULL,
    content TEXT NOT NULL,
    type TEXT,
    status TEXT NOT NULL DEFAULT 'sent',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_recipient FOREIGN KEY (recipient_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE
);

COMMENT ON TABLE public.notifications IS '사용자에게 발송된 알림 기록';
COMMENT ON COLUMN public.notifications.type IS '알림 종류 (e.g., payment_reminder, new_auth_request_admin)';
COMMENT ON COLUMN public.notifications.status IS '알림 상태 (sent, delivered, read, failed)';

-- RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO service_role;

CREATE POLICY "Allow admin full access on notifications"
ON public.notifications FOR ALL
USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Allow users to see their own notifications"
ON public.notifications FOR SELECT
USING (recipient_id = (SELECT user_id FROM public.user_profiles WHERE user_id = auth.uid()));


-- =================================================================
-- Step 3: RPC Functions for Dashboard
-- Efficiently fetches aggregated data for the admin dashboard.
-- =================================================================

-- Function to get key statistics for the dashboard cards
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    IF NOT is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Admin privileges required';
    END IF;

    SELECT json_build_object(
        'pending_auth_requests', (SELECT COUNT(*) FROM auth_requests WHERE status = 'pending'),
        'total_students', (SELECT COUNT(*) FROM user_profiles WHERE role = 'student' AND is_verified = true),
        'total_classes', (SELECT COUNT(*) FROM classes),
        'total_teachers', (SELECT COUNT(*) FROM user_profiles WHERE role = 'teacher' AND is_verified = true),
        'today_attendance_count', (SELECT COUNT(*) FROM attendance WHERE attendance_date = current_date),
        'unpaid_this_month', (
            SELECT COUNT(*) FROM payment_logs 
            WHERE status = 'unpaid' 
            AND payment_for_month = date_trunc('month', current_date)::date
        ),
        'recent_payments_week', (SELECT COUNT(*) FROM payment_logs WHERE status = 'paid' AND paid_at >= now() - interval '7 days')
    ) INTO result;

    RETURN result;
END;
$$;

-- Function to get a detailed list of unpaid students
CREATE OR REPLACE FUNCTION get_unpaid_students_list(
    p_month date DEFAULT date_trunc('month', current_date)::date,
    p_class_id bigint DEFAULT NULL
)
RETURNS TABLE (
    student_id uuid,
    student_name text,
    class_name text,
    parent_contact text,
    unpaid_for_month date,
    amount_due int
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
        up.user_id as student_id,
        up.name as student_name,
        c.name as class_name,
        parent.phone_number as parent_contact,
        pl.payment_for_month as unpaid_for_month,
        pl.amount as amount_due
    FROM payment_logs pl
    JOIN user_profiles up ON pl.student_id = up.user_id
    LEFT JOIN classes c ON pl.class_id = c.id
    LEFT JOIN (
        SELECT psl.student_id, p_up.phone_number
        FROM parent_student_links psl
        JOIN user_profiles p_up ON psl.parent_id = p_up.user_id
        WHERE p_up.role = 'parent'
    ) parent ON parent.student_id = pl.student_id
    WHERE pl.status = 'unpaid' 
      AND pl.payment_for_month = p_month
      AND (p_class_id IS NULL OR pl.class_id = p_class_id);
END;
$$;

-- Function to get all classes for filter dropdowns
CREATE OR REPLACE FUNCTION get_all_classes()
RETURNS TABLE (
    id bigint,
    name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Admin privileges required';
    END IF;

    RETURN QUERY
    SELECT c.id, c.name FROM public.classes c ORDER BY c.name;
END;
$$; 