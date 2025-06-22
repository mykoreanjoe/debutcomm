"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addPointLog } from '../actions';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import TiptapEditor from '@/components/editor/TiptapEditor';

type Board = {
    id: number;
    name: string;
};

type UserProfile = {
    nickname: string;
}

interface NewPostFormProps {
    boards: Board[];
    userProfile: UserProfile;
}

export default function NewPostForm({ boards, userProfile }: NewPostFormProps) {
    const { user } = useUser();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardId, setBoardId] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const textContent = content.replace(/<[^>]*>?/gm, '').trim();
        if (!title.trim() || !textContent || !boardId) {
            toast.error('제목, 게시판, 내용을 모두 입력해주세요.');
            return;
        }
        if (!user) {
            toast.error('사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요.');
            return;
        }

        startTransition(async () => {
            const { data: newPost, error: insertError } = await supabase
                .from('posts')
                .insert({
                    title,
                    content,
                    board_id: Number(boardId),
                    user_id: user.id,
                    nickname: userProfile.nickname,
                })
                .select('id')
                .single();

            if (insertError) {
                console.error('Error creating post:', insertError);
                toast.error('글을 등록하는 중 오류가 발생했습니다.');
            } else {
                await addPointLog({
                    userId: user.id,
                    type: 'POST_CREATION',
                    amount: 5,
                    postId: newPost.id,
                });
                toast.success('글이 성공적으로 등록되었습니다.');
                router.push(`/community/${newPost.id}`);
            }
        });
    };

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">새 글 작성</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title">제목</label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="board">게시판</label>
                            <Select onValueChange={setBoardId} value={boardId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="게시판을 선택하세요" />
                                </SelectTrigger>
                                <SelectContent>
                                    {boards.map((board) => (
                                        <SelectItem key={board.id} value={String(board.id)}>
                                            {board.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="content">내용</label>
                            <TiptapEditor
                                content={content}
                                onChange={setContent}
                                placeholder="내용을 입력하세요..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? '등록 중...' : '등록'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 