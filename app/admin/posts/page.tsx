import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PointManager from "./PointManager";

export default async function AdminPostsPage() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      created_at,
      points,
      user_profile (
        nickname
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return <p>게시글을 불러오는 중 오류가 발생했습니다: {error.message}</p>;
  }

  if (!posts) {
    return <p>게시글이 없습니다.</p>;
  }

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
          {posts.map((post: any) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.user_profile?.nickname || "익명"}</TableCell>
              <TableCell>
                {new Date(post.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{post.points}</TableCell>
              <TableCell>
                <PointManager postId={post.id} currentPoints={post.points} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 