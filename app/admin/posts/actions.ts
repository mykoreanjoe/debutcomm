"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
    .update({ points })
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