import { getUserPosts } from './actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

export default async function MyPosts() {
  const userPosts = await getUserPosts();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">작성한 글</h2>
      {userPosts.length > 0 ? (
        <Table>
          <TableCaption>총 {userPosts.length}개의 글을 작성했습니다.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead>작성일</TableHead>
              <TableHead className="text-right">조회수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Link href={`/community/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">{post.view_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="py-10 text-center text-muted-foreground">
          <p>아직 작성한 글이 없습니다.</p>
        </div>
      )}
    </div>
  );
} 