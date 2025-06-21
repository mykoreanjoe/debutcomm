'use client';

import { useState, useTransition } from 'react';
import { toggleLikePost, deletePost, CommentWithUser, PostType, UserType } from '@/app/actions/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Lock, ThumbsUp, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CommentForm from '@/components/community/CommentForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

function AuthorBadge({ role }: { role: string | null }) {
    if (!role || role === 'student') return null;

    let badgeText;
    let variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined = 'secondary';
    switch (role) {
        case 'admin':
            badgeText = '관리자';
            variant = 'destructive';
            break;
        case 'teacher':
            badgeText = '선생님';
            variant = 'default';
            break;
        default:
            return null;
    }
    return <Badge variant={variant} className="ml-2">{badgeText}</Badge>;
}

function CommentItem({ comment, currentUserId }: { comment: CommentWithUser; currentUserId: string | undefined }) {
    const isAuthor = comment.user_id === currentUserId;
    
    if (comment.is_private && !isAuthor) {
        return (
            <div className="flex items-center gap-3 p-4 border-t">
                <Lock className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500">비밀 댓글입니다.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 p-4 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.users?.name || '익명'}</span>
                    <AuthorBadge role={comment.users?.role || null} />
                    {comment.is_private && <Lock className="w-3 h-3 text-gray-500" />}
                </div>
                <span className="text-xs text-gray-500">
                    {format(new Date(comment.created_at), 'yyyy-MM-dd HH:mm')}
                </span>
            </div>
            <p className="text-gray-800 break-words whitespace-pre-wrap ml-2">{comment.content}</p>
            <div className="flex items-center justify-end gap-2 mt-1">
                <Button variant="ghost" size="sm" className="h-7 px-2 flex items-center gap-1.5 text-gray-600 hover:text-gray-900" disabled={isAuthor}>
                    <ThumbsUp className="w-3 h-3" /> 
                    <span className="text-xs">0</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 flex items-center gap-1.5 text-gray-600 hover:text-red-700">
                    <ShieldAlert className="w-3 h-3" />
                </Button>

                {isAuthor && (
                    <>
                        <Separator orientation="vertical" className="h-4 mx-1" />
                        <Button variant="ghost" size="sm" className="h-7 px-2">수정</Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-red-600 hover:text-red-700">삭제</Button>
                    </>
                )}
            </div>
        </div>
    );
}

const REPORT_REASONS = [
    '스팸 또는 상업적 광고',
    '욕설, 비방, 또는 인신공격',
    '불법 정보 또는 음란물',
    '권리 침해 (저작권, 명예훼손 등)',
    '기타',
];

export default function PostDetailClient({ post: initialPost, comments: initialComments, user }: { post: PostType | null, comments: CommentWithUser[], user: UserType | null }) {
    const [post, setPost] = useState<PostType | null>(initialPost);
    const [isLikePending, startLikeTransition] = useTransition();
    const [isDeletePending, startDeleteTransition] = useTransition();
    const [isReportDialogOpen, setReportDialogOpen] = useState(false);

    if (!post || !post.user_profile) {
        return <div>게시글 또는 작성자 정보를 찾을 수 없습니다.</div>;
    }
    
    const author = post.user_profile;

    const handleLike = () => {
        startLikeTransition(async () => {
            if (!post) return;
            const result = await toggleLikePost(post.id);
            if (result.success) {
                setPost((prev: PostType | null) => {
                    if (!prev) return null;
                    const newLikeCount = result.newState === 'liked' 
                        ? prev.likes.length + 1 
                        : Math.max(0, prev.likes.length - 1);
                    return { ...prev, likes: Array(newLikeCount).fill(0) };
                });
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    }

    const handleDelete = () => {
        startDeleteTransition(async () => {
            if (!post) return;
            const result = await deletePost(post.id);
            if(result.success) {
                toast.success(result.message);
                // The action will handle redirect, so no client-side navigation is needed.
            } else {
                toast.error(result.message);
            }
        });
    }

    const isAuthor = post.user_id === user?.id;

    const handleReportSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here we would call a server action in the future.
        // For now, just show a success message and close the dialog.
        const formData = new FormData(event.currentTarget);
        const reason = formData.get('reason');
        const details = formData.get('details');
        console.log('Report submitted:', { reason, details });

        toast.success('신고가 접수되었습니다. 검토 후 처리하겠습니다.');
        setReportDialogOpen(false);
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link href="/community" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            목록으로
                        </Link>
                    </div>

                    <Card className="overflow-hidden shadow-lg">
                        <CardHeader className="p-6">
                            <Badge variant="secondary" className="w-fit mb-4">{post.category}</Badge>
                            <CardTitle className="text-2xl md:text-3xl font-bold leading-snug">{post.title || '제목 없음'}</CardTitle>
                            <div className="flex items-center justify-between mt-4">
                                <Link href={`/users/${author.user_id}`} className="flex items-center gap-3 group">
                                    <Avatar>
                                        <AvatarImage src={author.image_url || ''} />
                                        <AvatarFallback>{author.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold group-hover:text-indigo-600 transition-colors">{author.name}</p>
                                        <p className="text-sm text-gray-500">{format(new Date(post.created_at), 'yyyy년 MM월 dd일')}</p>
                                    </div>
                                </Link>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="p-6">
                            {post.image_url && (
                                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden border">
                                    <Image src={post.image_url} alt={post.title || 'Post image'} fill className="object-contain" />
                                </div>
                            )}
                            <div className="prose max-w-none text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center gap-4 p-6 bg-slate-50/50">
                            <div className="flex items-center justify-center gap-4">
                                <Button onClick={handleLike} disabled={isLikePending} variant="outline" size="lg" className="rounded-full px-6 py-3 text-base">
                                    <ThumbsUp className="w-5 h-5 mr-2" />
                                    추천
                                    <span className="ml-2 font-bold">{post.likes.length || 0}</span>
                                </Button>
                                <Dialog open={isReportDialogOpen} onOpenChange={setReportDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="lg" className="rounded-full px-6 py-3 text-base text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                            <ShieldAlert className="w-5 h-5 mr-2" />
                                            신고
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>게시물 신고하기</DialogTitle>
                                            <DialogDescription>
                                                신고 사유를 선택하고 상세 내용을 입력해주세요. 관리자 검토 후 처리됩니다.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleReportSubmit}>
                                            <div className="space-y-4 py-4">
                                                <RadioGroup name="reason" defaultValue={REPORT_REASONS[0]}>
                                                    {REPORT_REASONS.map((reason) => (
                                                        <div key={reason} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={reason} id={reason} />
                                                            <Label htmlFor={reason}>{reason}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                                <Textarea name="details" placeholder="상세 내용을 입력해주세요 (선택 사항)" />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">신고 접수</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {isAuthor && (
                                <div className="flex items-center gap-2 self-end mt-4">
                                    <Link href={`/community/${post.id}/edit`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4 mr-1.5" />수정
                                        </Button>
                                    </Link>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700" disabled={isDeletePending}>
                                                <Trash2 className="w-4 h-4 mr-1.5" />삭제
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    이 작업은 되돌릴 수 없습니다. 게시글이 영구적으로 삭제됩니다.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>취소</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete} disabled={isDeletePending}>
                                                    {isDeletePending ? "삭제 중..." : "확인"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </CardFooter>
                    </Card>

                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">댓글 ({initialComments.length})</h3>
                        <div className="bg-white rounded-lg border">
                            {initialComments.map((comment) => (
                                <CommentItem 
                                    key={comment.id} 
                                    comment={comment} 
                                    currentUserId={user?.id}
                                />
                            ))}
                        </div>
                    </div>

                    <Card className="mt-8 shadow-lg">
                        <CardHeader>
                            <CardTitle>댓글 쓰기</CardTitle>
                            <p className="text-sm text-gray-500 pt-1">따뜻한 격려와 응원의 한마디는 큰 힘이 됩니다. (댓글 작성 시 10포인트 적립!)</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="is_private" name="is_private" />
                                <Label htmlFor="is_private" className="text-sm font-medium">비밀 댓글로 작성하기</Label>
                            </div>
                            <CommentForm postId={post.id} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 