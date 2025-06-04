"use client";

import React, { useState } from 'react';
import { BookHeadphones, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      setIsAuthenticated(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 min-h-screen">
      <div className="text-center mb-12">
        <BookHeadphones className="w-20 h-20 md:w-24 md:h-24 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">데뷰 스터디룸</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          데뷰 학생들을 위한 전용 학습 공간입니다. 비밀번호를 입력하여 입장해주세요.
        </p>
      </div>

      {!isAuthenticated ? (
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg max-w-md mx-auto text-center">
          <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">스터디룸 비밀번호 입력</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="text-center"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              입장하기
            </Button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6">스터디룸에 오신 것을 환영합니다!</h2>
          <p className="text-gray-600 text-lg">현재 학습 콘텐츠 준비 중입니다.</p>
        </div>
      )}
    </main>
  );
};

export default StudyRoomPage; 