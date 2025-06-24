"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

// 사용자의 관리자 상태를 업데이트하는 서버 액션
export async function updateUserAdminStatus(userId: string, isAdmin: boolean) {
  const supabase = createClient();

  // 1. 현재 요청을 보낸 사용자가 관리자인지 확인 (보안 강화)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const { data: adminProfile } = await supabase
    .from('user_profile')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!adminProfile?.is_admin) {
    throw new Error('권한이 없습니다.');
  }

  // 2. 대상 사용자의 is_admin 값을 업데이트
  const { error } = await supabase
    .from('user_profile')
    .update({ is_admin: isAdmin })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user admin status:', error);
    return { success: false, message: '상태 업데이트 중 오류가 발생했습니다.' };
  }

  // 3. 관리자 페이지 캐시를 무효화하여 변경사항을 바로 반영
  revalidatePath('/admin');

  return { success: true };
}

export type ManagePointsState = {
  success: boolean;
  message?: string | null;
  errors?: {
    userId?: string[];
    amount?: string[];
    reason?: string[];
  } | null;
}

const managePointsSchema = z.object({
  userId: z.string().uuid("잘못된 사용자 ID입니다."),
  amount: z.coerce.number().int("포인트는 정수여야 합니다."),
  reason: z.string().min(5, "사유를 5자 이상 입력해주세요.").max(100, "사유는 100자를 넘을 수 없습니다."),
});

export async function manageUserPoints(prevState: ManagePointsState, formData: FormData): Promise<ManagePointsState> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: '인증되지 않은 요청입니다.' };
  }
  
  // DB 함수를 호출하여 사용자 역할 확인
  const { data: roleName, error: roleRpcError } = await supabase
    .rpc('get_user_role', { p_user_id: user.id });

  if (roleRpcError || roleName !== 'admin') {
     return { success: false, message: '이 작업을 수행할 권한이 없습니다.' };
  }

  const validatedFields = managePointsSchema.safeParse({
    userId: formData.get('userId'),
    amount: formData.get('amount'),
    reason: formData.get('reason'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "입력값이 올바르지 않습니다."
    };
  }

  const { userId, amount, reason } = validatedFields.data;

  const { error: rpcError } = await supabase.rpc('change_user_points', {
    p_user_id: userId,
    p_amount: amount,
    p_reason: `[관리자] ${reason}`,
  });

  if (rpcError) {
    console.error("Error calling change_user_points RPC:", rpcError);
    return { success: false, message: '포인트 조정 중 오류가 발생했습니다.' };
  }
  
  revalidatePath('/admin');
  revalidatePath('/account');

  return { success: true, message: `사용자의 포인트를 ${amount}점 조정했습니다.` };
}

export async function getDashboardStats() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_dashboard_stats');

  if (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      total_users: 0,
      today_users_count: 0,
      today_posts_count: 0,
      today_comments_count: 0,
    };
  }

  // rpc는 배열 안의 객체로 반환하므로, 첫 번째 아이템을 사용합니다.
  return data[0] || {
    total_users: 0,
    today_users_count: 0,
    today_posts_count: 0,
    today_comments_count: 0,
  };
}

export type DailyStat = {
  day: string;
  new_users: number;
  new_posts: number;
  new_comments: number;
};

export async function getDailyStatsForChart(): Promise<DailyStat[]> {
  "use server";
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_daily_stats');

  if (error) {
    console.error("Error fetching daily stats:", error);
    return [];
  }

  // 날짜 형식을 'YYYY-MM-DD'에서 'MM-DD'로 변경
  return data.map((stat: { day: string | number | Date; }) => ({
    ...stat,
    day: new Date(stat.day).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }).replace(/\./g, '').replace(/ /g, '-')
  }));
}

// --- Type Definitions ---
export type UserProfileWithRole = {
  id: string;
  nickname: string | null;
  points: number;
  created_at: string;
  is_suspended: boolean;
  user_roles: {
    role_id: number;
    roles: {
      name: string;
    } | null;
  } | null;
};

export type Role = {
  id: number;
  name: string;
};

export async function getUsers(page: number, limit: number): Promise<{ users: UserProfileWithRole[], totalCount: number }> {
    const supabase = createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Supabase RPC나 view를 사용하면 더 간단해질 수 있지만, 일단 쿼리로 해결합니다.
    const { data, error, count } = await supabase
        .from('user_profile')
        .select(`
            id, nickname, points, created_at, is_suspended,
            user_roles (
                role_id,
                roles ( name )
            )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching users with roles:', error);
        return { users: [], totalCount: 0 };
    }
    
    const formattedUsers: UserProfileWithRole[] = data.map(user => {
        const userRole = Array.isArray(user.user_roles) && user.user_roles.length > 0 ? user.user_roles[0] : null;
        const role = userRole && userRole.roles && !Array.isArray(userRole.roles) ? userRole.roles : null;

        return {
            id: user.id,
            nickname: user.nickname,
            points: user.points,
            created_at: user.created_at,
            is_suspended: user.is_suspended,
            user_roles: userRole ? {
                role_id: userRole.role_id,
                roles: role
            } : null,
        };
    });

    return { users: formattedUsers, totalCount: count ?? 0 };
}

export async function getRoles(): Promise<Role[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('roles').select('id, name');
    if (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
    return data || [];
}

export async function updateUserRole(userId: string, roleId: number | null) {
    const supabase = createClient();
    const { error } = await supabase.from('user_roles').upsert({
        user_id: userId,
        role_id: roleId,
    });

    if (error) {
        console.error('Error updating user role:', error);
        return { error: '역할 변경에 실패했습니다.' };
    }

    revalidatePath('/admin');
    return { success: true };
}

function sanitize(dirty: string) {
  // Tiptap 에디터에서 사용하는 태그들을 허용하도록 설정할 수 있습니다.
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe', 'p', 'strong', 'em', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3' ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'img': ['src', 'alt', 'width', 'height'],
      'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
      'a': ['href', 'target'],
    },
  });
}

// 대시보드용 공지사항 타입
export type AnnouncementForAdminPage = {
  id: number;
  title: string;
  created_at: string;
};

const announcementSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export async function createAnnouncement(prevState: any, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: '인증되지 않은 사용자입니다.' };
  }

  // 관리자 여부 확인
  const { data: profile } = await supabase
    .from('user_profile')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.is_admin) {
    return { success: false, message: '공지사항을 작성할 권한이 없습니다.' };
  }

  const validatedFields = announcementSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return { success: false, message: error.title?.[0] || error.content?.[0] || '입력값이 올바르지 않습니다.' };
  }

  const { title, content } = validatedFields.data;
  const sanitizedContent = sanitize(content);

  const { error } = await supabase.rpc('create_announcement_and_notify', {
    p_user_id: user.id,
    p_title: title,
    p_content: sanitizedContent,
  });

  if (error) {
    console.error('Error creating announcement:', error);
    return { success: false, message: `공지사항 생성 중 오류 발생: ${error.message}` };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/announcements');
  revalidatePath(`/community/announcements`); // 공지사항 게시판 전체 경로
  return { success: true, message: '공지사항이 성공적으로 등록되었습니다.' };
}

export async function getStatistics() {
  "use server";
  const supabase = createClient();

  const { count: total_users, error: usersError } = await supabase
    .from('user_profile')
    .select('*', { count: 'exact', head: true });

  const { count: total_posts, error: postsError } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });
    
  const { count: total_comments, error: commentsError } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true });

  if (usersError || postsError || commentsError) {
    console.error("Error fetching statistics:", { usersError, postsError, commentsError });
  }
    
  return {
    total_users: total_users ?? 0,
    total_posts: total_posts ?? 0,
    total_comments: total_comments ?? 0,
  };
}

export async function getAnnouncements(page = 1, limit = 10) {
  "use server";
  const supabase = createClient();
  const start = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("announcements")
    .select("id, title, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, start + limit - 1);

  if (error) {
    console.error("Error fetching announcements:", error);
    return { announcements: [], count: 0 };
  }
  return { announcements: data as AnnouncementForAdminPage[], count: count ?? 0 };
}

export async function deleteAnnouncement(postId: string) {
  'use server';
  
  const supabase = createClient();
  
  // 보안: 현재 사용자가 관리자인지 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증되지 않았습니다.");

  const { data: profile } = await supabase
    .from('user_profile')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("삭제 권한이 없습니다.");
  }
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error('Error deleting announcement:', error);
    return { success: false, message: '공지사항 삭제 중 오류가 발생했습니다.' };
  }

  revalidatePath('/admin/announcements');
  return { success: true, message: '공지사항이 삭제되었습니다.' };
}

export async function getAnnouncementById(postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, content')
    .eq('id', postId)
    .single();

  if (error || !data) {
    console.error('Error fetching announcement by id:', error);
    return null;
  }
  return data;
}

const updateAnnouncementSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export async function updateAnnouncement(postId: string, prevState: any, formData: FormData) {
  'use server';

  const supabase = createClient();
  // 보안: 관리자 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: '인증되지 않았습니다.' };
  
  const { data: profile } = await supabase.from('user_profile').select('is_admin').eq('id', user.id).single();
  if (!profile?.is_admin) return { success: false, message: '권한이 없습니다.' };

  const validatedFields = updateAnnouncementSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return { success: false, message: error.title?.[0] || error.content?.[0] || '입력값이 올바르지 않습니다.' };
  }

  const { title, content } = validatedFields.data;
  const sanitizedContent = sanitize(content);

  const { error } = await supabase
    .from('posts')
    .update({
      title: title,
      content: sanitizedContent,
    })
    .eq('id', postId);

  if (error) {
    console.error('Error updating announcement:', error);
    return { success: false, message: '공지사항 수정 중 오류가 발생했습니다.' };
  }

  revalidatePath('/admin/announcements');
  revalidatePath(`/community/${postId}`);
  return { success: true, message: '공지사항이 성공적으로 수정되었습니다.' };
}

export async function toggleUserSuspension(userId: string, currentStatus: boolean) {
  'use server';

  const supabase = createClient();
  
  // 보안: 현재 사용자가 관리자인지 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증되지 않았습니다.");

  const { data: profile } = await supabase
    .from('user_profile')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("권한이 없습니다.");
  }

  // 자기 자신은 정지할 수 없음
  if (user.id === userId) {
    return { success: false, message: '자기 자신을 정지할 수 없습니다.' };
  }
  
  const { error } = await supabase
    .from('user_profile')
    .update({ is_suspended: !currentStatus })
    .eq('id', userId);

  if (error) {
    console.error('Error toggling user suspension:', error);
    return { success: false, message: '사용자 상태 변경 중 오류가 발생했습니다.' };
  }

  revalidatePath('/admin');
  return { success: true, message: `사용자 상태가 성공적으로 변경되었습니다.` };
}

// --- 콘텐츠 관리 액션 ---

export type PostForAdmin = {
  id: number;
  title: string;
  created_at: string;
  user_profile: { nickname: string | null };
  board: { name: string };
};

export async function getPostsForAdmin(page: number, limit: number): Promise<{ posts: PostForAdmin[], totalCount: number }> {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      created_at,
      user_profile!inner ( nickname ),
      board!inner ( name )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching posts for admin:', error);
    return { posts: [], totalCount: 0 };
  }

  const posts = data as any[] as PostForAdmin[];

  return { posts, totalCount: count ?? 0 };
}

export async function deletePostByAdmin(postId: number) {
  'use server';

  const supabase = createClient();
  
  // 보안: 관리자 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증되지 않았습니다.");
  
  const { data: profile } = await supabase.from('user_profile').select('is_admin').eq('id', user.id).single();
  if (!profile?.is_admin) throw new Error("삭제 권한이 없습니다.");

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    console.error('Error deleting post by admin:', error);
    return { success: false, message: '게시물 삭제 중 오류가 발생했습니다.' };
  }

  revalidatePath('/admin/content/posts');
  return { success: true, message: '게시물이 삭제되었습니다.' };
}

export type CommentForAdmin = {
  id: number;
  content: string;
  created_at: string;
  user_profile: { nickname: string | null };
  posts: { id: number; title: string | null; };
};

export async function getCommentsForAdmin(page: number, limit: number): Promise<{ comments: CommentForAdmin[], totalCount: number }> {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      user_profile!inner ( nickname ),
      posts!inner ( id, title )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching comments for admin:', error);
    return { comments: [], totalCount: 0 };
  }

  const comments = data as any[] as CommentForAdmin[];

  return { comments, totalCount: count ?? 0 };
}

export async function deleteCommentByAdmin(commentId: number) {
  'use server';

  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("인증되지 않았습니다.");
  
  const { data: profile } = await supabase.from('user_profile').select('is_admin').eq('id', user.id).single();
  if (!profile?.is_admin) throw new Error("삭제 권한이 없습니다.");

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment by admin:', error);
    return { success: false, message: '댓글 삭제 중 오류가 발생했습니다.' };
  }

  revalidatePath('/admin/content/comments');
  return { success: true, message: '댓글이 삭제되었습니다.' };
}