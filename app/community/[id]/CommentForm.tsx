"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createComment } from '../actions';

interface CommentFormProps {
    postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return router.push('/login?redirectTo=/community/' + postId);
        }

        if (!content.trim()) {
            toast.error('댓글 내용을 입력해주세요.');
            return;
        }

        startTransition(async () => {
            const result = await createComment(postId, content);
            
            if (result?.error) {
                toast.error(result.error);
                if (result.redirectTo) {
                    router.push(result.redirectTo);
                }
            } else {
                setContent('');
                toast.success('댓글이 성공적으로 등록되었습니다.');
                // router.refresh() is handled by revalidatePath in the action
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="space-y-2">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="따뜻한 댓글을 남겨주세요."
                    rows={3}
                />
            </div>
            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={isPending}>
                    {isPending ? '등록 중...' : '댓글 등록'}
                </Button>
            </div>
        </form>
    );
} 