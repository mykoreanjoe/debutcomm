import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lock, MessageCircle, FileText, Star } from 'lucide-react';
import { getBoards, getPosts } from './actions';
import BoardTabs from './BoardTabs';
import HallOfFame from './HallOfFame';
import PostList from './PostList';
import PaginationControls from './PaginationControls';
import { PostListSkeleton } from './PostListSkeleton';

export const revalidate = 60; // 60초마다 페이지를 재검증

export type Post = {
  id: number;
  title: string;
  view_count: number;
  created_at: string;
  user_profile: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
  comments: { count: number }[];
  likes: { count: number }[];
};

type CommunityPageProps = {
  searchParams: {
    page?: string;
    board?: string;
  };
};

const POSTS_PER_PAGE = 10;

// 메인 페이지 컴포넌트
export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!user) {
    return redirect('/login?message=커뮤니티를 이용하려면 로그인이 필요합니다.');
  }

  const { data: userProfile } = await supabase
    .from('user_profile')
    .select('points')
    .eq('id', user.id)
    .single();

  const boardSlug = searchParams.board;
  const page = Number(searchParams.page) || 1;
  
  const boards = await getBoards();
  const isDataRoom = boardSlug === 'archive'; // 자료실 slug
  const canAccessDataRoom = (userProfile?.points ?? 0) >= 500;

  return (
    <div className="container mx-auto py-8">
      {/* 페이지 헤더 & 버튼 */}
      <PageHeader />

      {/* 안내 문구 */}
      <InfoBanners />

      {/* 새 글 작성 버튼 */}
      <div className="flex justify-end mb-6">
        <Button asChild>
          <Link href="/community/new">새 글 작성</Link>
        </Button>
      </div>
      
      {/* 명예의 전당 */}
      <Suspense fallback={<div className="h-48 bg-gray-100 rounded-xl animate-pulse mb-8" />}>
        <HallOfFame />
      </Suspense>
      
      {/* 게시판 탭 */}
      <BoardTabs boards={boards} currentBoardSlug={boardSlug} />

      {/* 게시글 목록 또는 접근 제한 메시지 */}
      {isDataRoom && !canAccessDataRoom ? (
        <AccessDeniedBanner userPoints={userProfile?.points ?? 0} />
      ) : (
        <Suspense fallback={<PostListSkeleton />}>
          <PostListSection page={page} boardSlug={boardSlug} />
        </Suspense>
      )}
    </div>
  );
}

// 비동기 게시글 목록 섹션
async function PostListSection({ page, boardSlug }: { page: number, boardSlug?: string }) {
  const { posts, count } = await getPosts(page, POSTS_PER_PAGE, boardSlug);
  
  return (
    <div>
      <PostList initialPosts={posts} currentPage={page} boardSlug={boardSlug} />
      <div className="mt-6 flex justify-center">
        <PaginationControls
          currentPage={page}
          totalCount={count}
          postsPerPage={POSTS_PER_PAGE}
        />
      </div>
    </div>
  );
}

// --- 하위 UI 컴포넌트들 ---

function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold">커뮤니티</h1>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <a href="https://pf.kakao.com/_xgTMxexl/chat" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            카카오톡 상담
          </a>
        </Button>
        <Button asChild>
          <Link href="/debut-day">
            <FileText className="mr-2 h-4 w-4" />
            테스트 예약
          </Link>
        </Button>
      </div>
    </div>
  );
}

function InfoBanners() {
  return (
    <>
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>게시판 이용 안내</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside text-sm space-y-1 mt-2">
            <li>서로를 존중하며 비방, 욕설, 차별적인 발언을 삼가주세요.</li>
            <li>개인정보 보호를 위해 연락처나 개인 신상을 공개하지 마세요.</li>
            <li>광고, 홍보, 도배성 게시물은 사전 통보 없이 삭제될 수 있습니다.</li>
          </ul>
        </AlertDescription>
      </Alert>
      <Alert className="mb-6 border-yellow-400 text-yellow-700">
        <Star className="h-4 w-4 text-yellow-500" />
        <AlertTitle className="text-yellow-800">데뷰 포인트 시스템 안내</AlertTitle>
        <AlertDescription className="text-yellow-700">
          <ul className="list-disc list-inside text-sm space-y-1 mt-2">
            <li><span className="font-semibold">새 글 작성:</span> 10포인트가 적립됩니다.</li>
            <li><span className="font-semibold">새 댓글 작성:</span> 1포인트가 적립됩니다.</li>
            <li><span className="font-semibold">게시글 열람:</span> 100포인트가 차감됩니다. (보유 포인트가 100 이상일 경우)</li>
            <li><span className="font-semibold">데뷰 자료실 입장:</span> 500포인트 이상 보유 시에만 입장 가능합니다.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </>
  );
}

function AccessDeniedBanner({ userPoints }: { userPoints: number }) {
  return (
    <div className="text-center p-12 bg-gray-50 rounded-lg">
      <Lock className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">접근 권한 없음</h3>
      <p className="mt-1 text-sm text-gray-500">
        데뷰 자료실은 <span className="font-semibold text-indigo-600">500포인트</span> 이상 보유한 사용자만 이용할 수 있습니다.
      </p>
      <p className="text-sm text-gray-500">
        현재 <span className="font-semibold">{userPoints}</span> 포인트를 보유하고 있습니다.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/community">다른 게시판 둘러보기</Link>
        </Button>
      </div>
    </div>
  );
} 