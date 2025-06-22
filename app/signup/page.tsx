"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          student_name: studentName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('가입 확인을 위해 이메일을 확인해주세요.');
      // Optionally, you can clear the form or redirect
      // For now, we'll just show the message.
    }
  };

  const handleOAuthLogin = async (provider: 'kakao') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md my-8">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <Label htmlFor="studentName">학생 이름</Label>
            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              placeholder="홍길동"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="6자리 이상 입력해주세요"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}
          <Button type="submit" className="w-full">
            가입하기
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('kakao')}>
          카카오로 가입하기
        </Button>

         <p className="text-sm text-center text-gray-600">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
} 