"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getPosts, PostForList } from "./actions";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PostListSkeleton } from "./PostListSkeleton";

const POSTS_PER_PAGE = 10;

export default function PostList() {
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<PostForList[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const boardSlug = searchParams.get("board") || 'all';
        const currentPage = Number(searchParams.get("page")) || 1;
        
        setIsLoading(true);
        getPosts(currentPage, POSTS_PER_PAGE, boardSlug)
            .then(({ posts: newPosts, count }) => {
                setPosts(newPosts);
                setTotalCount(count);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [searchParams]);

    if (isLoading) {
        return <PostListSkeleton />;
    }

    if (posts.length === 0) {
        return <div className="text-center text-gray-500 py-10">게시글이 없습니다.</div>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Link href={`/community/${post.id}`} key={post.id} className="block">
                    <Card className="hover:bg-gray-50 transition-colors">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={post.user_profile?.avatar_url ?? undefined} />
                                    <AvatarFallback>{post.user_profile?.nickname?.[0]}</AvatarFallback>
                                </Avatar>
                                <span>{post.user_profile?.nickname ?? '탈퇴한 사용자'}</span>
                                <span className="text-xs">
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ko })}
                                </span>
                            </div>
                            <CardTitle className="text-lg mt-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    {post.likes[0]?.count ?? 0}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    {post.comments[0]?.count ?? 0}
                                </span>
                            </div>
                            {post.board && <Badge variant="outline">{post.board.name}</Badge>}
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
} 