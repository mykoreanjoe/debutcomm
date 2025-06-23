import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import LikeButton from './LikeButton';
import PostActionButtons from './PostActionButtons';
import PostContentView from '@/components/community/PostContentView';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from 'react';
import CommentSection from "./CommentSection";
import { CommentSectionSkeleton } from "./CommentSectionSkeleton";
import { SupabaseClient } from "@supabase/supabase-js";

export type CommentWithChildren = {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
  point_status: string;
  parent_id: number | null;
  nickname: string;
  avatar_url: string | null;
  children: CommentWithChildren[] | null;
};

type PostPageProps = {
  params: {
    id: string;
  };
};

async function getPostData(supabase: SupabaseClient, postId: number, userId: string) {
    const postQuery = supabase
        .from('posts')
        .select('*, user_profile(nickname, avatar_url), board(name, slug)')
        .eq('id', postId)
        .single();

    const likeQuery = supabase
        .from('likes')
        .select('*', { count: 'exact' })
        .eq('post_id', postId);

    const userLikeQuery = supabase
        .from('likes')
        .select('*', { count: 'exact' })
        .eq('post_id', postId)
        .eq('user_id', userId);

    const [postResult, likeResult, userLikeResult] = await Promise.all([postQuery, likeQuery, userLikeQuery]);

    if (postResult.error || !postResult.data) {
        return null;
    }

    return {
        post: postResult.data,
        likes: likeResult.count ?? 0,
        user_has_liked: (userLikeResult.count ?? 0) > 0,
    };
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This case should be handled by middleware, but as a fallback
    return notFound();
  }

  const postId = Number(params.id);
  if (isNaN(postId)) {
    notFound();
  }

  // 게시글 열람 처리 함수 호출
  const { data: viewResult, error: viewError } = await supabase.rpc('handle_post_view', {
    p_post_id: postId,
    p_user_id: user.id
  });

  if (viewError) {
    console.error('Error handling post view:', viewError);
    // Let's show a generic error page
  }
  
  if (viewResult === 'INSUFFICIENT_POINTS') {
    return (
      <main className="container mx-auto max-w-4xl py-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>포인트 부족</AlertTitle>
          <AlertDescription>
            <p>게시글을 열람하려면 10포인트가 필요합니다.</p>
            <p className="mt-2">활발한 커뮤니티 활동으로 포인트를 획득해주세요.</p>
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/community">
                <ArrowLeft className="w-4 h-4 mr-2" />
                커뮤니티로 돌아가기
              </Link>
            </Button>
        </div>
      </main>
    );
  }

  const postData = await getPostData(supabase, postId, user.id);

  if (!postData) {
    notFound();
  }
  
  const { post, likes, user_has_liked } = postData;

  return (
    <main className="container mx-auto max-w-4xl py-8">
      <Link href={`/community${post.board?.slug ? `?board=${post.board.slug}` : ''}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {post.board?.name || '전체 목록'}으로 돌아가기
      </Link>
      <article>
        <header className="mb-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-muted text-muted-foreground px-2 py-1 text-xs rounded-md">{post.board?.name || '기타'}</span>
            </div>
            <PostActionButtons postId={post.id} authorId={post.user_id} currentUserId={user.id} />
          </div>
          <h1 className="text-3xl font-bold mt-4 break-words">{post.title}</h1>
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <span>{post.user_profile?.nickname || '탈퇴한 사용자'}</span>
            </div>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none mt-6 min-h-[200px]">
          <PostContentView htmlContent={post.content} />
        </div>

        <div className="mt-8 flex justify-center">
          <LikeButton postId={post.id} initialLikes={likes} initialLiked={user_has_liked} />
        </div>
      </article>

      <hr className="my-8" />
      
      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentSection postId={post.id} />
      </Suspense>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href={`/community${post.board?.slug ? `?board=${post.board.slug}` : ''}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Link>
        </Button>
      </div>
    </main>
  );
} 