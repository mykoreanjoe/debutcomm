'use client';

import { useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toggleUserSuspension } from "@/app/admin/actions";
import { toast } from "sonner";

interface SuspensionButtonProps {
  userId: string;
  isSuspended: boolean;
}

export default function SuspensionButton({ userId, isSuspended }: SuspensionButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleUserSuspension(userId, isSuspended);
      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const actionText = isSuspended ? "활동 허용" : "활동 정지";
  const descriptionText = isSuspended
    ? "이 사용자의 활동 정지를 해제합니다. 다시 글쓰기, 댓글 등 모든 활동이 가능해집니다."
    : "이 사용자의 활동을 정지합니다. 글쓰기, 댓글 등 모든 활동이 제한됩니다.";

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={isSuspended ? "outline" : "destructive"} size="sm">
          {actionText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 {actionText}하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            {descriptionText}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleToggle} disabled={isPending}>
            {isPending ? "처리 중..." : actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 