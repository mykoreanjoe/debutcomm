'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createComment } from '@/app/actions/posts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 등록 중...</> : '댓글 등록'}
    </Button>
  );
}

export default function CommentForm({ postId }: { postId: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  const action = async (formData: FormData) => {
    const result = await createComment(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      formRef.current?.reset();
      setError(null);
    }
  };

  if (!user) {
    return (
        <div className="text-center text-sm text-gray-500 bg-slate-100 p-4 rounded-lg">
            댓글을 작성하려면 로그인해주세요.
        </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />
      <Textarea
        name="content"
        placeholder="따뜻한 응원의 댓글을 남겨주세요."
        rows={3}
        required
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <Switch id="isPrivate" name="isPrivate" />
            <Label htmlFor="isPrivate" className="text-sm text-gray-600">비밀댓글</Label>
        </div>
        <SubmitButton />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
} 