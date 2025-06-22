"use client";

import { useState, useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit, Flag } from "lucide-react";
import { deleteComment } from '../actions'; // deleteComment 액션 import
import { toast } from 'sonner';
import { ReportDialog } from './ReportDialog';

type CommentActionButtonsProps = {
  commentId: number;
  authorId: string;
  currentUserId: string | null;
  onEdit: () => void; // 수정 모드로 전환하는 함수
};

export function CommentActionButtons({ commentId, authorId, currentUserId, onEdit }: CommentActionButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [isReportOpen, setReportOpen] = useState(false);

  const isAuthor = currentUserId === authorId;

  const handleDelete = () => {
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      startTransition(async () => {
        const result = await deleteComment(commentId);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success('댓글이 삭제되었습니다.');
        }
      });
    }
  };

  if (!currentUserId) return null;

  return (
    <ReportDialog
      commentId={commentId}
      open={isReportOpen}
      onOpenChange={setReportOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isAuthor ? (
            <>
              <DropdownMenuItem onSelect={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                <span>수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={isPending} className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>{isPending ? '삭제 중...' : '삭제'}</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onSelect={() => setReportOpen(true)}>
              <Flag className="mr-2 h-4 w-4" />
              <span>신고하기</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </ReportDialog>
  );
} 