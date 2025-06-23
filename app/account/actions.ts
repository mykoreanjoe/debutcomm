"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type FormState = {
  error: string | null;
  success: string | null;
};

export async function getProfile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("user_profile")
    .select("nickname, point")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile", error);
    return null;
  }

  return profile;
}

export async function updateProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다.", success: null };
  }

  const nickname = formData.get("nickname") as string;

  if (!nickname || nickname.length < 2) {
    return { error: "닉네임은 2글자 이상으로 입력해주세요.", success: null };
  }

  // Check for nickname uniqueness
  const { data: existingProfile, error: existingProfileError } = await supabase
    .from('user_profile')
    .select('id')
    .eq('nickname', nickname)
    .not('id', 'eq', user.id)
    .maybeSingle();

  if (existingProfileError) {
    console.error("Error checking nickname uniqueness:", existingProfileError);
    return { error: "닉네임 확인 중 오류가 발생했습니다.", success: null };
  }

  if (existingProfile) {
    return { error: "이미 사용 중인 닉네임입니다.", success: null };
  }
  
  // user_profile 테이블 업데이트 (없으면 생성, 있으면 업데이트)
  const { error: profileError } = await supabase
    .from("user_profile")
    .upsert({ id: user.id, nickname: nickname });

  if (profileError) {
    console.error("Error upserting user profile:", profileError);
    return { error: "프로필 업데이트 중 오류가 발생했습니다.", success: null };
  }

  revalidatePath("/account");
  return { success: "프로필이 성공적으로 업데이트되었습니다.", error: null };
} 