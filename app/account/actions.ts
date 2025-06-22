"use server";

import { supabase } from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface VerificationState {
  message: string | null;
  type: "error" | "success" | null;
}

export async function requestVerification(
  prevState: VerificationState,
  formData: FormData
): Promise<VerificationState> {
  const { userId } = await auth();
  if (!userId) {
    return { message: "로그인이 필요합니다.", type: "error" };
  }

  const studentName = formData.get("studentName") as string;

  if (!studentName) {
    return { message: "학생 이름을 입력해주세요.", type: "error" };
  }

  const { data: profile, error: fetchError } = await supabase
    .from('user_profile')
    .select('request_verified, is_verified')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error("Error fetching user profile:", fetchError);
    return { message: "프로필 조회 중 오류가 발생했습니다.", type: "error" };
  }

  if (profile.is_verified) {
      return { message: "이미 재원생 인증이 완료되었습니다.", type: "error"};
  }

  if (profile.request_verified) {
      return { message: "이미 처리 대기 중인 인증 요청이 있습니다.", type: "error"};
  }

  const { error: updateError } = await supabase
    .from("user_profile")
    .update({
      student_name: studentName,
      request_verified: true,
      requested_at: new Date().toISOString(),
      rejected_at: null,
      reject_reason: null,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating user profile for verification request:", updateError);
    return { message: "인증 요청 중 오류가 발생했습니다.", type: "error" };
  }

  revalidatePath("/account/verification");
  redirect('/account/verification');
} 