"use client";

import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CircleDollarSign, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import imageCompression from 'browser-image-compression';

type Profile = {
  nickname: string | null;
  student_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  points: number | null;
  // Add other profile fields as needed
};

export type UpdateProfileFormProps = {
  user: User;
  profile: Profile;
};

const initialState = {
  error: null,
  success: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "업데이트 중..." : "프로필 업데이트"}
    </Button>
  );
}

export default function UpdateProfileForm({ user, profile }: UpdateProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialState);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
      formRef.current?.reset();
      // To show the new nickname immediately, we can re-fetch or just reload.
      // For simplicity, let's just inform the user. A full reload could be an option too.
      router.refresh(); 
    }
  }, [state, router]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("먼저 이미지를 선택해주세요.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      });

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, compressedFile, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('user_profile')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
      
      if (dbError) {
        throw dbError;
      }

      toast.success("아바타가 성공적으로 변경되었습니다.");
      
      // 상태 업데이트
      setAvatarUrl(publicUrl);

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>
          프로필 사진과 닉네임, 학생 정보를 변경할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl ?? undefined} />
            <AvatarFallback>{profile?.nickname?.[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <Button asChild variant="outline">
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? '업로드 중...' : '아바타 변경'}
                </span>
              </Button>
            </Label>
            <Input 
              id="avatar-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*"
              disabled={uploading}
            />
            <p className="text-xs text-gray-500">
              새로운 프로필 사진을 업로드하세요.
            </p>
          </div>
        </div>

        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" defaultValue={user.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input id="nickname" name="nickname" type="text" defaultValue={profile.nickname ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student_name">학생 이름</Label>
            <Input id="student_name" name="student_name" type="text" defaultValue={profile.student_name ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">전화번호</Label>
            <Input id="phone_number" name="phone_number" type="tel" defaultValue={profile.phone_number ?? ''} />
          </div>
          <div className="space-y-2">
            <Label>포인트</Label>
            <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-md">
              <CircleDollarSign className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-lg">{profile?.points ?? 0}</span>
              <span>포인트</span>
            </div>
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 