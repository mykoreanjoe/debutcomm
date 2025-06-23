import { createClient } from '@/lib/supabase/server';
import NewPostForm from './NewPostForm';
import { redirect } from 'next/navigation';

export const revalidate = 0;

async function getBoards() {
    const supabase = createClient();
    const { data: boards, error } = await supabase
        .from('board')
        .select('id, name')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
    return boards;
}

export default async function NewPostPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const boards = await getBoards();

    return <NewPostForm boards={boards} />;
} 