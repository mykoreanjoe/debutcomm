'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { clerkClient } from '@clerk/nextjs/server';
import { PostgrestError } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabase/server';
// import { auth, clerkClient } from '@clerk/nextjs/server'; // Temporarily disabled

// ====================================================================
// Helper Functions
// ====================================================================
async function isUserAdmin(userId: string): Promise<boolean> {
    // FIXME: Bypassing Clerk client issue.
    return true; 
}

// ====================================================================
// Type Definitions
// ====================================================================
export type AuthRequest = {
    id: number;
    requester_name: string | null;
    requester_role: string;
    student_name: string | null;
    student_grade: string | null;
    parent_name: string | null;
    parent_phone: string | null;
    status: string;
    created_at: string;
};

// Type for dashboard statistics
export type AdminDashboardStats = {
    pending_auth_requests: number;
    total_students: number;
    total_classes: number;
    total_teachers: number;
    today_attendance_count: number;
    unpaid_this_month: number;
    recent_payments_week: number;
};

// Type for a single class (for filters)
export type ClassInfo = {
    id: number;
    name: string;
}

// Type for a user profile in the accounts list
export type UserProfile = {
    user_id: string;
    name: string | null;
    email: string | null;
    role: string;
    is_verified: boolean;
    created_at: string;
};

// Type for unpaid student
export type UnpaidStudent = {
    student_id: string;
    student_name: string;
    class_name: string | null;
    parent_contact: string | null;
    unpaid_for_month: string;
    amount_due: number;
};

// Types - Assuming they are defined elsewhere or we can add them if needed.
// A simpler type for when we only fetch basic user info
type SimpleUserProfile = {
  user_id: string;
  name: string | null;
  email: string | null;
}

interface Consultation {
  student_id: string;
}

// ====================================================================
// 재원생 인증 관리 (Admin Auth Request Management)
// ====================================================================

/**
 * Fetches all pending authentication requests.
 */
export async function getAuthRequests(): Promise<AuthRequest[]> {
    const { data, error } = await supabase
        .from('auth_requests')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error("Error fetching auth requests:", error.message);
        return [];
    }
    return data || [];
}

/**
 * Processes an authentication request by approving or rejecting it.
 */
export async function processAuthRequest(requestId: number, newStatus: 'approved' | 'rejected') {
    const { error } = await supabase.rpc('handle_auth_request', {
        p_request_id: requestId,
        p_new_status: newStatus
    });
    if (error) {
        return { success: false, message: '요청 처리 중 오류가 발생했습니다: ' + error.message };
    }
    revalidatePath('/admin/enrollment');
    return { success: true, message: `요청이 성공적으로 ${newStatus === 'approved' ? '승인' : '거절'}되었습니다.` };
}

// ====================================================================
// 계정 관리 (Admin Account Management)
// ====================================================================

export async function getUserProfiles() {
  const { data, error } = await supabase.from('user_profile').select('*');

  if (error) {
    console.error('Error fetching user profiles:', error);
    throw new Error('Failed to fetch user profiles.');
  }
  return data;
}

/**
 * Updates a user's role in both Clerk and the local database.
 */
export async function updateUserRole(userId: string, newRole: string) {
    // FIXME: Bypassing Clerk API call.
    const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
    if (error) {
        return { success: false, message: 'DB 역할 변경 중 오류가 발생했습니다.' };
    }
    revalidatePath('/admin/accounts');
    return { success: true, message: '사용자 역할이 성공적으로 변경되었습니다. (DB Only)' };
}

export async function deleteUser(userId: string) {
  try {
    const { error: dbError } = await supabase
      .from('user_profile')
      .delete()
      .eq('user_id', userId);

    if (dbError) {
       console.error('Error deleting user from Supabase:', dbError);
       return { success: false, message: '데이터베이스에서 사용자 프로필 삭제에 실패했습니다.' };
    }

    /*
    // TODO: Clerk 연동 오류 해결 후 주석 해제
    await clerkClient.users.deleteUser(userId);
    */
    
    revalidatePath('/admin/accounts');
    return { success: true, message: '사용자가 삭제되었습니다. (DB Only)' };
  } catch (error) {
    console.error('Error deleting user from Clerk:', error);
    return {
      success: false,
      message: '사용자 삭제에 실패했습니다. (Clerk API 오류)',
    };
  }
}

export async function createUser(
  prevState: { success: boolean; message: string; },
  formData: FormData
) {
  'use server';
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const password = formData.get('password') as string;
  
  if (!name || !email || !role) {
      return { success: false, message: '이름, 이메일, 역할은 필수입니다.' };
  }
  
  try {
      /*
      // TODO: Clerk 연동 오류 해결 후 주석 해제
      const newUser = await clerkClient.users.createUser({
          emailAddress: [email],
          firstName: name,
          password: password || undefined,
          publicMetadata: { role },
      });

      const { error: dbError } = await supabase.from('user_profile').insert({
          user_id: newUser.id,
          name: name,
          email: email,
          role: role,
      });
      
      if (dbError) {
          await clerkClient.users.deleteUser(newUser.id);
          throw new Error('Supabase user profile creation failed after Clerk user was created.');
      }
      */
      
      // 임시 로직: Supabase에만 추가 (Clerk 연동 전 테스트용)
      // 실제 운영에서는 사용하면 안됨!
      console.warn("Clerk 연동이 비활성화되어 Supabase에만 사용자를 추가합니다. 실제 인증은 동작하지 않습니다.");
      const { data, error: dbError } = await supabase.from('user_profile').insert({
          user_id: crypto.randomUUID(), // 임시 UUID
          name: name,
          email: email,
          role: role,
      }).select().single();
       if (dbError) throw dbError;


      revalidatePath('/admin/accounts');
      return { success: true, message: '신규 사용자가 성공적으로 생성되었습니다. (DB Only)' };

  } catch (error: any) {
      console.error('Error creating user:', error);
      const errorMessage = error.errors?.[0]?.longMessage || error.message || '알 수 없는 오류가 발생했습니다.';
      return { success: false, message: `사용자 생성 실패: ${errorMessage}` };
  }
}

// =================================================================
// Dashboard Actions
// =================================================================

export async function getAdminDashboardStats() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.rpc('get_admin_dashboard_stats');

  if (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return null;
  }
  return data;
}

export async function getConsultationStats(month?: string) {
    const supabase = createSupabaseServerClient();
    const params = month ? { p_month: month } : {};
    const { data, error } = await supabase.rpc('get_consultation_stats_by_month', params);

    if (error) {
        console.error('Error fetching consultation stats:', error);
        return null;
    }
    return data;
}

export async function getUnconsultedStudents(month?: string): Promise<SimpleUserProfile[]> {
    const supabase = createSupabaseServerClient();
    
    const { data: students, error: studentError } = await supabase
        .from('user_profiles')
        .select('user_id, name, email')
        .eq('role', 'student')
        .eq('is_verified', true);

    if (studentError) {
        console.error('Error fetching students:', studentError);
        return [];
    }

    const targetMonth = month ? new Date(month) : new Date();
    const firstDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1).toISOString();
    const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).toISOString();

    const { data: consulted, error: consultedError } = await supabase
        .from('consultations')
        .select('student_id')
        .gte('consultation_date', firstDay)
        .lte('consultation_date', lastDay);

    if (consultedError) {
        console.error('Error fetching consultations:', consultedError);
        return [];
    }

    if (!consulted) return (students as SimpleUserProfile[]) || [];

    const consultedIds = new Set(consulted.map((c: Consultation) => c.student_id));
    const unconsultedStudents = (students || []).filter((s: SimpleUserProfile) => !consultedIds.has(s.user_id));

    return unconsultedStudents;
}

/**
 * Fetches a list of unpaid students for a given month by calling an RPC function.
 */
export async function getUnpaidStudentsList(
    month?: string,
    classId?: number
): Promise<UnpaidStudent[]> {
    const params: { p_month?: string, p_class_id?: number } = {};
    if (month) params.p_month = month;
    if (classId) params.p_class_id = classId;

    const { data, error } = await supabase.rpc('get_unpaid_students_list', params);
    
    if (error) {
        console.error('Error fetching unpaid students list:', error.message);
        return [];
    }
    return data || [];
}

/**
 * Fetches all classes for filter dropdowns.
 */
export async function getAllClasses(): Promise<ClassInfo[]> {
    const { data, error } = await supabase.rpc('get_all_classes');
    if (error) {
        console.error('Error fetching all classes:', error.message);
        return [];
    }
    return data || [];
}

/**
 * "Sends" payment reminder notifications by creating records in the notifications table.
 * In a real app, this would trigger an external service like KakaoTalk.
 */
export async function sendPaymentReminderNotifications(students: UnpaidStudent[]) {
    // Admin check is implicitly handled by page access & RPC functions
    if (!students || students.length === 0) {
        return { success: false, message: '알림을 보낼 학생이 없습니다.' };
    }
    const notificationsToInsert = students.map(student => ({
        recipient_id: student.student_id,
        content: `[데뷰에듀] ${student.unpaid_for_month.substring(0, 7)}월 수강료 미납 안내`,
        type: 'payment_reminder'
    }));
    const { error } = await supabase.from('notifications').insert(notificationsToInsert);
    if (error) {
        return { success: false, message: '알림 생성에 실패했습니다.' };
    }
    revalidatePath('/admin');
    return { success: true, message: `${students.length}명에게 알림을 전송했습니다.` };
}

/**
 * Fetches all user profiles from the database.
 */
export async function getAllUserProfiles(): Promise<UserProfile[]> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('user_id, name, email, role, is_verified, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user profiles:', error.message);
        return [];
    }
    return data || [];
}

/**
 * Deletes a user from Clerk, which will cascade to the local database.
 */
export async function deleteUserAccount(userId: string) {
    // FIXME: Bypassing Clerk API call. Deleting from our DB directly.
    const { error } = await supabase.from('user_profiles').delete().eq('user_id', userId);
    if (error) {
        return { success: false, message: 'DB 사용자 삭제 중 오류가 발생했습니다.' };
    }
    revalidatePath('/admin/accounts');
    return { success: true, message: '사용자가 성공적으로 삭제되었습니다. (DB Only)' };
} 