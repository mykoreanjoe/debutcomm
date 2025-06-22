// lib/supabase/server.ts 파일의 전체 내용으로 붙여넣어 주세요.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing from environment variables.");
}

// This is the public, anonymous Supabase client.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);