import { createClient } from '@/lib/supabase/server';
import NewPostForm from './NewPostForm';
import { redirect } from 'next/navigation';

export const revalidate = 0;

type Board = {
  id: number;
  name: string;
  slug: string;
};

async function getBoards(isAdmin: boolean): Promise<Board[]> {
    const supabase = createClient();
    let query = supabase
        .from('board')
        .select('id, name, slug');

    // 관리자가 아니라면 '데뷰 자료실'과 '공지사항'을 제외
    if (!isAdmin) {
      query = query.not('slug', 'in', '("archive", "notice")');
    }
    
    const { data: boards, error } = await query.order('created_at', { ascending: true });

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
        redirect('/login?message=글을 작성하려면 로그인이 필요합니다.');
    }

    const { data: userProfile } = await supabase
      .from('user_profile')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    const isAdmin = userProfile?.is_admin ?? false;

    const boards = await getBoards(isAdmin);

    return <NewPostForm boards={boards} />;
} 