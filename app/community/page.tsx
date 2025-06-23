import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import PostList from './PostList';
import PaginationControls from './PaginationControls';
import BoardTabs from './BoardTabs';
import HallOfFame from './HallOfFame';

export const revalidate = 60; // 60초마다 페이지를 재검증

type CommunityPageProps = {
  searchParams: {
    page?: string;
    board?: string;
    sort?: string;
  };
};

async function getBoards() {
  const supabase = createClient();
  const { data, error } = await supabase.from('board').select('id, name, slug');
  if (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
  return data;
}


export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const page = Number(searchParams.page) || 1;
  const boardSlug = searchParams.board;
  const sortOrder = searchParams.sort || 'newest';
  
  const boards = await getBoards();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">커뮤니티</h1>
        <Button asChild>
          <Link href="/community/new">새 글 작성</Link>
        </Button>
      </div>
      
      <Suspense fallback={<div className="h-48 bg-gray-100 rounded-xl animate-pulse mb-8"></div>}>
        <HallOfFame />
      </Suspense>
      
      <BoardTabs boards={boards} currentBoardSlug={boardSlug} currentSort={sortOrder} />

      <Suspense fallback={<PostList.Skeleton />}>
        <PostList 
          currentPage={page} 
          boardSlug={boardSlug}
          sortOrder={sortOrder}
        />
      </Suspense>

      <div className="mt-6 flex justify-center">
        <PaginationControls
          currentPage={page}
          boardSlug={boardSlug}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
} 