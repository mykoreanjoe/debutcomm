import { getMyPosts, getMyComments } from '@/app/actions/posts';
import PostList, { PostForList } from '@/components/community/PostList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { format } from 'date-fns';
import { MessageSquare, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type MyComment = {
    id: number;
    content: string;
    created_at: string;
    posts: {
        id: number;
        title: string | null;
    } | null;
};

function MyCommentsList({ comments }: { comments: MyComment[] }) {
    if (comments.length === 0) {
        return <p className="text-center text-gray-500 py-10">작성한 댓글이 없습니다.</p>;
    }

    return (
        <ul className="space-y-4">
            {comments.map((comment) => (
                <li key={comment.id} className="border p-4 rounded-lg bg-white shadow-sm">
                    <p className="text-gray-700">{comment.content}</p>
                    <Separator className="my-3" />
                    <div className="text-sm text-gray-500 flex justify-between items-center">
                        <span>{format(new Date(comment.created_at), 'yyyy-MM-dd HH:mm')}</span>
                        {comment.posts && (
                            <Link href={`/community/${comment.posts.id}`} className="hover:underline flex items-center gap-1.5">
                                원본 글 보기 <FileText className="w-3 h-3"/>
                            </Link>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default async function MyCommunityActivityPage() {
    const myPosts = await getMyPosts();
    const myComments = await getMyComments();

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-2">나의 활동</h1>
            <p className="text-gray-600 mb-8">커뮤니티에서 내가 작성한 게시글과 댓글을 확인합니다.</p>
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="posts">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        내가 쓴 글 ({myPosts.length})
                    </TabsTrigger>
                    <TabsTrigger value="comments">
                        <FileText className="w-4 h-4 mr-2" />
                        내가 쓴 댓글 ({myComments.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="posts">
                    <Card>
                        <CardHeader>
                            <CardTitle>내가 쓴 글</CardTitle>
                            <CardDescription>총 {myPosts.length}개의 게시글을 작성했습니다.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PostList posts={myPosts as PostForList[]} showFeatured={false} showStats={false} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="comments">
                    <Card>
                        <CardHeader>
                            <CardTitle>내가 쓴 댓글</CardTitle>
                            <CardDescription>내가 작성한 댓글 목록입니다.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MyCommentsList comments={myComments} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 