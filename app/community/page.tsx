import { Plus, Search, Star, Users, Megaphone, Flame } from 'lucide-react';
// import { getPosts, getPopularPosts } from '@/app/actions/posts'; // Temporarily disabled for UI testing
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UserSyncWrapper from '@/components/community/UserSyncWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList, { PostForList } from '@/components/community/PostList';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import WelcomeToast from '@/components/community/WelcomeToast';

// --- Dummy Data for UI Testing ---
const dummyNoticePosts: PostForList[] = [
  { id: 901, title: '[필독] 커뮤니티 이용 규칙 안내', author_id: 'user_admin', author_name: '관리자', category: '공지사항', created_at: '2024-05-28', comment_count: 2, like_count: 15, view_count: 302 },
  { id: 902, title: '여름방학 특강 개설 안내', author_id: 'user_admin', author_name: '관리자', category: '공지사항', created_at: '2024-05-25', comment_count: 5, like_count: 25, view_count: 450 },
];

const dummyPopularPosts: PostForList[] = [
    { id: 102, title: '저 이번에 토플 110점 넘었어요! 😭', author_id: 'user_1', author_name: '김데뷰', category: '자유', created_at: '2024-05-18', comment_count: 25, like_count: 58, view_count: 1024 },
    { id: 104, title: '슬럼프 극복하신 분 계신가요?', author_id: 'user_2', author_name: '박수강생', category: '자유', created_at: '2024-05-23', comment_count: 18, like_count: 45, view_count: 980 },
    { id: 105, title: '효과적인 단어 암기법 공유합니다', author_id: 'user_3', author_name: '이선생', category: 'Q&A', created_at: '2024-05-21', comment_count: 15, like_count: 32, view_count: 850 },
];

const dummyAllPosts: PostForList[] = [
    ...dummyNoticePosts,
    ...dummyPopularPosts,
    { id: 1, title: '데뷰 영어의 가장 큰 장점은 무엇일까요?', author_id: 'user_4', author_name: '열정적인 토론가', category: '일반질문', created_at: '2024-05-20', comment_count: 5, like_count: 10, view_count: 120 },
    { id: 2, title: '다들 숙제는 어떻게 하고 계신가요? 팁 공유해요!', author_id: 'user_5', author_name: '고민많은학생', category: '교육 FAQ', created_at: '2024-05-18', comment_count: 8, like_count: 15, view_count: 250 },
];

const POSTS_PER_PAGE = 10;

type CommunityPageProps = {
    searchParams: {
        category?: string;
        q?: string;
        page?: string;
    }
}

// const CommunityPage = async ({ searchParams }: CommunityPageProps) => { // Temporarily convert to client component for easier testing if needed, but static is fine.
const CommunityPage = ({ searchParams }: CommunityPageProps) => {
  const currentCategory = searchParams.category || 'all';
  const searchQuery = searchParams.q;
  const currentPage = Number(searchParams.page) || 1;

  // --- Data fetching is disabled for UI testing ---
  const noticePosts = dummyNoticePosts;
  const popularPosts = dummyPopularPosts;
  const posts = dummyAllPosts.filter(p => currentCategory === 'all' || p.category === currentCategory);
  const totalCount = posts.length;
  // ---

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/community?${params.toString()}`;
  };

  return (
    <>
      {/* <UserSyncWrapper /> */}
      <WelcomeToast />
      <div className="bg-slate-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-12">
                  <SectionTitle
                      icon={Users}
                      title="같이완성 커뮤니티"
                      subtitle="자유롭게 소통하며 함께 성장하는 공간입니다."
                      iconColor="text-teal-500"
                  />
                  <Link href="/community/new" className="mt-4 sm:mt-0">
                      <Button>
                          <Plus className="mr-2 h-4 w-4" /> 글쓰기
                      </Button>
                  </Link>
              </div>

              {/* Notice Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Megaphone className="w-6 h-6 mr-2 text-indigo-600"/> 공지사항
                </h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
                    {noticePosts.length > 0 ? noticePosts.map(post => (
                        <Link href={`/community/${post.id}`} key={post.id} className="block p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-800 truncate">{post.title}</span>
                                <span className="text-sm text-gray-500 flex-shrink-0 ml-4">{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    )) : (
                        <p className="p-4 text-center text-gray-500">등록된 공지사항이 없습니다.</p>
                    )}
                </div>
              </div>

              {/* Popular Posts Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Flame className="w-6 h-6 mr-2 text-rose-500"/> 인기글
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularPosts.map(post => (
                        <Link href={`/community/${post.id}`} key={post.id}>
                            <Card className="h-full hover:border-indigo-500 hover:shadow-lg transition-all group">
                                <CardContent className="p-6">
                                    <p className="text-sm font-semibold text-indigo-600">{post.category}</p>
                                    <h3 className="text-lg font-bold text-gray-800 truncate mt-1 mb-2 group-hover:text-indigo-700 transition-colors">{post.title}</h3>
                                    <div className="text-xs text-gray-500 flex justify-between items-center">
                                        <Link href={`/users/${post.author_id}`} className="hover:underline z-10 relative">
                                            {post.author_name}
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400"/> {post.like_count}</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
              </div>

              {/* Main Board Section */}
              <Tabs value={currentCategory} className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <TabsList>
                        <TabsTrigger value="all" asChild><Link href="/community">전체</Link></TabsTrigger>
                        <TabsTrigger value="공지사항" asChild><Link href="/community?category=공지사항">공지사항</Link></TabsTrigger>
                        <TabsTrigger value="Q&A" asChild><Link href="/community?category=Q&A">Q&A</Link></TabsTrigger>
                        <TabsTrigger value="자유" asChild><Link href="/community?category=자유">자유게시판</Link></TabsTrigger>
                        <TabsTrigger value="갤러리" asChild><Link href="/community?category=갤러리">갤러리</Link></TabsTrigger>
                    </TabsList>
                    <form action="/community" method="GET" className="relative w-full sm:w-auto sm:min-w-[250px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="게시글 검색..." name="q" defaultValue={searchQuery} className="pl-9" />
                        {currentCategory !== 'all' && <input type="hidden" name="category" value={currentCategory} />}
                    </form>
                </div>
                <PostList posts={posts} />
              </Tabs>
              <div className="mt-8">
                  <PaginationComponent 
                      totalPages={totalPages} 
                      currentPage={currentPage}
                      createPageURL={createPageURL}
                  />
              </div>
          </div>
      </div>
    </>
  );
};

function PaginationComponent({ totalPages, currentPage, createPageURL }: { totalPages: number, currentPage: number, createPageURL: (page: number) => string }) {
    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        href={createPageURL(currentPage - 1)} 
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href={createPageURL(i + 1)} isActive={currentPage === i + 1}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext 
                        href={createPageURL(currentPage + 1)} 
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default CommunityPage; 