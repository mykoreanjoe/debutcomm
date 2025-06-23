"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from '@/app/login/actions';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User as AuthUser } from '@supabase/supabase-js';
import { LogOut, User, DollarSign } from 'lucide-react';

export default function AuthButton() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('user_profile')
          .select('nickname, avatar_url, points')
          .eq('id', user.id)
          .single();
        setNickname(profile?.nickname || user.email?.split('@')[0] || 'User');
      }
      setIsLoading(false);
    };

    fetchUserAndProfile();
    
    const { data: authListener } = createClient().auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if(!session?.user){
            setNickname(null);
        } else {
            fetchUserAndProfile();
        }
    });

    return () => {
        authListener.subscription.unsubscribe();
    };

  }, []);

  if (isLoading) {
    return <div className="h-9 w-20 bg-slate-200 animate-pulse rounded-md" />;
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
           <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata.avatar_url ?? ''} alt={user.user_metadata.user_name ?? ''} />
            <AvatarFallback>{user.user_metadata.user_name?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{nickname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>포인트</span>
            </div>
            <span>{user.user_metadata.points ?? 0}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full">
            <User className="w-4 h-4 mr-2" />
            <span>계정 관리</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action={signOut} className="w-full">
            <button type="submit" className="w-full text-left flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              <span>로그아웃</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center gap-4">
      <Button asChild variant="ghost">
        <Link href="/login">로그인</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">회원가입</Link>
      </Button>
    </div>
  );
} 