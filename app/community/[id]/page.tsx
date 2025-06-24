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
import { Metadata } from 'next';

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
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const supabase = createClient();
  const postId = Number(params.id);

  if (isNaN(postId)) {
    return {
      title: "게시글을 찾을 수 없음",
      description: "요청하신 게시글을 찾을 수 없습니다."
    }
  }

  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('id', postId)
    .single();

  if (!post) {
    return {
      title: "게시글을 찾을 수 없음",
      description: "요청하신 게시글을 찾을 수 없습니다."
    }
  }

  const plainTextContent = post.content.replace(/<[^>]*>?/gm, '').substring(0, 150);

  return {
    title: post.title,
    description: `${plainTextContent}...`,
    openGraph: {
      title: post.title,
      description: `${plainTextContent}...`,
      url: `/community/${postId}`,
      type: 'article',
    },
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

  // 게시글 열람 처리 및 데이터 병렬 조회
  const viewPromise = supabase.rpc('handle_post_view', {
    p_post_id: postId,
    p_user_id: user.id
  });

  const postPromise = supabase
    .from('posts')
    .select('*, user_profile(nickname, avatar_url), board(name, slug)')
    .eq('id', postId)
    .single();

  const likePromise = supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('post_id', postId);

  const userLikePromise = supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('post_id', postId)
    .eq('user_id', user.id);
  
  const [
    { data: viewResult, error: viewError },
    { data: post, error: postError },
    { count: likes },
    { count: userLikeCount }
  ] = await Promise.all([viewPromise, postPromise, likePromise, userLikePromise]);
  
  const user_has_liked = (userLikeCount ?? 0) > 0;

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

  if (postError || !post) {
    notFound();
  }
  
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
          <LikeButton postId={post.id} initialLikes={likes ?? 0} initialLiked={user_has_liked} />
        </div>
      </article>

      <hr className="my-8" />
      
      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentSection postId={post.id} userId={user.id} />
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