"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export async function signup(prevState: any, formData: FormData) {
  const origin = (await headers()).get('origin');
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.password?.[0] || '입력값이 올바르지 않습니다.',
    };
  }
  
  const { email, password } = validatedFields.data;
  const supabase = createClient();
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
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