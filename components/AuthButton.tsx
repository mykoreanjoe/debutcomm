"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { logout } from '@/app/login/actions';
import type { User } from '@supabase/supabase-js';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Gem } from 'lucide-react';

type UserProfile = {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
  points: number | null;
};

interface AuthButtonProps {
    user: User | null;
    profile: UserProfile | null;
}

export default function AuthButton({ user, profile }: AuthButtonProps) {
  return user && profile ? (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative flex items-center gap-2 p-2 h-auto rounded-full hover:bg-gray-100 transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarImage src={profile.avatar_url || ''} alt={profile.nickname || 'User'} />
              <AvatarFallback>{profile.nickname?.charAt(0) || 'D'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="font-semibold text-sm">{profile.nickname || '사용자'}</span>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <Gem size={12} />
                  <span>{profile.points ?? 0}</span>
                </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>내 계정</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account" className="cursor-pointer">계정 설정</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form action={logout} className="w-full">
              <button type="submit" className="w-full text-left cursor-pointer">
                로그아웃
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild>
        <Link href="/login">로그인</Link>
      </Button>
    </div>
  );
} 