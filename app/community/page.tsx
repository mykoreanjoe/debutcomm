import React from 'react';

const CommunityPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">같이완성 커뮤니티</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 leading-relaxed">
          데뷰 영어 학원의 '같이완성 커뮤니티'에 오신 것을 환영합니다!
        </p>
        <p className="mt-4 text-gray-600">
          이곳은 학습 정보 공유, 질문과 답변, 스터디 그룹 구성 등 자유롭게 소통할 수 있는 공간입니다.
          다 함께 성장하는 즐거움을 느껴보세요!
        </p>
        {/* TODO: 추후 커뮤니티 기능 (게시판, 댓글 등) 추가 예정 */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 italic">커뮤니티 기능은 현재 준비 중입니다. 곧 만나요!</p>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage; 