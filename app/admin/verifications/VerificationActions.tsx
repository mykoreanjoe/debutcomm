"use client";

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { approveVerificationRequest, rejectVerificationRequest } from '../actions';
import { toast } from 'sonner';

interface VerificationActionsProps {
  userId: string;
}

export function VerificationActions({ userId }: VerificationActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [rejectionReason, setRejectionReason] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveVerificationRequest(userId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
      }
    });
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error('거절 사유를 입력해주세요.');
      return;
    }
    startTransition(async () => {
      const result = await rejectVerificationRequest(userId, rejectionReason);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleApprove}
        disabled={isPending}
      >
        {isPending ? '처리중...' : '승인'}
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive" disabled={isPending}>
            거절
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>인증 요청 거절</DialogTitle>
            <DialogDescription>
              인증 요청을 거절하는 사유를 입력해주세요. 이 사유는 사용자에게 표시됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                거절 사유
              </Label>
              <Input
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="col-span-3"
                placeholder="예: 학생 정보 불일치"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleReject} 
              disabled={isPending}
            >
              {isPending ? '처리중...' : '거절 확정'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 