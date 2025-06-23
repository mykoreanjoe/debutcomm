"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CommentActionButtons } from "./CommentActionButtons";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { updateComment } from '../actions';
import { toast } from 'sonner';

export type CommentWithProfile = {
  id: number;
  created_at: string;
  content: string;
  user_id: string;
  user_profile: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
};

interface CommentItemProps {
  comment: CommentWithProfile;
  currentUserId: string | undefined;
}

export default function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPending, startTransition] = useTransition();

  const isAuthor = currentUserId === comment.user_id;

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateComment(comment.id, editedContent);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("댓글이 성공적으로 수정되었습니다.");
        setIsEditing(false);
      }
    });
  };

  return (
    <div className="flex items-start space-x-4 py-4">
      <Avatar>
        <AvatarImage src={comment.user_profile?.avatar_url || ''} alt={comment.user_profile?.nickname || '익명'} />
        <AvatarFallback>{comment.user_profile?.nickname?.charAt(0) ?? '익'}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">
            {comment.user_profile?.nickname ?? '익명'}
          </p>
          <div className="text-xs text-gray-500 flex items-center space-x-2">
            <span>
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
            </span>
            {isAuthor && !isEditing && (
              <CommentActionButtons
                commentId={comment.id}
                authorId={comment.user_id}
                currentUserId={currentUserId}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        </div>

        {!isEditing ? (
          <p className="text-gray-700 whitespace-pre-wrap mt-1">{comment.content}</p>
        ) : (
          <div className="mt-2 space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} disabled={isPending}>
                취소
              </Button>
              <Button size="sm" onClick={handleUpdate} disabled={isPending}>
                {isPending ? "저장 중..." : "저장"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 