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
            <span className="font-bold">Debut</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/community">커뮤니티</Link>
            <Link href="/timetable">시간표</Link>
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