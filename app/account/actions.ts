"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

type FormState = {
  error: string | null;
  success: string | null;
};

export type PointHistoryEntry = {
    id: number;
    created_at: string;
    reason: string;
    amount: number;
};

export async function getAuthenticatedUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getProfile(userId: string) {
    const supabase = createClient();
    const { data: profile } = await supabase
        .from('user_profile')
        .select('*')
        .eq('id', userId)
        .single();
    return profile;
}

export async function getPointHistory(): Promise<PointHistoryEntry[]> {
    const supabase = createClient();
    const user = await getAuthenticatedUser();
    if (!user) return [];

    const { data: pointHistory, error } = await supabase
        .from('point_history')
        .select('id, created_at, reason, amount')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error("Error fetching point history:", error);
        return [];
    }

    return pointHistory || [];
}

export async function getUserPosts() {
    const supabase = createClient();
    const user = await getAuthenticatedUser();
    if (!user) return [];

    const { data: userPosts, error } = await supabase
        .from('posts')
        .select('id, title, created_at, view_count')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching user posts:", error);
        return [];
    }

    return userPosts || [];
}

export async function getAccountPageData() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const profilePromise = supabase
    .from('user_profile')
    .select('*')
    .eq('id', user.id)
    .single();

  const postsPromise = supabase
    .from('posts')
    .select('id, title, created_at, board(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const commentsPromise = supabase
    .from('comments')
    .select('id, content, created_at, posts(id, title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  const pointsPromise = supabase
    .from('point_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const [
    { data: profile, error: profileError },
    { data: posts, error: postsError },
    { data: comments, error: commentsError },
    { data: points, error: pointsError }
  ] = await Promise.all([
    profilePromise,
    postsPromise,
    commentsPromise,
    pointsPromise
  ]);
  
  if (profileError || !profile) {
    // 프로필이 없는 경우 추가 정보 페이지로 리디렉션 할 수 있습니다.
    redirect('/additional-info');
  }
  
  // 다른 에러들도 콘솔에 로그하여 디버깅을 돕습니다.
  if (postsError) console.error("Error fetching posts:", postsError.message);
  if (commentsError) console.error("Error fetching comments:", commentsError.message);
  if (pointsError) console.error("Error fetching points:", pointsError.message);


  return {
    user,
    profile,
    posts: posts || [],
    comments: comments || [],
    points: points || [],
  };
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