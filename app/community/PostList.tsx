import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Post = {
    id: number;
    created_at: string;
    title: string;
    user_profile: { 
        nickname: string | null;
        avatar_url: string | null;
    } | null;
    board: { name: string; slug: string } | null;
    likes: number;
    comments_count: number;
};

const POSTS_PER_PAGE = 10;

async function getPosts(
    page: number,
    boardSlug: string | undefined,
    sortOrder: string
): Promise<{ posts: Post[]; totalCount: number }> {
    const supabase = createClient();
    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    // 베이스 쿼리
    let query = supabase
        .from('posts_with_counts') // view 사용
        .select('*', { count: 'exact' });

    // 게시판 필터링
    if (boardSlug) {
        query = query.eq('board_slug', boardSlug);
    }

    // 정렬
    if (sortOrder === 'popular') {
        query = query.order('likes', { ascending: false });
    } else {
        query = query.order('created_at', { ascending: false });
    }
    
    // 페이지네이션
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching posts:", error);
        return { posts: [], totalCount: 0 };
    }

    // `posts_with_counts` 뷰의 타입과 Post 타입을 맞추기 위해 변환
    const posts: Post[] = data.map((p: any) => ({
        id: p.id,
        created_at: p.created_at,
        title: p.title,
        user_profile: { nickname: p.author_nickname, avatar_url: p.avatar_url },
        board: { name: p.board_name, slug: p.board_slug },
        likes: p.likes,
        comments_count: p.comments_count
    }));

    return { posts, totalCount: count || 0 };
}


interface PostListProps {
    currentPage: number;
    boardSlug: string | undefined;
    sortOrder: string;
}

export default async function PostList({ currentPage, boardSlug, sortOrder }: PostListProps) {
    const { posts, totalCount } = await getPosts(currentPage, boardSlug, sortOrder);

    return (
        <div className="rounded-lg border mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] text-center hidden sm:table-cell">번호</TableHead>
                        <TableHead className="w-[120px] text-center">게시판</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead className="w-[180px] text-center hidden md:table-cell">작성자</TableHead>
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
                                    <Badge variant="outline">{post.board?.name}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/community/${post.id}`} className="hover:underline">
                                        {post.title}
                                        {post.comments_count > 0 && <span className="ml-2 text-red-500 font-semibold">[{post.comments_count}]</span>}
                                    </Link>
                                    <div className="text-xs text-gray-500 md:hidden mt-1">
                                        {post.user_profile?.nickname || '익명'} · {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center justify-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={post.user_profile?.avatar_url || ''} alt={post.user_profile?.nickname || '익명'} />
                                            <AvatarFallback>{post.user_profile?.nickname?.charAt(0) || '익'}</AvatarFallback>
                                        </Avatar>
                                        <span>{post.user_profile?.nickname || '익명'}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center hidden lg:table-cell">
                                    {new Date(post.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-center">{post.likes}</TableCell>
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
    );
}

PostList.Skeleton = function PostListSkeleton() {
    return (
        <div className="rounded-lg border mt-4">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] text-center hidden sm:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                        <TableHead className="w-[120px] text-center"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                        <TableHead><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                        <TableHead className="w-[180px] text-center hidden md:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                        <TableHead className="w-[150px] text-center hidden lg:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                        <TableHead className="w-[100px] text-center"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="text-center hidden sm:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell className="text-center"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell className="text-center hidden md:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell className="text-center hidden lg:table-cell"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                            <TableCell className="text-center"><div className="h-5 bg-gray-200 rounded animate-pulse"></div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
} 