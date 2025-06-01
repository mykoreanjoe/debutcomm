import React from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import { SignedOut, SignInButton } from '@clerk/nextjs';

const CommunityPage = () => {
  const benefits = [
    { text: 'Q&A: 궁금한 점을 질문하고 답변을 받아보세요.', icon: <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> },
    { text: '고민 상담: 학습 및 진로에 대한 고민을 나누고 조언을 얻을 수 있습니다.', icon: <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> },
    { text: '목동권 자료 공유: 유용한 학습 자료 및 정보를 얻고 공유할 수 있습니다.', icon: <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" /> },
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-700">같이완성 커뮤니티</h1>
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto">
        <p className="text-xl text-gray-800 leading-relaxed text-center">
          데뷰 영어 학원의 <span className="font-semibold text-blue-600">'같이완성 커뮤니티'</span>에 오신 것을 환영합니다!
        </p>
        <p className="mt-6 text-gray-700 text-center">
          이곳은 학습 정보 공유, 질문과 답변, 스터디 그룹 구성 등 자유롭게 소통하며 함께 성장하는 공간입니다.
        </p>
        
        <div className="my-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">커뮤니티 멤버 혜택</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start bg-sky-50 p-4 rounded-lg border border-sky-200 shadow-sm">
                {benefit.icon}
                <span className="text-gray-700">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">커뮤니티 기능 오픈 예정!</h3>
          <p className="text-gray-600 italic max-w-md mx-auto mb-10">
            현재 더 나은 소통 환경을 위해 열심히 준비 중입니다. 
            곧 다양한 기능과 함께 찾아뵙겠습니다. 많은 기대 부탁드립니다!
          </p>
        
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <Lock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-amber-700 mb-2">회원 전용 커뮤니티입니다</h3>
            <p className="text-amber-600 mb-6">
              커뮤니티의 모든 게시판과 자료는 로그인한 데뷰 학생들만 이용 가능합니다.
            </p>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors">
                  로그인하고 커뮤니티 참여하기
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage; 