'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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

const sendKakaoTalkSchema = z.object({
  userIds: z.array(z.string()).min(1, "사용자를 선택해주세요."),
  message: z.string().min(1, "메시지를 입력해주세요."),
});

export async function sendKakaoTalk(prevState: unknown, formData: FormData) {
  'use server';

  const validatedFields = sendKakaoTalkSchema.safeParse({
    userIds: formData.getAll('userIds'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { userIds, message } = validatedFields.data;
  const supabase = createClient();

  try {
    const { data: users, error } = await supabase
      .from('user_profiles')
      .select('phone_number')
      .in('id', userIds)
      .not('phone_number', 'is', null);

    if (error) throw error;
    if (!users || users.length === 0) {
      return { success: false, message: '알림톡을 보낼 수 있는 사용자가 없습니다. (전화번호 등록 확인 필요)' };
    }

    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const KAKAO_CHANNEL_ID = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
    // TODO: 사용자님이 카카오 개발자 센터에서 발급받은 실제 템플릿 코드로 교체해야 합니다.
    const KAKAO_TEMPLATE_CODE = 'YOUR_TEMPLATE_CODE'; 

    if (!KAKAO_API_KEY || !KAKAO_CHANNEL_ID) {
      return { success: false, message: '카카오 API 설정이 필요합니다. (.env.local 확인)' };
    }

    const promises = users.map(user => {
      const params = new URLSearchParams();
      params.append('receiver_number', user.phone_number!);
      params.append('channel_id', KAKAO_CHANNEL_ID);
      params.append('template_code', KAKAO_TEMPLATE_CODE);
      
      const templateParams = JSON.stringify({ "content": message });
      params.append('template_params', templateParams);

      return fetch('https://kapi.kakao.com/v1/biz/message/alimtalk/send', {
        method: 'POST',
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
    });

    const results = await Promise.all(promises);

    let successCount = 0;
    results.forEach(res => {
      if (res.ok) successCount++;
    });

    if (successCount === 0) {
      return { success: false, message: '모든 메시지 발송에 실패했습니다. (API 로그 확인 필요)' };
    }

    revalidatePath('/admin');
    return { success: true, message: `${successCount}명에게 메시지를 성공적으로 발송 요청했습니다.` };

  } catch (error) {
    console.error('Error sending KakaoTalk:', error);
    return { success: false, message: '알림톡 발송 중 서버 오류가 발생했습니다.' };
  }
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

export async function getDailyStats() {
    const supabase = createClient();
    
    // KST 기준 오늘의 시작과 끝 계산 (UTC+9)
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstNow = new Date(now.getTime() + kstOffset);
    
    const todayKST = kstNow.toISOString().slice(0, 10);
    const startOfDayUTC = new Date(todayKST + 'T00:00:00+09:00').toISOString();
    const endOfDayUTC = new Date(todayKST + 'T23:59:59+09:00').toISOString();

    const { count: postsCount, error: postsError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDayUTC)
        .lte('created_at', endOfDayUTC);

    if (postsError) {
        console.error("Error fetching today's posts count:", postsError);
    }

    const { count: commentsCount, error: commentsError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDayUTC)
        .lte('created_at', endOfDayUTC);

    if (commentsError) {
        console.error("Error fetching today's comments count:", commentsError);
    }

    return {
        today_posts: postsCount ?? 0,
        today_comments: commentsCount ?? 0,
    };
}

// --- Type Definitions ---
export type UserProfileWithRole = {
  id: string;
  nickname: string | null;
  points: number;
  created_at: string;
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
            id, nickname, points, created_at,
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
    return data;
}

export async function updateUserRole(userId: string, roleId: number) {
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