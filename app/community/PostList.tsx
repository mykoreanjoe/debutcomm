"use client";

import Link from "next/link";
import { PostForList } from "./actions";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PostListProps {
    initialPosts: PostForList[];
}

export default function PostList({ initialPosts }: PostListProps) {
    if (initialPosts.length === 0) {
        return <div className="text-center text-gray-500 py-10">게시글이 없습니다.</div>;
    }

    return (
        <div className="space-y-4">
            {initialPosts.map((post) => (
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