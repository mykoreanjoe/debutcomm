import { Suspense } from "react";
import { getCommentsForAdmin } from "@/app/admin/actions";
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
import { DeleteCommentButton } from "./DeleteCommentButton";

const COMMENTS_PER_PAGE = 20;

async function CommentsList({ page, limit }: { page: number, limit: number }) {
  const { comments, totalCount } = await getCommentsForAdmin(page, limit);

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>댓글 내용</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[200px]">원본 게시물</TableHead>
              <TableHead className="w-[150px]">작성일</TableHead>
              <TableHead className="w-[100px] text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">
                    {comment.content}
                  </TableCell>
                  <TableCell>{comment.user_profile?.nickname ?? '탈퇴한 사용자'}</TableCell>
                  <TableCell>
                    <Link href={`/community/${comment.posts?.id}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {comment.posts?.title ?? '원본 게시물 보기'}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(comment.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DeleteCommentButton commentId={comment.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  댓글이 없습니다.
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

export default function AdminCommentsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const page = Number(searchParams['page'] ?? '1');
  const limit = Number(searchParams['limit'] ?? COMMENTS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">댓글 관리</h1>
      <Suspense fallback={<div>로딩 중...</div>}>
        <CommentsList page={page} limit={limit} />
      </Suspense>
    </div>
  );
} 