"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Edit, Flag } from 'lucide-react';
import { deletePost } from '@/app/community/actions';
import { toast } from 'sonner';
import { ReportDialog } from './ReportDialog';

interface PostActionButtonsProps {
    postId: number;
    authorId: string;
    currentUserId: string | null;
}

export default function PostActionButtons({ postId, authorId, currentUserId }: PostActionButtonsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isReportOpen, setReportOpen] = useState(false);

    const isAuthor = currentUserId === authorId;

    const handleDelete = () => {
        if (confirm('정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            startTransition(async () => {
                const result = await deletePost(postId);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success('게시글이 삭제되었습니다.');
                    router.push('/community');
                }
            });
        }
    };
    
    if (!currentUserId) return null;

    return (
        <ReportDialog
            postId={postId}
            open={isReportOpen}
            onOpenChange={setReportOpen}
        >
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {isAuthor ? (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={`/community/${postId}/edit`} className="flex items-center">
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>수정</span>
                                </Link>
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