"use client";

import { useState, useActionState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CommentActionButtons } from "./CommentActionButtons";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateComment } from "@/app/community/actions";
import { toast } from 'sonner';
import type { CommentWithChildren } from "./page";
import CommentForm from "./CommentForm";
import PostContentView from "@/components/community/PostContentView";
import { MessageSquare } from "lucide-react";

type CommentItemProps = {
  comment: CommentWithChildren;
  currentUserId?: string;
  boardSlug?: string;
  postId: number;
};

const EditCommentForm = ({ comment, onCancel }: { comment: CommentWithChildren, onCancel: () => void }) => {
  const [state, formAction, isPending] = useActionState(updateComment.bind(null, comment.id), { success: false, message: null, errors: null });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("댓글 수정 완료", { description: state.message });
        onCancel();
      } else {
        toast.error("수정 실패", { description: state.message });
      }
    }
  }, [state, onCancel]);

  return (
    <form action={formAction} className="mt-2 space-y-2">
      <Textarea
        name="content"
        defaultValue={comment.content}
        rows={3}
        className="resize-none"
      />
      {state.errors?.content && <p className="text-sm text-red-500">{state.errors.content[0]}</p>}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  );
};

export default function CommentItem({ comment, currentUserId, boardSlug, postId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const isAnonymous = comment.nickname === '익명';

  const isAuthor = currentUserId === comment.user_id;

  return (
    <div className="flex flex-col">
      <div className="flex items-start space-x-4">
        <Avatar>
          {boardSlug !== 'anonymous' && (
            <AvatarImage src={!isAnonymous ? comment.avatar_url ?? undefined : undefined} alt={comment.nickname ?? "익명"} />
          )}
          <AvatarFallback>
            {isAnonymous ? '익' : (comment.nickname?.[0] || '익')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {boardSlug === 'anonymous' ? '익명' : (comment.nickname || '익명')}
            </p>
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <span>
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ko })}
              </span>
              {isAuthor && (
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
            <div className="prose dark:prose-invert max-w-none mt-2">
              <PostContentView htmlContent={comment.content} />
            </div>
          ) : (
            <EditCommentForm comment={comment} onCancel={() => setIsEditing(false)} />
          )}

          {!isEditing && (
            <div className="mt-2 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                답글 달기
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isReplyFormOpen && (
        <div className="ml-16 mt-4">
          <CommentForm 
            postId={postId}
            userId={currentUserId}
            parentId={comment.id}
            onReplySuccess={() => setIsReplyFormOpen(false)} 
          />
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="ml-12 mt-4 space-y-4 border-l-2 pl-4">
          {comment.children.map((childComment) => (
            <CommentItem key={childComment.id} comment={childComment} currentUserId={currentUserId} postId={postId} boardSlug={boardSlug} />
          ))}
        </div>
      )}
    </div>
  );
}