"use client";

import { useEffect, useState, useActionState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { updatePost } from '@/app/community/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { getPostForEdit } from "../actions";
import NewPostForm from "../../new/NewPostForm";
import { createClient as serverCreateClient } from "@/lib/supabase/server";

type EditPostPageProps = {
  params: { id: string };
};

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: string;
};

const initialState: { error: string | null } = {
  error: null,
};

function SubmitButton() {
  // useFormStatus is not available with useActionState yet
  // const { pending } = useFormStatus();
  return <Button type="submit">수정 완료</Button>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const postId = parseInt(params.id, 10);
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [state, formAction] = useActionState(updatePost.bind(null, postId), initialState);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, user_id')
        .eq('id', postId)
        .single();

      if (postError || !postData) {
        return notFound();
      }

      if (!user || user.id !== postData.user_id) {
        toast.error('수정할 권한이 없습니다.');
        router.back();
        return;
      }
      
      setPost(postData);
      setIsLoading(false);
    };

    fetchPostAndUser();
  }, [postId, router, supabase]);
  
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!post) {
      return notFound();
  }
  
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">게시글 수정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title">제목</label>
              <Input
                id="title"
                name="title"
                defaultValue={post.title}
                placeholder="제목을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content">내용</label>
              <Textarea
                id="content"
                name="content"
                defaultValue={post.content}
                placeholder="내용을 입력하세요"
                required
                rows={10}
              />
            </div>
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
} 