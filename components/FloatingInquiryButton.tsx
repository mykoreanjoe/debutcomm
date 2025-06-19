"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Calendar, ArrowUpCircle } from 'lucide-react';

const FloatingInquiryButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const kakaoTalkUrl = "http://pf.kakao.com/_pGxkPn/chat"; 

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-[1000]">
      {/* 맨 위로 가기 아이콘 */}
      <button
        onClick={scrollToTop}
        className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        title="맨 위로 가기"
        aria-label="맨 위로 가기"
      >
        <ArrowUpCircle size={28} />
      </button>

      {/* 캘린더 아이콘 */}
      <Link
        href="/news"
        className="bg-red-500 hover:bg-red-600 text-white w-[60px] h-[60px] rounded-full shadow-lg transition-colors duration-300 flex flex-col items-center justify-center"
        title="일정"
        aria-label="NEWS 페이지로 이동"
      >
        <Calendar size={24} />
        <span className="text-[11px] font-bold mt-0.5">일정</span>
      </Link>

      {/* 카카오톡 문의 아이콘 */}
      <Link
        href={kakaoTalkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
        title="카카오톡 문의하기"
        aria-label="카카오톡으로 문의하기"
      >
        <MessageSquare size={28} />
      </Link>
    </div>
  );
};

export default FloatingInquiryButton; 