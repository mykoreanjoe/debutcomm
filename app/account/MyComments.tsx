import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PostContentView from '@/components/community/PostContentView';

type Comment = {
  id: number;
  content: string;
  created_at: string;
  posts: {
    id: number;
    title: string | null;
  } | null;
};

interface MyCommentsProps {
  comments: Comment[];
}

export default function MyComments({ comments }: MyCommentsProps) {
  if (!comments || comments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">작성한 댓글이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>내가 작성한 댓글</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/3">댓글 내용</TableHead>
              <TableHead>원문</TableHead>
              <TableHead className="text-right">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-2">
                    <PostContentView htmlContent={comment.content} />
                  </div>
                </TableCell>
                <TableCell>
                  {comment.posts ? (
                    <Link href={`/community/${comment.posts.id}`} className="hover:underline text-blue-600">
                      {comment.posts.title || '제목 없음'}
                    </Link>
                  ) : (
                    '삭제된 게시글'
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(comment.created_at), 'yyyy-MM-dd')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 