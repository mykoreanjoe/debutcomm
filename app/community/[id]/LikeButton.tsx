"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toggleLike } from '../actions';
import { useAuth } from '@clerk/nextjs';

type LikeButtonProps = {
  postId: number;
  initialLikes: number;
  initialHasLiked: boolean;
};

export default function LikeButton({ postId, initialLikes, initialHasLiked }: LikeButtonProps) {
  const { userId } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (!userId) {
      // 로그인하지 않은 경우, 로그인 페이지로 유도할 수 있습니다.
      alert('로그인이 필요합니다.');
      return;
    }

    setIsLoading(true);

    // Optimistic UI Update
    setHasLiked(!hasLiked);
    setLikes(likes + (!hasLiked ? 1 : -1));

    const result = await toggleLike(postId);

    if (result?.error) {
      // 에러 발생 시 원래 상태로 롤백
      setHasLiked(hasLiked);
      setLikes(likes);
      alert(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLoading}>
      <Heart className={`h-5 w-5 mr-2 ${hasLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
      <span>{likes}</span>
    </Button>
  );
} 