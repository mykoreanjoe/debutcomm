import Link from 'next/link';
import { Phone, MapPin, Edit3, Users, MessageSquare, ShoppingCart } from 'lucide-react'; // 아이콘 추가

const Footer = () => {
  const businessInfo = {
    registrationNumber: "6382호",
    businessNumber: "524-95-01777",
    address: "서울특별시 양천구 신목로 38 202호",
    kakaoTalkUrl: "http://pf.kakao.com/_pGxkPn/chat",
    naverBlogUrl: "https://blog.naver.com/ourdebut",
    levelTestUrl: "https://booking.naver.com/booking/13/bizes/1068331",
    phoneNumber: "02-6952-1131",
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">데뷰 영어학원</h3>
          <p className="text-sm">같이 완성, Let's Do It!</p>
          <p className="text-sm mt-2">목동, 양천구, 신정동 대표 영어학원</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">학원 정보</h3>
          <ul className="space-y-2 text-sm">
            <li><Edit3 className="inline-block w-4 h-4 mr-2 text-amber-400" />학원 등록 번호: {businessInfo.registrationNumber}</li>
            <li><ShoppingCart className="inline-block w-4 h-4 mr-2 text-amber-400" />사업자 번호: {businessInfo.businessNumber}</li>
            <li><MapPin className="inline-block w-4 h-4 mr-2 text-amber-400" />주소: {businessInfo.address}</li>
            <li>
              <a href={`tel:${businessInfo.phoneNumber.replace(/-/g, '')}`} className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <Phone className="inline-block w-4 h-4 mr-2 text-amber-400" />전화번호: {businessInfo.phoneNumber}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">온라인 채널</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={businessInfo.kakaoTalkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <MessageSquare className="inline-block w-4 h-4 mr-2 text-green-400" /> 카카오톡 채널
              </Link>
            </li>
            <li>
              <Link href={businessInfo.naverBlogUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <Users className="inline-block w-4 h-4 mr-2 text-green-400" /> 네이버 블로그
              </Link>
            </li>
            <li>
              <a href={`tel:${businessInfo.phoneNumber.replace(/-/g, '')}`} className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <Phone className="inline-block w-4 h-4 mr-2 text-blue-400" /> 전화 문의: {businessInfo.phoneNumber}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} 데뷰 영어학원. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 