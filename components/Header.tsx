"use client";

import React from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import AuthButton from './AuthButton';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">목동데뷰영어</span>
          </Link>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/community" className="transition-colors hover:text-foreground/80">커뮤니티</Link>
            <Link href="/story" className="transition-colors hover:text-foreground/80">스토리</Link>
            <Link href="/why-debut" className="transition-colors hover:text-foreground/80">WHY DEBUT</Link>
            <Link href="/curriculum" className="transition-colors hover:text-foreground/80">커리큘럼</Link>
            <Link href="/timetable" className="transition-colors hover:text-foreground/80">시간표</Link>
            <Link href="/news" className="transition-colors hover:text-foreground/80">학사일정</Link>
            <Link href="/debut-day" className="transition-colors hover:text-foreground/80">데뷔데이</Link>
            <Link href="/debutian" className="transition-colors hover:text-foreground/80">데뷔인</Link>
            <Link href="/study-room" className="transition-colors hover:text-foreground/80">스터디룸</Link>
            <Link href="/reviews" className="transition-colors hover:text-foreground/80">데뷔후기</Link>
            <Link href="/partners" className="transition-colors hover:text-foreground/80">파트너스</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user && <NotificationBell />}
          <AuthButton />
        </div>
      </div>
    </header>
  );
} 