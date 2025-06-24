"use client";

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createComment, CommentState } from '../actions';
import { useRouter } from 'next/navigation';

interface CommentFormProps {
  postId: number;
  userId: string | undefined;
  parentId?: number | null;
  onReplySuccess?: () => void;
}

const initialState: CommentState = {
  success: false,
  error: undefined,
  fieldErrors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? '등록 중...' : '댓글 등록'}
    </Button>
  );
}

export default function CommentForm({ postId, userId, parentId, onReplySuccess }: CommentFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(createComment, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!userId) return; // 사용자가 로그인하지 않았으면 아무것도 하지 않음

    if (state.error) {
      toast.error(state.error);
    }
    
    if (state.success) {
      toast.success('댓글이 성공적으로 등록되었습니다.');
      formRef.current?.reset();
      if (onReplySuccess) {
        onReplySuccess();
      }
    }
  }, [state, userId, onReplySuccess]);
  
  const handleFormAction = (formData: FormData) => {
    if (!userId) {
      return router.push('/login?message=댓글을 작성하려면 로그인이 필요합니다.');
    }
    formAction(formData);
  };

  if (!userId) {
    return (
      <div className="mt-6 text-center p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600">
          댓글을 작성하려면 <a href="/login" className="font-semibold text-blue-600 hover:underline">로그인</a>이 필요합니다.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={handleFormAction} className="mt-6">
      <input type="hidden" name="postId" value={postId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <div className="space-y-2">
        <Textarea
          name="content"
          placeholder="따뜻한 댓글을 남겨주세요."
          rows={3}
          required
        />
      </div>
      <div className="flex justify-end mt-2">
        <SubmitButton />
      </div>
    </form>
  );
} 