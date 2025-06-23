"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import AuthButton from './AuthButton';
import NotificationBell from './NotificationBell';

const navItems = [
  { name: '스토리', href: '/story' },
  { name: 'WHY DEBUT', href: '/why-debut' },
  { name: '커리큘럼', href: '/curriculum' },
  { name: '시간표', href: '/timetable' },
  { name: '학사일정', href: '/news' },
  { name: '데뷰데이', href: '/debut-day' },
  { name: '데뷰인', href: '/debutian' },
  { name: '스터디룸', href: '/study-room' },
  { name: '데뷰후기', href: '/reviews' },
  { name: '파트너스', href: '/partners' },
  { name: '커뮤니티', href: '/community' },
];

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left: Mobile Menu Toggle / Desktop Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -ml-2"
              aria-label="메뉴 열기"
            >
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <div className="hidden md:block">
              <Link href="/">
                <span className="text-xl font-bold text-blue-800">목동데뷰영어</span>
              </Link>
            </div>
          </div>

          {/* Center: Mobile Logo (absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Link href="/" onClick={closeMobileMenu}>
              <span className="text-xl font-bold text-blue-800">목동데뷰영어</span>
            </Link>
          </div>

          {/* Right: Desktop Navigation & Auth */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 px-3 text-sm text-gray-600 hover:text-blue-700 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {user && <NotificationBell />}
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'}`}>
        <nav className="p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {user && <NotificationBell />}
              </div>
              <AuthButton />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
} 