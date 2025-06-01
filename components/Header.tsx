"use client";

import React from 'react';
// import Image from 'next/image'; // Image 컴포넌트 import 제거
import Link from 'next/link';
import { Menu } from 'lucide-react';

const navItems = [
  { name: '스토리', href: '/story' },
  { name: '데뷰학습과정', href: '/learning-process' },
  { name: '커리큘럼', href: '/curriculum' },
  { name: '학습경험', href: '/learning-experience' },
  { name: '데뷰데이', href: '/debut-day' },
  { name: '데뷰인', href: '/debutian' },
  { name: '스터디룸', href: '/study-room' },
  { name: '데뷰후기', href: '/reviews' },
  { name: '같이완성 커뮤니티', href: '/community' },
];

export default function Header() {
  // TODO: 모바일 메뉴 상태 관리 로직 추가 (useState 사용)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-xl font-bold text-[#13588f]">목동데뷰영어</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-2 px-3 text-sm text-[#7fa6c3] hover:text-[#13588f] rounded transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button 
            className="outline-none mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // TODO: 모바일 메뉴 토글 로직 연결
          >
            <Menu className="w-6 h-6 text-gray-500 hover:text-[#13588f]" />
          </button>
        </div>
      </nav>
      {/* 모바일 메뉴 (isMobileMenuOpen 상태에 따라 표시) */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
        <ul className="mt-2 space-y-2 px-2 py-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-[#7fa6c3] hover:text-[#13588f] hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)} // TODO: 메뉴 아이템 클릭 시 모바일 메뉴 닫기
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
} 