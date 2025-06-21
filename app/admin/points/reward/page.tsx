// import { getUnrewardedPosts } from "@/app/actions/admin";
import { RewardForm } from "@/components/admin/RewardForm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default async function PointRewardPage() {
    // const posts = await getUnrewardedPosts();
    const posts: any[] = []; // Return empty array for UI testing

    return (
        <Card>
            <CardHeader>
                <CardTitle>포인트 지급 관리</CardTitle>
                <CardDescription>
                    아직 포인트가 지급되지 않은 게시글 목록입니다. 각 게시글에 대해 포인트를 지급할 수 있습니다.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">작성자</TableHead>
                            <TableHead>게시글</TableHead>
                            <TableHead className="w-[300px]">포인트 지급</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <div className="font-medium">{post.users?.name}</div>
                                        <div className="text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</div>
                                        <Badge variant="outline" className="mt-1">{post.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/community/${post.id}`} className="hover:underline" target="_blank">
                                            {post.title}
                                        </Link>
                                        <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                                    </TableCell>
                                    <TableCell>
                                       <RewardForm postId={post.id} userId={post.user_id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    포인트 미지급 게시글이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 