"use client"; //  useState 사용을 위해 클라이언트 컴포넌트로 전환

import React, { useState } from 'react';
import DebutDayDetailsSection from '@/components/debut-day-details-section';
import Head from 'next/head';
import Image from 'next/image';

export default function DebutDayPage() {
  const [showDetailsSection, setShowDetailsSection] = useState(false);

  // 새로운 배너 이미지 경로로 수정 (public 폴더 기준)
  const welcomeImageUrl = "/images/welcome_debut_day_floral.png"; 

  const handleWelcomeImageClick = () => {
    setShowDetailsSection(true);
  };

  return (
    <>
      <Head>
        <title>데뷰데이 | 데뷰</title>
        <meta name="description" content="매월 특별한 테마로 찾아오는 데뷰만의 즐거운 이벤트 데이! 데뷰데이의 자세한 소식을 확인하세요." />
      </Head>
      <main className="container mx-auto px-4 py-8 md:py-12 text-center flex flex-col items-center">
        {!showDetailsSection && (
          <div 
            className="cursor-pointer inline-block group focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 rounded-lg overflow-hidden"
            onClick={handleWelcomeImageClick}
            onKeyPress={(e) => e.key === 'Enter' && handleWelcomeImageClick()} // 키보드 접근성
            tabIndex={0} // 키보드 포커스 가능하도록
            role="button"
            aria-pressed={showDetailsSection}
            aria-label="데뷰데이 상세 정보 보기"
          >
            <Image 
              src={welcomeImageUrl} 
              alt="Welcome to 데뷰데이 배너"
              width={600} // 새 배너 이미지의 적절한 너비 (조정 필요)
              height={800} // 새 배너 이미지의 적절한 높이 (조정 필요)
              className="block transform transition-transform duration-300 group-hover:scale-105 shadow-lg rounded-lg"
              priority // 중요 이미지이므로 우선 로드
            />
            {/* <p className="mt-4 text-lg text-gray-600">
              이미지를 클릭하여 데뷰데이의 즐거운 소식을 확인해보세요!
            </p> */}
          </div>
        )}

        {showDetailsSection && (
          <DebutDayDetailsSection />
        )}
        
        {showDetailsSection && (
            <div className="mt-12">
                <button 
                    onClick={() => setShowDetailsSection(false)}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
                >
                    데뷰데이 소개 닫기
                </button>
            </div>
        )}
      </main>
    </>
  );
} 