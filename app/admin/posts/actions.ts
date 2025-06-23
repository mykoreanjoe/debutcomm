"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type PostWithAuthor = {
  id: number;
  title: string;
  created_at: string;
  points_reward: number;
  user_profile: {
    nickname: string | null;
  } | null;
};

const POSTS_PER_PAGE = 10;

export async function getPosts(page: number = 1): Promise<{ posts: PostWithAuthor[], totalCount: number }> {
  const supabase = createClient();
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      created_at,
      points_reward,
      user_profile (
        nickname
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalCount: 0 };
  }

  const formattedPosts = data?.map(post => ({
    ...post,
    user_profile: Array.isArray(post.user_profile) ? post.user_profile[0] : post.user_profile
  })) || [];

  return { posts: formattedPosts as PostWithAuthor[], totalCount: count ?? 0 };
}

export async function updatePostPoints(postId: number, points: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const { data: userProfile } = await supabase
    .from("user_profile")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userProfile?.role !== "admin") {
    return { error: "권한이 없습니다." };
  }

  const { error } = await supabase
    .from("posts")
    .update({ points_reward: points })
    .eq("id", postId);

  if (error) {
    return { error: "포인트 업데이트에 실패했습니다: " + error.message };
  }

  revalidatePath("/admin/posts");
  return { success: "포인트가 업데이트되었습니다." };
}

export async function deletePost(postId: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error("Error deleting post");
  }

  revalidatePath("/admin/posts");
  revalidatePath("/community");
  revalidatePath(`/community/[id]`, "layout");
} 