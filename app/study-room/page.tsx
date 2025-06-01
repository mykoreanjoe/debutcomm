import React from 'react';
import { SignedOut, SignInButton, SignedIn } from '@clerk/nextjs';
import { BookHeadphones, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const StudyRoomPage = () => {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <BookHeadphones className="w-20 h-20 md:w-24 md:h-24 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">데뷰 스터디룸</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          이곳은 데뷰 학생들만을 위한 집중 학습 공간입니다. 다양한 학습 자료와 조용한 환경을 제공하여 학습 효율을 극대화할 수 있도록 지원합니다.
        </p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">스터디룸 주요 특징</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>개인별 집중 학습 공간 제공</li>
          <li>학습 관련 온라인 자료 접근 가능 (로그인 시)</li>
          <li>그룹 스터디 공간 예약 가능 (로그인 시)</li>
          <li>학습 분위기 유지를 위한 관리</li>
        </ul>
      </div>

      {/* 스터디룸 들어가기 버튼 (로그인 시 보임) */}
      <SignedIn>
        <div className="text-center mb-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/"> {/* TODO: 실제 스터디룸 메인 페이지 경로로 변경 */} 
              스터디룸 바로가기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </SignedIn>

      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center max-w-xl mx-auto">
        <Lock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-amber-700 mb-2">회원 전용 공간입니다</h3>
        <p className="text-amber-600 mb-6">
          스터디룸의 모든 콘텐츠와 기능은 로그인한 데뷰 학생들만 이용 가능합니다.
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors">
              로그인하고 스터디룸 이용하기
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  );
};

export default StudyRoomPage; 