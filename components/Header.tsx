"use client";

import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import AuthButton from './AuthButton';
// import {
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import UserProfile from './UserProfile'; // UserProfile 컴포넌트 import

const navItems = [
  { name: '스토리', href: '/story' },
  { name: 'WHY DEBUT', href: '/why-debut' },
  { name: '커리큘럼', href: '/curriculum' },
  { name: '시간표', href: '/timetable' },
  { name: '학사일정', href: '/news' },
  // { name: '학습경험', href: '/learning-experience' }, // 이 링크는 현재 404, 필요시 복원
  { name: '데뷰데이', href: '/debut-day' },
  { name: '데뷰인', href: '/debutian' },
  { name: '스터디룸', href: '/study-room' },
  { name: '데뷰후기', href: '/reviews' },
  { name: '파트너스', href: '/partners' },
  { name: '같이완성 커뮤니티', href: '/community' },
];

export default function Header({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container relative mx-auto flex h-16 items-center justify-between px-6">
        {/* Left side: Menu button on mobile */}
        <div className="flex items-center">
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className=""
            >
              <Menu className="h-6 w-6 text-gray-500 transition-colors duration-300 hover:text-indigo-600" />
            </button>
          </div>
          {/* Desktop Logo */}
            <div className="hidden md:flex items-center gap-2">
            <Link href="/">
                <span className="text-xl font-bold text-blue-800">목동데뷰영어</span>
            </Link>
          </div>
        </div>

        {/* Center: Logo (mobile only, absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:hidden">
          <Link href="/">
              <span className="text-xl font-bold text-blue-800">목동데뷰영어</span>
          </Link>
        </div>

        {/* Right side: Auth buttons and Nav links on desktop */}
        <div className="flex items-center gap-4">
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-2 px-3 text-sm text-gray-500 hover:text-blue-700 hover:underline rounded transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {children}
          </div>
        </div>
      </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <ul className="mt-2 space-y-2 px-2 py-3 flex flex-col items-start">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link 
                href={item.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="w-full mt-4 border-t pt-4 px-3 py-2">
            {children}
          </li>
        </ul>
      </div>
    </>
  );
} 