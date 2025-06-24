'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateProfileAndSendWelcome } from "./actions";
import { useState } from 'react';

interface AdditionalInfoFormProps {
  email: string | undefined;
  initialNickname: string;
}

const initialState = {
  success: false,
  message: "",
};

export default function AdditionalInfoForm({ email, initialNickname }: AdditionalInfoFormProps) {
  const [state, formAction] = useActionState(updateProfileAndSendWelcome, initialState);
  const [nickname, setNickname] = useState(initialNickname);
  const router = useRouter();

  const avatarUrl = `https://source.boringavatars.com/beam/120/${nickname || 'default'}`;
  
  useEffect(() => {
    if (state.success) {
      toast.success("축하합니다. 100포인트가 지급 되었습니다!");
      // 토스트가 보일 시간을 준 후 리디렉션
      setTimeout(() => {
        router.push('/community');
      }, 1000); 
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col items-center gap-4 mb-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl} alt="Avatar" />
          <AvatarFallback>{nickname?.[0] || 'D'}</AvatarFallback>
        </Avatar>
        <p className="text-sm text-gray-500">닉네임에 따라 프로필이 자동 생성돼요!</p>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          value={email}
          disabled
          className="bg-gray-100"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone_number">전화번호</Label>
        <Input
          type="tel"
          id="phone_number"
          name="phone_number"
          placeholder="'-' 없이 숫자만 입력"
          required
        />
      </div>

      <div className="items-top flex space-x-2 mt-4">
        <Checkbox id="terms" name="terms" required />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            약관 동의
          </label>
          <p className="text-sm text-muted-foreground">
            <Link href="/terms-of-service" className="underline">
              이용약관
            </Link>
            과{" "}
            <Link href="/privacy-policy" className="underline">
              개인정보 처리방침
            </Link>
            에 동의합니다.
          </p>
        </div>
      </div>
      
      {/* 
        이제 state.message를 직접 표시하는 대신 toast를 사용하므로
        이 부분은 필요 없지만, 디버깅을 위해 남겨두거나 삭제할 수 있습니다.
        <p className="text-red-500 text-sm mt-2">{!state.success && state.message}</p>
      */}

      <Button type="submit" className="w-full mt-4">
        가입 완료 및 서비스 시작하기
      </Button>
    </form>
  );
} 