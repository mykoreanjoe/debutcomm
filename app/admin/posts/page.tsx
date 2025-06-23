import { PostWithAuthor, getPosts } from "./actions";
import PaginationControls from "@/app/community/PaginationControls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PointManager from "./PointManager";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? "1");
  const { posts, totalCount } = await getPosts(page);
  const POSTS_PER_PAGE = 10;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">게시글 포인트 관리</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>작성일</TableHead>
            <TableHead>포인트</TableHead>
            <TableHead>관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: PostWithAuthor) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.user_profile?.nickname || "익명"}</TableCell>
              <TableCell>
                {new Date(post.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{post.points_reward}</TableCell>
              <TableCell>
                <PointManager postId={post.id} currentPoints={post.points_reward} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls
        currentPage={page}
        totalCount={totalCount}
        postsPerPage={POSTS_PER_PAGE}
      />
    </div>
  );
} 