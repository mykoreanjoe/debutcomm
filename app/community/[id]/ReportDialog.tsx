"use client";

import { useState, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createReport } from '@/app/community/actions';
import { toast } from 'sonner';

interface ReportDialogProps {
    postId?: number;
    commentId?: number;
    children: React.ReactNode;
    onOpenChange: (open: boolean) => void;
    open: boolean;
}

export function ReportDialog({ postId, commentId, children, open, onOpenChange }: ReportDialogProps) {
    const [reason, setReason] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
        if (!reason.trim()) {
            toast.error('신고 사유를 입력해주세요.');
            return;
        }

        startTransition(async () => {
            const result = await createReport({ postId, commentId, reason });
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message || '신고가 접수되었습니다.');
                onOpenChange(false);
                setReason('');
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>신고하기</DialogTitle>
                    <DialogDescription>
                        {postId ? '게시글' : '댓글'} 신고 사유를 구체적으로 작성해주세요. 신고 내용 확인 후 운영 원칙에 따라 조치됩니다.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        placeholder="예) 욕설, 비방, 광고 등"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            취소
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isPending || !reason.trim()}>
                        {isPending ? '처리 중...' : '신고 접수'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 