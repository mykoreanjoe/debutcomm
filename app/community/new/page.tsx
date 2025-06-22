import { supabase } from '@/lib/supabaseClient';
import NewPostForm from './NewPostForm';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const revalidate = 0;

async function getBoards() {
    const { data: boards, error } = await supabase
        .from('boards')
        .select('id, name')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
    return boards;
}

async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('user_profile')
        .select('nickname')
        .eq('id', userId)
        .single();
    
    if (error || !data) {
        console.error('Error fetching user profile:', error);
        return null;
    }
    return data;
}


export default async function NewPostPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }
    
    const userProfile = await getUserProfile(userId);
    if (!userProfile?.nickname) {
        // 닉네임이 없는 경우 추가 정보 페이지로 리디렉션
        redirect('/additional-info');
    }

    const boards = await getBoards();

    return <NewPostForm boards={boards} userProfile={userProfile} />;
} 