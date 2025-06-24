"use client";

import { useActionState } from 'react';
import { login, signInWithGoogle } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const initialState = {
  message: '',
};

export default function LoginPage() {
  const [state, dispatch] = useActionState(login, initialState);

  const handleKakaoLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        
        <form action={dispatch} className="space-y-6">
          <input type="hidden" name="redirectTo" value="/community" />
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          
          <Button type="submit" className="w-full">
            로그인
          </Button>
          
          {state.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {state.message}
            </p>
          )}
        </form>

        <div className="text-center">
          <Link 
            href="/signup"
            className="text-sm text-gray-600 hover:underline"
          >
            계정이 없으신가요? 회원가입
          </Link>
        </div>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">또는</span>
          </div>
        </div>

        <div className="space-y-3">
          <form action={signInWithGoogle}>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.712,34.464,44,28.756,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span>Google로 로그인</span>
            </Button>
          </form>
          <Button 
            onClick={handleKakaoLogin}
            variant="outline" 
            className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90 flex items-center justify-center gap-2"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3.5C7.229 3.5 3.5 6.567 3.5 10.286c0 2.49 1.764 4.654 4.218 5.753a.5.5 0 01.282.458v.003c-.001.015-.002.03-.002.046 0 .08-.01.157-.027.23-.207.92-.472 2.083-.472 2.083s-.007.033.004.05A.347.347 0 008 19l2.5-1.667a.5.5 0 01.433-.064c.26.04.525.07.79.086.084.004.168.006.252.006C16.771 17.5 20.5 14.433 20.5 10.714 20.5 6.995 16.771 3.5 12 3.5z" />
            </svg>
            <span>카카오로 로그인</span>
          </Button>
        </div>
      </div>
    </div>
  );
}