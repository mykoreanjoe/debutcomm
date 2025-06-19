import Link from 'next/link';
import { MessageSquare, Calendar } from 'lucide-react';

const FloatingInquiryButton = () => {
  const kakaoTalkUrl = "http://pf.kakao.com/_pGxkPn/chat"; // Footer에서 사용된 URL과 동일하게 설정

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-[1000]">
      {/* 캘린더 아이콘 */}
      <Link
        href="/timetable"
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
        title="캘린더"
        aria-label="캘린더 페이지로 이동"
      >
        <Calendar size={28} />
      </Link>

      {/* 카카오톡 문의 아이콘 */}
      <Link 
        href={kakaoTalkUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-500 text-white p-4 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
        title="카카오톡 문의하기"
        aria-label="카카오톡으로 문의하기"
      >
        <MessageSquare size={28} />
      </Link>
    </div>
  );
};

export default FloatingInquiryButton; 