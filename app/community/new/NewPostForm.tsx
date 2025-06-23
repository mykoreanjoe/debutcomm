"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPost } from '../actions';
import { toast } from 'sonner';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { Loader2 } from 'lucide-react';

type Board = {
    id: number;
    name: string;
};

interface NewPostFormProps {
    boards: Board[];
}

const initialState: {
  error?: string | null;
  success?: boolean;
  message?: string;
  redirectTo?: string | null;
} = {
  error: null,
  success: false,
  message: null,
  redirectTo: null,
};

function SubmitButton() {
    const [isPending] = useTransition();
    return (
        <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? '등록 중...' : '등록'}
        </Button>
    );
}

export default function NewPostForm({ boards }: NewPostFormProps) {
    const router = useRouter();
    const [state, formAction] = useActionState(createPost, initialState);
    
    // Hidden input for tiptap editor content
    const [content, setContent] = React.useState('');

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
        if (state?.success) {
            toast.success("게시글이 등록되었습니다.", {
              description: state.message,
            });
            if (state.redirectTo) {
                router.push(state.redirectTo);
            }
        }
    }, [state, router]);

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">새 글 작성</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title">제목</label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="제목을 입력하세요"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="board_id">게시판</label>
                            <Select name="board_id" required>
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
                             <input type="hidden" name="content" value={content} />
                             <TiptapEditor
                                 content={content}
                                 onChange={setContent}
                                 placeholder="내용을 입력하세요..."
                             />
                        </div>
                        <div className="flex justify-end">
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 