import { Suspense } from "react";
import { getPostsForAdmin } from "@/app/admin/actions";
import PaginationControls from "@/app/community/PaginationControls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DeletePostButton } from "./DeletePostButton";

const POSTS_PER_PAGE = 20;

async function PostsList({ page, limit }: { page: number, limit: number }) {
  const { posts, totalCount } = await getPostsForAdmin(page, limit);

  return (
    <>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead className="w-[120px]">게시판</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[150px]">작성일</TableHead>
              <TableHead className="w-[100px] text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link href={`/community/${post.id}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.board?.name ?? 'N/A'}</TableCell>
                  <TableCell>{post.user_profile?.nickname ?? '탈퇴한 사용자'}</TableCell>
                  <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DeletePostButton postId={post.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  게시물이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <PaginationControls
          currentPage={page}
          totalCount={totalCount}
          postsPerPage={limit}
        />
      </div>
    </>
  );
}

export default function AdminPostsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const page = Number(searchParams['page'] ?? '1');
  const limit = Number(searchParams['limit'] ?? POSTS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">게시물 관리</h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PostsList page={page} limit={limit} />
      </Suspense>
    </div>
  );
} 