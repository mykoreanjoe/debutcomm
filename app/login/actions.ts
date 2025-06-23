'use server';

import { headers, cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = formData.get('redirectTo') as string || '/community';
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const origin = (await headers()).get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;
  const supabase = createClient();
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        nickname: nickname,
      },
    },
  });

  if (error) {
    console.error('Signup error:', error);
    return redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  // 성공적으로 가입 요청이 되면, 이메일 인증 페이지로 리디렉션
  return redirect('/auth/verify');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/');
}

export async function signInWithKakao() {
  const supabase = createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Kakao:', error);
    return redirect('/login?message=Could not authenticate with Kakao');
  }

  if (data.url) {
    return redirect(data.url); // Redirect to Kakao's auth page
  }
  
  return redirect('/login?message=Something went wrong');
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = (await headers()).get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    return redirect('/login?message=Could not authenticate with Google');
  }

  if (data.url) {
    return redirect(data.url); // Redirect to Google's auth page
  }
  
  return redirect('/login?message=Something went wrong');
} 