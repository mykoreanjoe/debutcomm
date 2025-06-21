'use server';

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Checks if a user profile exists in Supabase for the current Clerk user.
 * If not, it creates one. This ensures that every user interacting with the
 * database-dependent parts of the application has a profile.
 */
export async function syncUserToSupabase() {
  const user = await currentUser();
  if (!user) return;

  const { data: profile, error } = await supabase
    .from('user_profile')
    .select('user_id')
    .eq('user_id', user.id)
    .single();
  
  // 'PGRST116' means no rows were found, which is expected for new users.
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user profile in syncUser:', error);
    return;
  }

  // If profile does not exist, create it.
  if (!profile) {
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      console.error('User does not have a primary email address for profile creation.');
      return;
    }
    
    // Default role is 'student' if not specified in Clerk metadata
    const role = (user.publicMetadata.role as string) || 'student';

    const { error: insertError } = await supabase.from('user_profile').insert({
      user_id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || email,
      email: email,
      role: role,
    });

    if (insertError) {
      console.error('Error inserting new user profile to Supabase:', insertError);
    }
  }
}

/**
 * Called from the /role-selection page after initial sign-up.
 * Updates the user's role in both Clerk's metadata and the Supabase user_profile.
 */
export async function updateUserRoleOnboarding(role: 'student' | 'parent') {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "로그인된 사용자를 찾을 수 없습니다." };
  }

  try {
    // Update Clerk metadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { role },
    });

    // Update Supabase profile
    const { error: supabaseError } = await supabase
      .from('user_profile')
      .update({ role })
      .eq('user_id', user.id);

    if (supabaseError) throw supabaseError;
    
    revalidatePath('/community'); // Revalidate pages that might depend on the role
    return { success: true, message: '역할이 성공적으로 업데이트되었습니다.' };

  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "역할 업데이트에 실패했습니다." };
  }
}

export type UserProfile = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  student_id: string | null;
  is_verified: boolean;
  points: number;
  image_url?: string;
  has_seen_welcome?: boolean;
};

/**
 * Searches for users by name or email.
 * Useful for admin panels.
 */
export async function searchUsers(searchTerm: string) {
  if (!searchTerm) return [];
  
  const { data, error } = await supabase
    .from('user_profile')
    .select('user_id, name, email')
    .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
    .limit(10);

  if (error) {
    console.error('Error searching users:', error);
    return [];
  }
  return data;
}

/**
 * Submits a new enrollment verification request.
 * Used on the /debutin page.
 */
export async function requestEnrollment(prevState: {success: boolean, message: string}, formData: FormData) {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  const studentName = formData.get('studentName') as string;
  const studentId = formData.get('studentId') as string;
  const school = formData.get('school') as string;

  if (!studentName || !studentId || !school) {
    return { success: false, message: '모든 필드를 입력해주세요.' };
  }
  
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
     return { success: false, message: '사용자 이메일을 찾을 수 없습니다.' };
  }

  const { error } = await supabase.from('auth_requests').insert({
    user_id: user.id,
    user_name: user.firstName || user.username || '',
    user_email: email,
    student_name: studentName,
    student_id: studentId,
    school: school,
    status: 'pending',
  });

  if (error) {
    console.error('Error creating enrollment request:', error);
    return { success: false, message: '인증 요청에 실패했습니다. 이미 요청을 제출했거나 서버에 문제가 발생했습니다.' };
  }

  revalidatePath('/debutin');
  return { success: true, message: '인증 요청이 성공적으로 제출되었습니다.' };
}

/**
 * Fetches all necessary data for a user's profile page.
 */
export async function getUserProfile(userId: string) {
    if (!userId) return null;

    const supabase = createSupabaseServerClient();

    // 1. Fetch user profile details
    const { data: profile, error: profileError } = await supabase
        .from('user_profile')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (profileError) {
        console.error(`Error fetching profile for user ${userId}:`, profileError);
        return null;
    }

    // 2. Fetch user's posts
    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
            id, title, created_at,
            categories ( name ),
            comments ( count )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20); // Get latest 20 posts

    if (postsError) {
        console.error(`Error fetching posts for user ${userId}:`, postsError);
    }
    
    // 3. Fetch user's comments
    const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select(`
            id, content, created_at,
            posts ( id, title )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20); // Get latest 20 comments

    if (commentsError) {
        console.error(`Error fetching comments for user ${userId}:`, commentsError);
    }

    return {
        profile,
        posts: posts || [],
        comments: comments || [],
    };
}

/**
 * Checks if the current user has seen the welcome message.
 */
export async function checkWelcomeStatus(): Promise<{ has_seen: boolean }> {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();

    if (!user) return { has_seen: true }; // Not logged in, so don't show.

    const { data, error } = await supabase
        .from('user_profile')
        .select('has_seen_welcome')
        .eq('user_id', user.id)
        .single();
    
    if (error || !data) {
        // If profile doesn't exist or error, assume they've seen it to prevent issues.
        return { has_seen: true };
    }

    return { has_seen: data.has_seen_welcome ?? true };
}

/**
 * Marks the welcome message as seen for the current user.
 */
export async function markWelcomeAsSeen() {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();

    if (!user) return;

    await supabase
        .from('user_profile')
        .update({ has_seen_welcome: true })
        .eq('user_id', user.id);
}

/**
 * Gets the current logged-in user's points from the database.
 */
export async function getCurrentUserPoints(): Promise<number> {
    const user = await currentUser();
    if (!user) return 0;
    
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('user_profile')
        .select('points')
        .eq('user_id', user.id)
        .single();

    if (error || !data) {
        console.error('Error fetching user points:', error);
        return 0;
    }
    return data.points;
}