import { createClient } from "@/lib/supabase/server";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { CommentWithChildren } from "./page";

async function getComments(postId: number): Promise<CommentWithChildren[]> {
    const supabase = createClient();
    const { data: comments, error } = await supabase
        .rpc('get_comments_with_children', { p_post_id: postId });

    if (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
    return comments || [];
}

export default async function CommentSection({ postId }: { postId: number }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const comments = await getComments(postId);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">댓글 ({comments.length})</h2>
            <CommentForm postId={postId} userId={user?.id} />
            <div className="mt-6 space-y-6">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} currentUserId={user?.id} />
                    ))
                ) : (
                    <div className="py-10 text-center text-muted-foreground">
                        <p>아직 댓글이 없습니다.</p>
                        <p className="mt-1">첫 번째 댓글을 남겨주세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
} 