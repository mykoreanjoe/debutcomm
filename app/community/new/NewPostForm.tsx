"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { Loader2 } from 'lucide-react';
import { PostForList } from '@/app/community/actions';

const POST_FORM_TOAST_ID = "post-form-toast";

type Board = {
    id: number;
    name: string;
};

type PostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
    boardId?: string[];
  }
  message?: string;
  success?: boolean;
  redirectTo?: string;
};

interface PostFormProps {
    boards: Board[];
    formAction: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
    initialState: PostFormState;
    initialData?: {
        title: string;
        content: string;
        board_id: number;
    };
}

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
    const { pending } = useFormStatus();

    useEffect(() => {
        if (pending) {
            toast.loading(isUpdate ? '게시글을 수정하고 있습니다...' : '새 게시글을 등록하고 있습니다...', {
                id: POST_FORM_TOAST_ID,
            });
        }
    }, [pending, isUpdate]);

    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdate ? '수정' : '등록'}
        </Button>
    );
}

export default function NewPostForm({ boards, formAction, initialState, initialData }: PostFormProps) {
    const router = useRouter();
    const [state, dispatch] = useActionState(formAction, initialState);
    const [content, setContent] = useState(initialData?.content || '');

    useEffect(() => {
        if (state.success && state.redirectTo) {
          toast.success(initialData ? '수정 성공' : '등록 성공', {
            id: POST_FORM_TOAST_ID,
            description: state.message,
          });
          setTimeout(() => {
            router.push(state.redirectTo!);
          }, 1000);
        } else if (state.message && !state.success) {
          toast.error('오류 발생', {
            id: POST_FORM_TOAST_ID,
            description: state.message,
          });
        }
      }, [state, router, initialData]);

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{initialData ? '게시글 수정' : '새 글 작성'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={dispatch} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title">제목</label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="제목을 입력하세요"
                                required
                                defaultValue={initialData?.title}
                            />
                            <p className="text-sm text-muted-foreground">제목은 3자 이상 입력해주세요.</p>
                             {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="board_id">게시판</label>
                            <Select name="board_id" required defaultValue={initialData?.board_id ? String(initialData.board_id) : undefined}>
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
                            {state.errors?.boardId && <p className="text-red-500 text-sm">{state.errors.boardId[0]}</p>}
                        </div>
                        <div className="space-y-2">
                             <label htmlFor="content">내용</label>
                             <input type="hidden" name="content" value={content} />
                             <TiptapEditor
                                 content={content}
                                 onChange={setContent}
                                 placeholder="내용을 입력하세요..."
                             />
                             <p className="text-sm text-muted-foreground">내용은 5자 이상 입력해주세요.</p>
                             {state.errors?.content && <p className="text-red-500 text-sm">{state.errors.content[0]}</p>}
                        </div>
                        <div className="flex justify-end">
                            <SubmitButton isUpdate={!!initialData} />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 