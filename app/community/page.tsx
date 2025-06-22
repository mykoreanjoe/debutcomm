import Link from 'next/link';
import { createClerkSupabaseClient } from '@/lib/supabase/server';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart, Users } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import BoardTabs from './BoardTabs';

export const revalidate = 0;

// Supabase 'posts' 테이블과 RPC 반환값에 맞춘 타입 정의
export type Post = {
  id: number;
  created_at: string;
  title: string;
  user_id: string;
  nickname: string;
  like_count: number;
  comment_count: number;
  board_name: string;
};

type Board = {
    id: number;
    name: string;
};

const POSTS_PER_PAGE = 10;

type CommunityPageProps = {
  searchParams: {
    page?: string;
    boardId?: string;
  };
};

async function getData(page: number, pageSize: number, boardId: number | null) {
  // Create an authenticated Supabase client for the server
  const supabase = await createClerkSupabaseClient();

  const { data: posts, error: postsError } = await supabase.rpc('get_posts_with_likes_and_pagination', {
    p_page_number: page,
    p_page_size: pageSize,
    p_board_id: boardId,
  });

  const { data: totalCount, error: countError } = await supabase.rpc('get_total_posts_count', {
      p_board_id: boardId,
  });
  
  const { data: boards, error: boardsError } = await supabase
    .from('boards')
    .select('id, name')
    .order('created_at', { ascending: true });

  if (postsError) console.error('[ Server ] Error fetching paginated posts:', postsError);
  if (countError) console.error('[ Server ] Error fetching total posts count:', countError);
  if (boardsError) console.error('[ Server ] Error fetching boards:', boardsError);
  
  return {
    posts: (posts as Post[]) || [],
    totalCount: totalCount || 0,
    boards: (boards as Board[]) || [],
  };
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const currentBoardId = searchParams.boardId ? parseInt(searchParams.boardId, 10) : null;
  
  const { posts, totalCount, boards } = await getData(currentPage, POSTS_PER_PAGE, currentBoardId);
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (searchParams.boardId) {
      params.set('boardId', searchParams.boardId);
    }
    params.set('page', pageNumber.toString());
    return `/community?${params.toString()}`;
  };

  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection>
                <SectionTitle
                    icon={Users}
                    title="같이완성 커뮤니티"
                    subtitle="학습 정보 공유, 질문과 답변 등 자유롭게 소통하며 함께 성장하는 공간입니다."
                />
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-md border border-gray-100 max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">전체 글</h2>
                        <Button asChild>
                            <Link href="/community/new">글쓰기</Link>
                        </Button>
                    </div>

                    <BoardTabs boards={boards} currentBoardId={currentBoardId} />

                    <div className="rounded-lg border mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px] text-center hidden sm:table-cell">번호</TableHead>
                                    <TableHead className="w-[120px] text-center">게시판</TableHead>
                                    <TableHead>제목</TableHead>
                                    <TableHead className="w-[150px] text-center hidden md:table-cell">작성자</TableHead>
                                    <TableHead className="w-[150px] text-center hidden lg:table-cell">작성일</TableHead>
                                    <TableHead className="w-[100px] text-center">
                                        <div className="flex items-center justify-center">
                                            <Heart className="h-4 w-4 mr-1" />
                                            <span className="hidden sm:inline">좋아요</span>
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.length > 0 ? (
                                    posts.map((post, index) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="text-center hidden sm:table-cell">{totalCount - (currentPage - 1) * POSTS_PER_PAGE - index}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">{post.board_name}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/community/${post.id}`} className="hover:underline">
                                                    {post.title}
                                                </Link>
                                                <div className="text-xs text-gray-500 md:hidden mt-1">
                                                    {post.nickname} · {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center hidden md:table-cell">{post.nickname}</TableCell>
                                            <TableCell className="text-center hidden lg:table-cell">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-center">{post.like_count}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            아직 작성된 글이 없습니다.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1} />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
} 