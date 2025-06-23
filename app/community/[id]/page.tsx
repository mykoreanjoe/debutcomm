import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import CommentForm from './CommentForm'; // 댓글 폼 (클라이언트 컴포넌트)
import LikeButton from './LikeButton'; // 좋아요 버튼 컴포넌트
import PostActionButtons from './PostActionButtons'; // 게시글 수정/삭제 버튼 컴포넌트
import CommentItem, { CommentWithProfile } from './CommentItem'; // 새로 만든 댓글 아이템 컴포넌트
import PostContentView from '@/components/community/PostContentView'; // 새로 추가
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type PostPageProps = {
  params: {
    id: string;
  };
};

type PostData = {
  id: number;
  title: string;
  content: string | null;
  created_at: string;
  user_id: string;
  view_count: number;
  likes: number;
  user_has_liked: boolean;
  user_profile: {
    nickname: string | null;
  } | null;
  board: {
    name: string | null;
    slug: string | null;
  } | null;
};

async function getPost(id: number, userId?: string): Promise<PostData | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      created_at,
      user_id,
      view_count,
      user_profile!inner ( nickname ),
      board!inner ( name, slug )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  
  const { count: likes } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', id);

  let user_has_liked = false;
  if (userId) {
    const { data: like } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', userId)
      .single();
    user_has_liked = !!like;
  }

  // Supabase는 !inner를 사용해도 결과를 배열로 감쌀 수 있으므로, 객체로 변환합니다.
  const postData = {
    ...data,
    user_profile: Array.isArray(data.user_profile) ? data.user_profile[0] : data.user_profile,
    board: Array.isArray(data.board) ? data.board[0] : data.board,
    likes: likes ?? 0,
    user_has_liked,
  };

  return postData as PostData;
}

async function getComments(postId: number): Promise<CommentWithProfile[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      created_at,
      content,
      user_id,
      user_profile!inner (
        nickname,
        avatar_url
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  return data.map(c => ({
    ...c,
    user_profile: Array.isArray(c.user_profile) ? c.user_profile[0] : c.user_profile
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const post = await getPost(Number(params.id), user?.id);
  
  if (!post) {
    notFound();
  }

  // TODO: Implement view count logic

  const comments = await getComments(post.id);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Link href={`/community${post.board?.slug ? `?board=${post.board.slug}` : ''}`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {post.board?.name || '전체 목록'}으로 돌아가기
      </Link>
      <article>
        <header className="mb-4 border-b pb-4">
          <p className="text-sm text-indigo-600 font-semibold">{post.board?.name || '자유게시판'}</p>
          <h1 className="text-3xl font-bold mt-1">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <span>{post.user_profile?.nickname || '익명'}</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            <span>조회수 {post.view_count}</span>
          </div>
        </header>
        
        <div className="prose max-w-none">
            <PostContentView htmlContent={post.content || ''} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <LikeButton postId={post.id} initialLikes={post.likes} initialHasLiked={post.user_has_liked} />
          {user?.id === post.user_id && (
            <PostActionButtons postId={post.id} authorId={post.user_id} currentUserId={user?.id} />
          )}
        </div>
      </article>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">댓글</h2>
        <CommentForm postId={post.id} />

        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} currentUserId={user?.id} />
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨주세요!</p>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href={`/community${post.board?.slug ? `?board=${post.board.slug}` : ''}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
} 