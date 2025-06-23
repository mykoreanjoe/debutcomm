'use server';

import { headers, cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.password?.[0] || '입력값이 올바르지 않습니다.',
    };
  }

  const { email, password } = validatedFields.data;
  const redirectTo = formData.get('redirectTo') as string || '/community';
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  return redirect(redirectTo);
}

const signupSchema = z.object({
  nickname: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export async function signup(prevState: any, formData: FormData) {
  const origin = (await headers()).get('origin');
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.nickname?.[0] || validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.password?.[0] || '입력값이 올바르지 않습니다.',
    };
  }
  
  const { email, password, nickname } = validatedFields.data;
  const supabase = createClient();
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        nickname: nickname,
        avatar_url: `https://api.dicebear.com/8.x/identicon/svg?seed=${nickname}`
      },
    },
  });

  if (error) {
    console.error('Signup error:', error);
    if (error.message.includes('unique constraint')) {
        return { message: '이미 사용중인 이메일입니다.' };
    }
    return { message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
  }

  return redirect('/auth/verify?message=회원가입이 거의 완료되었습니다. 이메일을 확인하여 계정을 인증해주세요.');
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