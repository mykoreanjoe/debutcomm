"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const profileSchema = z.object({
  nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다.").max(20, "닉네임은 20자 이하이어야 합니다."),
  phone_number: z.string().regex(/^[0-9]{10,11}$/, "유효한 전화번호를 입력해주세요."),
  terms: z.string().refine(val => val === 'on', { message: "약관에 동의해야 합니다." }),
});

export async function updateProfileAndSendWelcome(prevState: any, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요." };
  }

  const validatedFields = profileSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages).flat()[0] || "입력값이 올바르지 않습니다.";
    return { success: false, message: firstError };
  }

  const { nickname, phone_number } = validatedFields.data;

  const { error } = await supabase.rpc('handle_new_user_setup', {
    p_user_id: user.id,
    p_nickname: nickname,
    p_phone_number: phone_number,
  });

  if (error) {
    console.error('Error updating profile:', error);
    if (error.message.includes('permission denied')) {
        return { success: false, message: '데이터베이스 권한 오류가 발생했습니다. 관리자에게 문의하세요.' };
    }
    return { success: false, message: `프로필 업데이트 중 오류가 발생했습니다: ${error.message}` };
  }

  revalidatePath('/account');
  
  // redirect 대신 성공 상태를 반환합니다.
  return { success: true, message: "프로필이 성공적으로 업데이트되었습니다." };
} 