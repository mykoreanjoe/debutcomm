"use client";

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CommentActionButtons from './CommentActionButtons';
import { updateComment } from '../actions';

type Comment = {
  id: number;
  created_at: string;
  content: string;
  nickname: string;
  user_id: string;
};

type CommentItemProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const { userId } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async () => {
    setIsPending(true);
    const result = await updateComment(comment.id, editedContent);
    if (result?.error) {
      alert(result.error);
    } else {
      setIsEditing(false);
    }
    setIsPending(false);
  };

  return (
    <Card key={comment.id} className="bg-slate-50">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{comment.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{comment.nickname}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {new Date(comment.created_at).toLocaleString()}
            </span>
            {comment.user_id === userId && !isEditing && (
              <CommentActionButtons
                commentId={comment.id}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {!isEditing ? (
          <p className="whitespace-pre-wrap">{comment.content}</p>
        ) : (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              disabled={isPending}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={isPending}
              >
                취소
              </Button>
              <Button size="sm" onClick={handleUpdate} disabled={isPending}>
                {isPending ? '저장 중...' : '저장'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 