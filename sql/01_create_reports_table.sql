CREATE TABLE public.reports (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    reporter_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reported_post_id BIGINT REFERENCES public.posts(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL, -- pending, resolved, dismissed
    notes TEXT -- For admin notes
);

COMMENT ON TABLE public.reports IS 'Stores reports made by users against posts.';
COMMENT ON COLUMN public.reports.reporter_user_id IS 'The user who made the report.';
COMMENT ON COLUMN public.reports.reported_post_id IS 'The post that was reported.';
COMMENT ON COLUMN public.reports.reason IS 'The reason for the report.';
COMMENT ON COLUMN public.reports.status IS 'The current status of the report (pending, resolved, dismissed).'; 