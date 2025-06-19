"use client";

import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { Menu, Newspaper, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  { name: '파트너스', href: '/partners' },
  { name: '같이완성 커뮤니티', href: '/community' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

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
                <span className="text-xl font-bold text-[#13588f]">목동데뷰영어</span>
              </Link>
            </div>
          </div>

          {/* Center: Logo (mobile only, absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:hidden">
            <Link href="/">
              <span className="text-xl font-bold text-[#13588f]">목동데뷰영어</span>
            </Link>
          </div>

          {/* Right side: Search button on mobile, Nav links on desktop */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <div className="md:hidden">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="">
                <Search className="h-6 w-6 text-gray-500 transition-colors duration-300 hover:text-indigo-600" />
              </button>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 px-3 text-sm text-[#7fa6c3] hover:text-[#13588f] hover:underline hover:shadow-md rounded transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Floating NEWS Button */}
      <div className="fixed bottom-8 right-5 z-50">
        <Link href="/news" passHref>
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg"
          >
            <Newspaper className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <ul className="mt-2 space-y-2 px-2 py-3 flex flex-col items-start">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link 
                href={item.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-[#7fa6c3] hover:text-[#13588f] hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Search Input */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-20 p-4' : 'max-h-0'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="검색..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    </>
  );
} 