import { createClient } from "@/lib/supabase/server";
import { Trophy, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type TopPost = {
    id: number;
    title: string;
    likes: number;
    comments_count: number;
    board_name: string | null;
}

async function getTopPosts(): Promise<TopPost[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts_with_counts')
        .select('id, title, likes, comments_count, board_name')
        .order('likes', { ascending: false })
        .limit(3);

    if (error) {
        console.error("Error fetching top posts:", error);
        return [];
    }
    return data;
}

export default async function HallOfFame() {
    const topPosts = await getTopPosts();

    if (topPosts.length === 0) {
        return null; // 보여줄 게시글이 없으면 섹션을 렌더링하지 않음
    }

    return (
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">명예의 전당</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPosts.map((post, index) => (
                    <Link href={`/community/${post.id}`} key={post.id}>
                        <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-2">
                                    <span className={`text-lg font-bold mr-2 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-400'}`}>
                                        {index + 1}위
                                    </span>
                                    {post.board_name && <Badge variant="secondary">{post.board_name}</Badge>}
                                </div>
                                <p className="font-semibold text-gray-700 truncate">{post.title}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-3">
                                <div className="flex items-center mr-4">
                                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-1 text-gray-400" />
                                    <span>{post.comments_count}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
} 