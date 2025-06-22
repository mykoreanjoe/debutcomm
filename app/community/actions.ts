"use server";

import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function toggleLike(postId: number) {
  const { userId } = await auth();

  if (!userId) {
    return { error: '로그인이 필요합니다.' };
  }

  // 사용자가 이미 '좋아요'를 눌렀는지 확인
  const { data: existingLike, error: findError } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();
  
  if (findError && findError.code !== 'PGRST116') { // PGRST116: 'exact-one' row not found
    console.error('Error finding like:', findError);
    return { error: '좋아요 상태를 확인하는 중 오류가 발생했습니다.' };
  }

  try {
    if (existingLike) {
      // 이미 '좋아요'를 눌렀다면 -> 삭제 (unlike)
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
      
      if (deleteError) throw deleteError;
      
    } else {
      // '좋아요'를 누르지 않았다면 -> 추가 (like)
      const { error: insertError } = await supabase
        .from('likes')
        .insert({ post_id: postId, user_id: userId });

      if (insertError) throw insertError;
    }

    revalidatePath(`/community/${postId}`);
    return { success: true };

  } catch (error) {
    console.error('Error toggling like:', error);
    return { error: '좋아요 상태를 변경하는 중 오류가 발생했습니다.' };
  }
}

export async function deletePost(postId: number) {
  const { userId } = await auth();
  if (!userId) {
    return { error: '로그인이 필요합니다.' };
  }

  // 게시글 작성자와 현재 사용자가 동일한지 확인
  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single();

  if (fetchError || !post) {
    return { error: '게시글을 찾을 수 없습니다.' };
  }

  if (post.user_id !== userId) {
    return { error: '삭제할 권한이 없습니다.' };
  }
  
  // RLS 정책이 있다면 이 로직이 필요 없을 수도 있습니다.
  // 여기서는 이중으로 체크합니다.

  try {
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (deleteError) throw deleteError;

  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: '게시글 삭제 중 오류가 발생했습니다.' };
  }

  revalidatePath('/community');
  redirect('/community');
}

export async function updatePost(postId: number, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { error: '로그인이 필요합니다.' };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { error: '제목과 내용을 모두 입력해주세요.' };
  }

  // 게시글 작성자와 현재 사용자가 동일한지 확인
  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', postId)
    .single();

  if (fetchError || !post) {
    return { error: '게시글을 찾을 수 없습니다.' };
  }

  if (post.user_id !== userId) {
    return { error: '수정할 권한이 없습니다.' };
  }

  try {
    const { error: updateError } = await supabase
      .from('posts')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', postId);

    if (updateError) throw updateError;

  } catch (error) {
    console.error('Error updating post:', error);
    return { error: '게시글 수정 중 오류가 발생했습니다.' };
  }

  revalidatePath(`/community/${postId}`);
  redirect(`/community/${postId}`);
}

export async function deleteComment(commentId: number) {
    const { userId } = await auth();
    if (!userId) {
        return { error: '로그인이 필요합니다.' };
    }

    const { data: comment, error: fetchError } = await supabase
        .from('comments')
        .select('id, user_id, post_id')
        .eq('id', commentId)
        .single();

    if (fetchError || !comment) {
        return { error: '댓글을 찾을 수 없습니다.' };
    }

    if (comment.user_id !== userId) {
        return { error: '삭제할 권한이 없습니다.' };
    }

    try {
        const { error: deleteError } = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId);

        if (deleteError) throw deleteError;
        
    } catch (error) {
        console.error('Error deleting comment:', error);
        return { error: '댓글 삭제 중 오류가 발생했습니다.' };
    }

    revalidatePath(`/community/${comment.post_id}`);
    return { success: true };
}

export async function updateComment(commentId: number, content: string) {
    const { userId } = await auth();
    if (!userId) {
        return { error: '로그인이 필요합니다.' };
    }
    
    if (!content.trim()) {
        return { error: '댓글 내용을 입력해주세요.' };
    }

    const { data: comment, error: fetchError } = await supabase
        .from('comments')
        .select('id, user_id, post_id')
        .eq('id', commentId)
        .single();

    if (fetchError || !comment) {
        return { error: '댓글을 찾을 수 없습니다.' };
    }

    if (comment.user_id !== userId) {
        return { error: '수정할 권한이 없습니다.' };
    }
    
    try {
        const { error: updateError } = await supabase
            .from('comments')
            .update({ content: content.trim(), updated_at: new Date().toISOString() })
            .eq('id', commentId);

        if (updateError) throw updateError;
        
    } catch (error) {
        console.error('Error updating comment:', error);
        return { error: '댓글 수정 중 오류가 발생했습니다.' };
    }

    revalidatePath(`/community/${comment.post_id}`);
    return { success: true };
}

type PointLogPayload = {
  userId: string;
  type: 'POST_CREATION' | 'COMMENT_CREATION' | 'LIKE_RECEIVED' | 'ADMIN_ADJUSTMENT';
  amount: number;
  postId?: number;
  commentId?: number;
};

export async function addPointLog({ userId, type, amount, postId, commentId }: PointLogPayload) {
    
    // 1. 포인트 로그 기록
    const { error: logError } = await supabase
        .from('point_logs')
        .insert({
            user_id: userId,
            type,
            amount,
            post_id: postId,
            comment_id: commentId,
        });

    if (logError) {
        console.error('Error creating point log:', logError);
        return { error: '포인트 로그 기록 중 오류가 발생했습니다.' };
    }

    // 2. 사용자 프로필의 총 포인트 업데이트 (RPC 호출)
    const { error: rpcError } = await supabase.rpc('increment_user_points', {
        user_id_input: userId,
        points_to_add: amount
    });
    
    if (rpcError) {
        console.error('Error incrementing user points:', rpcError);
        // 여기서 로그 기록을 롤백하는 로직을 추가할 수도 있습니다.
        return { error: '사용자 포인트 업데이트 중 오류가 발생했습니다.' };
    }

    // 포인트를 받았다는 사실을 알리기 위해, 헤더 같은 공통 컴포넌트의 캐시를 재검증할 수 있습니다.
    revalidatePath('/'); 
    
    return { success: true };
}

export async function createReport({ postId, commentId, reason }: { postId?: number; commentId?: number; reason: string }) {
    const { userId } = await auth();
    if (!userId) {
        return { error: '로그인이 필요합니다.' };
    }

    if (!postId && !commentId) {
        return { error: '신고할 대상을 찾을 수 없습니다.' };
    }

    if (!reason.trim()) {
        return { error: '신고 사유를 입력해주세요.' };
    }
    
    try {
        const { error } = await supabase
            .from('reports')
            .insert({
                post_id: postId,
                comment_id: commentId,
                reason,
                user_id: userId,
            });

        if (error) throw error;
        
    } catch (error) {
        console.error('Error creating report:', error);
        return { error: '신고 접수 중 오류가 발생했습니다.' };
    }

    return { success: true, message: '신고가 정상적으로 접수되었습니다.' };
}

export async function getSignedUploadUrl(fileName: string, fileType: string) {
    const { userId } = await auth();
    if (!userId) {
        return { error: '로그인이 필요합니다.' };
    }

    try {
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const uniqueFileName = `${uniquePrefix}.${fileName.split('.').pop()}`;
        const filePath = `${userId}/${uniqueFileName}`;

        const { data, error } = await supabase
            .storage
            .from('posts')
            .createSignedUploadUrl(filePath, {
                 upsert: false 
            });

        if (error) {
            throw new Error('서명된 URL을 생성하는 데 실패했습니다: ' + error.message);
        }
        
        const { data: { publicUrl } } = supabase.storage.from('posts').getPublicUrl(filePath);

        return { success: true, signedUrl: data.signedUrl, path: data.path, publicUrl };

    } catch (e: any) {
        return { error: e.message };
    }
} 