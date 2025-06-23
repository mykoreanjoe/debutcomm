"use client";

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User as AuthUser } from '@supabase/supabase-js';
import { updatePost } from '@/app/community/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

type EditPostPageProps = {
  params: { id: string };
};

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: string;
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const postId = parseInt(params.id, 10);
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, user_id')
        .eq('id', postId)
        .single();

      if (error || !data) {
        return notFound();
      }
      
      setPost(data);
      setIsLoading(false);
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/login?redirectTo=/community/${postId}/edit`);
      }
      setUser(user);
      setIsLoaded(true);
    };

    fetchUser();
  }, [postId, router]);

  useEffect(() => {
    if (isLoaded && post && user?.id !== post.user_id) {
      alert('수정할 권한이 없습니다.');
      router.back();
    }
  }, [user, post, isLoaded, router]);

  const handleSubmit = async (formData: FormData) => {
    const result = await updatePost(postId, formData);
    if (result?.error) {
      setError(result.error);
    }
  };
  
  if (isLoading || !isLoaded) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!post) {
      return notFound();
  }
  
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <form action={handleSubmit}>
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit">
              수정 완료
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
} 
