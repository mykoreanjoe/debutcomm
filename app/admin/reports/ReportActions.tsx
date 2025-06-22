"use client";

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { dismissReport, deleteContentAndDismiss } from '../actions';
import { type Report } from './page';

interface ReportActionsProps {
    report: Report;
}

export default function ReportActions({ report }: ReportActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handleDismiss = () => {
        startTransition(async () => {
            const result = await dismissReport(report.id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message);
            }
        });
    };

    const handleDeleteContent = () => {
        if (!confirm('정말로 이 컨텐츠를 삭제하고 신고를 처리하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return;
        }
        startTransition(async () => {
            const result = await deleteContentAndDismiss(report.id, report.post_id, report.comment_id);
             if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message);
            }
        });
    };

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
                disabled={isPending}
            >
                기각
            </Button>
            <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteContent}
                disabled={isPending}
            >
                삭제
            </Button>
        </div>
    );
} 