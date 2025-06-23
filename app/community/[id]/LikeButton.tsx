"use client";

import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { likePost, unlikePost } from '@/app/community/actions';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
  initialLiked: boolean;
}

export default function LikeButton({ postId, initialLikes, initialLiked }: LikeButtonProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return router.push('/login?redirectTo=/community/' + postId);
    }
    
    startTransition(async () => {
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
        const result = await unlikePost(postId);
        if (result.error) {
          toast.error(result.error);
          setLikes(likes);
          setHasLiked(true);
        }
      } else {
        setLikes(likes + 1);
        setHasLiked(true);
        const result = await likePost(postId);
        if (result.error) {
          toast.error(result.error);
          setLikes(likes);
          setHasLiked(false);
        }
      }
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLike}
      disabled={isPending}
      className="flex items-center space-x-2"
    >
      <Heart className={`w-5 h-5 ${hasLiked ? 'text-red-500 fill-current' : ''}`} />
      <span>{likes}</span>
    </Button>
  );
} 