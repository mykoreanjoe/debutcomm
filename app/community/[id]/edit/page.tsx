import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { getBoards, updatePost } from '@/app/community/actions';
import NewPostForm from '@/app/community/new/NewPostForm';
import { toast } from 'sonner';

type EditPostPageProps = {
  params: { id: string };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const supabase = createClient();
  const postId = parseInt(params.id, 10);
  
  if (isNaN(postId)) {
    return notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login?message=게시글을 수정하려면 로그인이 필요합니다.');
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, user_id, board_id')
    .eq('id', postId)
    .single();

  if (error || !post) {
    return notFound();
  }

  if (user.id !== post.user_id) {
    // 권한이 없는 경우, 에러 메시지를 표시하거나 리다이렉트 할 수 있습니다.
    // 여기서는 간단히 notFound() 처리합니다. 실제 앱에서는 더 친절한 처리가 필요합니다.
    return notFound();
  }

  const boards = await getBoards();
  
  const initialState = {
    errors: {},
    success: false,
  };
  
  const updatePostWithId = updatePost.bind(null, postId);

  return (
    <NewPostForm
      boards={boards}
      formAction={updatePostWithId}
      initialState={initialState}
      initialData={{
        title: post.title,
        content: post.content,
        board_id: post.board_id,
      }}
    />
  );
} 