import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경 변수 값 로깅 추가
console.log("Supabase URL from env:", supabaseUrl);
console.log("Raw NEXT_PUBLIC_SUPABASE_ANON_KEY from process.env:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log("Length of raw key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
console.log("Supabase Anon Key used for createClient:", supabaseAnonKey);
console.log("Length of key used for createClient:", supabaseAnonKey?.length);

if (!supabaseUrl) {
  console.error("ERROR: Supabase URL not found in environment variables.");
  throw new Error("Supabase URL not found. Make sure NEXT_PUBLIC_SUPABASE_URL is set in your .env.local file.");
}

if (!supabaseAnonKey) {
  console.error("ERROR: Supabase anon key not found in environment variables.");
  throw new Error("Supabase anon key not found. Make sure NEXT_PUBLIC_SUPABASE_ANON_KEY is set in your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 