"use client";

import React, { useState } from 'react';
import { BookHeadphones, Lock, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SectionTitle from '@/components/SectionTitle';

const STUDY_ROOM_PASSWORD = "debutedu";

const StudyRoomPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === STUDY_ROOM_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
      setPassword('');
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <main className="container mx-auto px-4">
        <SectionTitle
          icon={BookHeadphones}
          title="데뷰 스터디룸"
          subtitle="데뷰 학생들을 위한 전용 학습 공간입니다. 비밀번호를 입력하여 입장해주세요."
          iconColor="text-blue-600"
          titleColor="text-blue-800"
        />

        <div className="max-w-md mx-auto">
          {!isAuthenticated ? (
            <div className="bg-gradient-to-br from-white to-slate-100 p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-200/80">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">스터디룸 비밀번호 입력</h2>
              </div>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="text-center text-lg h-12"
                  aria-label="스터디룸 비밀번호"
                />
                {error && <p className="text-red-500 text-sm text-center pt-1">{error}</p>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  입장하기
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 md:p-12 rounded-2xl shadow-2xl text-center border border-blue-200/50">
              <PartyPopper className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-blue-800 mb-4">스터디룸에 오신 것을 환영합니다!</h2>
              <p className="text-gray-600 text-lg">현재 학습 콘텐츠가 준비 중입니다. 곧 멋진 모습으로 찾아오겠습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudyRoomPage; 