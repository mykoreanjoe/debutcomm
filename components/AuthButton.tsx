"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { logout } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
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
  nickname: string | null;
  avatar_url: string | null;
  points: number | null;
};

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // 컴포넌트 마운트 시 초기 사용자 정보 가져오기
    const fetchInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    
    fetchInitialUser();

    // 인증 상태 변경 감지 리스너
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const supabase = createClient();
        const { data: profileData } = await supabase
          .from('user_profile') // Corrected table name
          .select('nickname, avatar_url, points')
          .eq('id', user.id)
          .single();
        setProfile(profileData);
      } else {
        setProfile(null); // 사용자가 없으면 프로필도 null로 설정
      }
    };
    
    fetchProfile();
  }, [user]); // user 상태가 변경될 때마다 프로필을 다시 가져옴

  if (isLoading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />;
  }
  
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