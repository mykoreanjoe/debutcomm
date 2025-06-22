"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addPointLog } from '../actions';

type CommentFormProps = {
  postId: number;
};

const CommentForm = ({ postId }: CommentFormProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const fetchUserProfile = async () => {
        const { data, error } = await supabase
          .from('user_profile')
          .select('nickname')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching nickname for comment:', error);
        } else if (data) {
          setNickname(data.nickname);
        }
      };
      fetchUserProfile();
    }
  }, [isLoaded, isSignedIn, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }
    if (!user || !nickname) {
        setError('로그인 상태를 확인해주세요.');
        return;
    }

    setIsLoading(true);
    setError('');

    const { data: newComment, error: insertError } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        content: content.trim(),
        user_id: user.id,
        nickname: nickname,
      })
      .select('id')
      .single();

    if (insertError || !newComment) {
      setIsLoading(false);
      console.error('Error creating comment:', insertError);
      setError('댓글을 등록하는 중 오류가 발생했습니다.');
    } else {
      // 포인트 지급
      await addPointLog({
        userId: user.id,
        type: 'COMMENT_CREATION',
        amount: 1, // 댓글 작성 포인트
        postId: postId,
        commentId: newComment.id,
      });

      setIsLoading(false);
      setContent('');
      router.refresh(); // 서버 컴포넌트 데이터를 새로고침하여 댓글 목록을 업데이트
    }
  };

  if (!isSignedIn) {
    return (
        <div className="text-center mt-8 p-4 border rounded-lg bg-gray-50">
            <p>댓글을 작성하려면 <a href="/sign-in" className="text-blue-600 hover:underline">로그인</a>이 필요합니다.</p>
        </div>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>댓글 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="따뜻한 응원의 댓글을 남겨주세요."
            required
            rows={4}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !nickname}>
              {isLoading ? '등록 중...' : '댓글 등록'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm; 