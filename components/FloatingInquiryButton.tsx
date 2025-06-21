"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FloatingInquiryButton = () => {
  // IMPORTANT: Replace with your actual KakaoTalk Channel URL
  const kakaoChannelUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || '#';

  if (kakaoChannelUrl === '#') {
    // Don't render the button if the URL is not set
    return null;
  }

  return (
    <Link href={kakaoChannelUrl} target="_blank" rel="noopener noreferrer">
      <div className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#FEE500] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer">
        <MessageCircle className="w-8 h-8 text-[#3C1E1E]" />
      </div>
    </Link>
  );
};

export default FloatingInquiryButton; 