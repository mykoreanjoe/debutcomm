'use server';

import { supabase } from '@/lib/supabaseClient';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export type EnrollmentStatus = {
  isVerified: boolean;
  requestStatus: 'pending' | 'approved' | 'rejected' | null;
};

// 사용자의 재원생 인증 상태 확인
export async function getUserEnrollmentStatus(): Promise<EnrollmentStatus> {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found.');
  }

  // 1. user_profile 테이블에서 is_verified 상태 확인
  const { data: profile, error: profileError } = await supabase
    .from('user_profile')
    .select('is_verified, role')
    .eq('user_id', user.id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
     console.error('Error fetching user profile for status:', profileError);
     return { isVerified: false, requestStatus: null };
  }
  
  // 프로필이 없으면 아직 동기화 전이므로 미인증 상태로 간주
  if (!profile) {
    return { isVerified: false, requestStatus: null };
  }

  if (profile.is_verified) {
    return { isVerified: true, requestStatus: 'approved' };
  }

  // 2. auth_requests 테이블에서 요청 상태 확인
  const { data: requestData, error: requestError } = await supabase
    .from('auth_requests')
    .select('status')
    .eq('user_id', user.id)
    .order('requested_at', { ascending: false }) // 최신 요청을 가져오기
    .limit(1)
    .single();

  if (requestError && requestError.code !== 'PGRST116') {
    // 요청이 없는 경우는 정상
    console.error('Error fetching auth request:', requestError);
  }
  
  return {
    isVerified: false,
    requestStatus: requestData?.status as EnrollmentStatus['requestStatus'] || null,
  };
}

export type EnrollmentFormState = {
  success: boolean;
  message: string;
};

// 재원생 인증 요청 생성
export async function requestEnrollment(
  prevState: EnrollmentFormState,
  formData: FormData
): Promise<EnrollmentFormState> {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  const studentName = formData.get('studentName') as string;
  const role = user.publicMetadata.role || 'student';

  const { error } = await supabase.from('auth_requests').insert({
    user_id: user.id,
    name: studentName,
    role: role,
    // status, requested_at 등은 기본값으로 설정됨
  });

  if (error) {
    console.error('Error creating auth request:', error);
    if (error.code === '23505') { // 고유 제약 위반일 수 있으나, auth_requests에는 없음. 로직상 중복 방지 필요 시 추가
      return { success: false, message: '이미 인증을 요청했습니다.' };
    }
    return { success: false, message: '인증 요청에 실패했습니다.' };
  }

  revalidatePath('/debutin');
  return { success: true, message: '인증 요청이 성공적으로 제출되었습니다.' };
} 