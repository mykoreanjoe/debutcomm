import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import CommentForm from './CommentForm'; // 댓글 폼 (클라이언트 컴포넌트)
import { auth } from '@clerk/nextjs/server';
import LikeButton from './LikeButton'; // 좋아요 버튼 컴포넌트
import PostActionButtons from './PostActionButtons'; // 게시글 수정/삭제 버튼 컴포넌트
import { Button } from '@/components/ui/button';
import CommentItem from './CommentItem'; // 새로 만든 댓글 아이템 컴포넌트
import PostContentView from '@/components/community/PostContentView'; // 새로 추가

type PostPageProps = {
  params: {
    id: string;
  };
};

// Supabase RPC 'get_posts_with_likes'의 반환 타입과 일치시킴
type PostWithLikes = {
  id: number;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  nickname: string;
  likes_count: number;
  user_has_liked: boolean;
  board_name: string;
};

type Comment = {
    id: number;
    created_at: string;
    content: string;
    nickname: string;
    user_id: string;
};

async function getPost(id: number, userId: string | null): Promise<PostWithLikes | null> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            id,
            created_at,
            title,
            content,
            user_id,
            nickname,
            boards ( name ),
            likes ( count )
        `)
        .eq('id', id)
        .single();
    
    if (error || !data) {
        console.error('Error fetching post:', error);
        return null;
    }
    
    let user_has_liked = false;
    if (userId) {
        const { data: likeData, error: likeError } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', id)
            .eq('user_id', userId)
            .single();
        if (likeError && likeError.code !== 'PGRST116') {
            console.error('Error checking like:', likeError);
        }
        if (likeData) {
            user_has_liked = true;
        }
    }

    const postData = data as any;
    const likes_count = postData.likes?.[0]?.count ?? 0;
    const board_name = postData.boards?.name ?? '미분류';

    return { ...postData, content: postData.content || '', likes_count, user_has_liked, board_name };
}

async function getComments(postId: number): Promise<Comment[]> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
    return data;
}

export default async function PostPage({ params }: PostPageProps) {
  const { userId } = await auth();
  const postId = parseInt(params.id, 10);
  const post = await getPost(postId, userId);
  const comments = await getComments(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{post.board_name}</Badge>
            {userId && (
              <PostActionButtons postId={post.id} authorId={post.user_id} currentUserId={userId} />
            )}
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">{post.title}</CardTitle>
          <CardDescription className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {/* <AvatarImage src="/path-to-avatar.png" /> */}
                <AvatarFallback>{post.nickname.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.nickname}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleString()}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <PostContentView htmlContent={post.content} />
        </CardContent>
        <CardFooter className="flex items-center gap-4 border-t pt-4">
            <LikeButton 
                postId={post.id} 
                initialLikes={post.likes_count} 
                initialHasLiked={post.user_has_liked} 
            />
            <div className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
                <span>{comments.length}</span>
            </div>
        </CardFooter>
      </Card>
      
      {/* 댓글 목록 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">댓글 ({comments.length})</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      
      {/* 댓글 작성 폼 */}
      <CommentForm postId={postId} />
    </div>
  );
} 