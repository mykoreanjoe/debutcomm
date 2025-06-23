"use client";

import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile, getProfile } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CircleDollarSign } from "lucide-react";

interface UpdateProfileFormProps {
  user: User;
}

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

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialState);
  const [profile, setProfile] = useState<{ nickname: string | null; point: number | null } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const profileData = await getProfile();
      if (profileData) {
        setProfile(profileData);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
      router.push('/community');
    }
  }, [state, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필</CardTitle>
        <CardDescription>
          닉네임을 설정하거나 변경할 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" value={user.email ?? ''} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              name="nickname"
              defaultValue={profile?.nickname ?? ""}
              required
              key={profile?.nickname}
            />
          </div>
          <div className="space-y-2">
            <Label>포인트</Label>
            <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-md">
              <CircleDollarSign className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-lg">{profile?.point ?? 0}</span>
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