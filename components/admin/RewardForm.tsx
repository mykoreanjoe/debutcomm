'use client'; // form status hook을 위해 클라이언트 컴포넌트로 전환

import { useFormState, useFormStatus } from "react-dom";
// import { rewardPoints } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button size="sm" type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : '지급'}
        </Button>
    )
}

const initialState: {
    message?: string;
    error?: string;
    success: boolean;
} = {
    message: undefined,
    error: undefined,
    success: false,
};

// Dummy action for UI testing
const rewardPoints_dummy = async (prevState: any, formData: FormData): Promise<typeof initialState> => {
    console.log("Dummy rewardPoints action triggered for post:", formData.get('postId'));
    await new Promise(res => setTimeout(res, 1000));
    // Simulate success
    return { success: true, message: "UI 테스트: 포인트가 지급되었습니다." };
    // Simulate error
    // return { success: false, error: "UI 테스트: 에러 발생." };
}

export function RewardForm({ postId, userId }: { postId: number, userId: string }) {
    const [state, formAction] = useFormState(rewardPoints_dummy, initialState);

    useEffect(() => {
        if (state.success && state.message) {
            toast.success("성공", { description: state.message });
        }
        if (!state.success && state.error) {
            toast.error("오류", { description: state.error });
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="postId" value={postId} />
            <input type="hidden" name="userId" value={userId} />
            <div className="flex items-center gap-2">
                <Input name="points" type="number" placeholder="지급 포인트" className="flex-1" required />
                <SubmitButton />
            </div>
            <div className="flex items-center space-x-2">
                <Switch id={`shouldComment-${postId}`} name="shouldComment" />
                <Label htmlFor={`shouldComment-${postId}`} className="text-xs">"포인트 적립" 자동 댓글</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id={`isCommentPrivate-${postId}`} name="isCommentPrivate" />
                <Label htmlFor={`isCommentPrivate-${postId}`} className="text-xs">자동 댓글 비공개로</Label>
            </div>
        </form>
    )
} 