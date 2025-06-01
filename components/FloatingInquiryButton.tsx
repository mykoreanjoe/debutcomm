import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

const FloatingInquiryButton = () => {
  const kakaoTalkUrl = "http://pf.kakao.com/_pGxkPn/chat"; // Footer에서 사용된 URL과 동일하게 설정

  return (
    <Link 
      href={kakaoTalkUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 p-4 rounded-full shadow-lg transition-colors duration-300 z-50 flex items-center justify-center"
      title="카카오톡 문의하기"
      aria-label="카카오톡으로 문의하기"
    >
      <MessageSquare size={28} />
    </Link>
  );
};

export default FloatingInquiryButton; 