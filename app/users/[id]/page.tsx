import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList from "@/components/community/PostList";
import Link from 'next/link';
import { format } from 'date-fns';
import { MessageSquare, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { notFound } from "next/navigation";
import { PostForList } from "@/components/community/PostList";

// This is a placeholder. In a real app, this would be a server component
// fetching data based on params.id
type UserProfilePageProps = {
    params: { id: string };
};

// --- Dummy Data for UI Testing ---
const dummyData = {
    profile: {
        user_id: 'user_1',
        name: '김데뷰',
        role: 'student',
        image_url: 'https://i.pravatar.cc/96?u=user_1'
    },
    posts: [
        { 
            id: 102, 
            title: '저 이번에 토플 110점 넘었어요! 😭', 
            created_at: '2024-05-18', 
            categories: { name: '자유' }, 
            comments: [{ count: 25 }] 
        },
        { 
            id: 108, 
            title: '주말 스터디 그룹원 모집합니다 (2명)', 
            created_at: '2024-05-22', 
            categories: { name: '스터디' }, 
            comments: [{ count: 7 }] 
        },
    ],
    comments: [
        { 
            id: 201, 
            content: '정말 유용한 정보 감사합니다!', 
            created_at: '2024-05-23', 
            posts: { id: 105, title: '효과적인 단어 암기법 공유합니다' } 
        },
        { 
            id: 205, 
            content: '저도 그 부분에서 많이 헤맸는데, 설명해주셔서 큰 도움이 됐어요.', 
            created_at: '2024-05-21', 
            posts: { id: 110, title: 'To 부정사 용법 완벽 정리' } 
        },
    ]
};
// ---

function UserCommentsList({ comments }: { comments: any[] }) {
    if (comments.length === 0) return <p className="text-center text-gray-500 py-10">작성한 댓글이 없습니다.</p>;
    
    return (
        <ul className="space-y-4">
            {comments.map((comment: any) => (
                <li key={comment.id} className="border p-4 rounded-lg bg-white shadow-sm">
                    <p className="text-gray-700">"{comment.content}"</p>
                    <Separator className="my-3" />
                    <div className="text-sm text-gray-500 flex justify-between items-center">
                        <span>{format(new Date(comment.created_at), 'yyyy-MM-dd')}</span>
                        {comment.posts && (
                            <Link href={`/community/${comment.posts.id}`} className="hover:underline flex items-center gap-1.5">
                                <strong>{comment.posts.title}</strong> 글에서
                            </Link>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    // const data = await getUserProfile(params.id);
    const data = dummyData;

    if (!data || !data.profile) {
        notFound();
    }

    const { profile, posts, comments } = data;

    const formattedPosts: PostForList[] = posts.map((p: any) => ({
        id: p.id,
        title: p.title,
        author_id: profile.user_id,
        author_name: profile.name,
        category: p.categories?.name || null,
        created_at: p.created_at,
        comment_count: p.comments[0]?.count || 0,
        like_count: 0, // Placeholder
        view_count: 0, // Placeholder
    }));
    
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={profile.image_url || ''} alt={profile.name} />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        <Badge className="mt-2" variant={profile.role === 'teacher' ? 'default' : 'secondary'}>{profile.role}</Badge>
                    </div>
                </div>

                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="posts"><MessageSquare className="w-4 h-4 mr-2" />작성한 글 ({posts.length})</TabsTrigger>
                        <TabsTrigger value="comments"><FileText className="w-4 h-4 mr-2" />작성한 댓글 ({comments.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="posts" className="mt-6">
                        <PostList posts={formattedPosts} showFeatured={false} showStats={true} />
                    </TabsContent>
                    <TabsContent value="comments" className="mt-6">
                        <UserCommentsList comments={comments} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 