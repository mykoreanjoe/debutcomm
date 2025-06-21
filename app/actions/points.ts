'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export type SearchedUser = {
  id: string;
  name: string;
  email: string;
  total_points: number;
};

export type PointActionState = {
  success: boolean;
  message: string;
};

// 이름 또는 이메일로 사용자 검색
export async function searchUsers(query: string): Promise<SearchedUser[]> {
  if (!query) {
    return [];
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, total_points')
    .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error('Error searching users:', error);
    return [];
  }

  return data;
}

/**
 * Fetches point transaction logs. Can be filtered by a specific user ID.
 * Admins can see all logs; regular users will only see their own due to RLS.
 */
export async function getPointLogs(userId?: string) {
  let query = supabase
    .from('point_logs')
    .select('*, user_profile (name, student_id)')
    .order('created_at', { ascending: false });
  
  // If a specific userId is provided, filter for it.
  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching point logs:', error);
    throw new Error('Failed to fetch point logs.');
  }

  return data;
}

/**
 * Server action for an admin to grant points to a user.
 * Calls the 'reward_points' RPC in Supabase to ensure atomicity.
 */
export async function rewardPoints(
  prevState: PointActionState,
  formData: FormData
): Promise<PointActionState> {
  const adminUser = await currentUser();
  if (adminUser?.publicMetadata?.role !== 'admin') {
    return { success: false, message: '관리자 권한이 없습니다.' };
  }

  const targetUserId = formData.get('userId') as string;
  const points = Number(formData.get('points'));
  const description = formData.get('description') as string;
  
  if (!targetUserId || !points || !description) {
    return { success: false, message: '사용자 ID, 포인트, 사유는 필수입니다.' };
  }
   if (points <= 0) {
    return { success: false, message: '포인트는 0보다 커야 합니다.' };
  }

  const { error } = await supabase.rpc('reward_points', {
    p_user_id: targetUserId,
    p_points_to_add: points,
    p_description: description,
    p_admin_id: adminUser.id,
  });

  if (error) {
    console.error('Error in reward_points RPC:', error);
    return { success: false, message: `포인트 지급 실패: ${error.message}` };
  }

  revalidatePath('/admin/points');
  return { success: true, message: `${points}포인트가 성공적으로 지급되었습니다.` };
}

/**
 * Server action for an admin to deduct points from a user.
 * Calls the 'use_points' RPC in Supabase to ensure atomicity and prevent negative balances.
 */
export async function spendPoints(
  prevState: PointActionState,
  formData: FormData
): Promise<PointActionState> {
  const adminUser = await currentUser();
  if (adminUser?.publicMetadata?.role !== 'admin') {
    return { success: false, message: '관리자 권한이 없습니다.' };
  }

  const targetUserId = formData.get('userId') as string;
  const points = Number(formData.get('points'));
  const description = formData.get('description') as string;
  
  if (!targetUserId || !points || !description) {
    return { success: false, message: '사용자 ID, 포인트, 사유는 필수입니다.' };
  }
  if (points <= 0) {
    return { success: false, message: '포인트는 0보다 커야 합니다.' };
  }

  const { error } = await supabase.rpc('use_points', {
    p_user_id: targetUserId,
    p_points_to_use: points,
    p_description: description,
    p_admin_id: adminUser.id,
  });

  if (error) {
    console.error('Error in use_points RPC:', error);
    // Pass the specific database error message (e.g., "Insufficient points") to the UI
    return { success: false, message: `포인트 사용 실패: ${error.message}` };
  }

  revalidatePath('/admin/points');
  return { success: true, message: `${points}포인트가 성공적으로 사용되었습니다.` };
} 