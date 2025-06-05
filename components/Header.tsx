"use client";

import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
// Clerk 관련 import 주석 처리 또는 삭제
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

const navItems = [
  { name: '스토리', href: '/story' },
  { name: 'WHY DEBUT', href: '/why-debut' },
  { name: '커리큘럼', href: '/curriculum' },
  { name: '시간표', href: '/timetable' },
  // { name: '학습경험', href: '/learning-experience' }, // 이 링크는 현재 404, 필요시 복원
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
      <nav className="container mx-auto px-6 py-3 grid grid-cols-3 items-center md:flex md:justify-between">
        <div className="col-start-2 text-center md:col-start-auto md:text-left md:flex-none">
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

        <div className="col-start-3 flex justify-end items-center md:hidden">
          <button 
            className="outline-none mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-500 hover:text-[#13588f]" />
          </button>
        </div>
      </nav>
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
        <ul className="mt-2 space-y-2 px-2 py-3 flex flex-col items-start">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link 
                href={item.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-[#7fa6c3] hover:text-[#13588f] hover:bg-gray-50 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
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