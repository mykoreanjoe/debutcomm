"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function toggleLike(postId: number) {
  // This function is commented out as per the instructions
  // It's not used in the new implementation
}

export async function deletePost(postId: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
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

  if (post.user_id !== user.id) {
    return { error: '삭제할 권한이 없습니다.' };
  }
  
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
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
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

  if (post.user_id !== user.id) {
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
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
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

    if (comment.user_id !== user.id) {
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

    revalidatePath(`/community/${comment.post_id}`, 'layout');
    return { success: true };
}

export async function updateComment(commentId: number, content: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
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

    if (comment.user_id !== user.id) {
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

    revalidatePath(`/community/${comment.post_id}`, 'layout');
    return { success: true };
}

type PointLogPayload = {
  userId: string;
  type: 'POST_CREATION' | 'COMMENT_CREATION' | 'LIKE_RECEIVED' | 'ADMIN_ADJUSTMENT' | 'NICKNAME_SETUP';
  amount: number;
  postId?: number;
  commentId?: number;
};

export async function addPointLog({ userId, type, amount, postId, commentId }: PointLogPayload) {
    const supabase = createClient();
    
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
        return { error: '사용자 포인트 업데이트 중 오류가 발생했습니다.' };
    }

    return { success: true };
}

export async function createReport({ postId, commentId, reason }: { postId?: number; commentId?: number; reason: string }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    if (!reason) {
        return { error: '신고 사유를 입력해주세요.' };
    }

    try {
        const { error } = await supabase
            .from('reports')
            .insert({
                post_id: postId,
                comment_id: commentId,
                reason: reason,
                reporter_id: user.id,
            });
        
        if (error) throw error;

        if (postId) revalidatePath(`/community/${postId}`);

        return { success: true };
    } catch (error) {
        console.error('Error creating report:', error);
        return { error: '신고 접수 중 오류가 발생했습니다.' };
    }
}

export async function getSignedUploadUrl(fileName: string, fileType: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: '로그인이 필요합니다.' };
    }

    // 파일 경로를 user_id와 타임스탬프를 포함하여 고유하게 만듭니다.
    const path = `${user.id}/${Date.now()}_${fileName}`;

    const { data, error } = await supabase.storage
        .from('post') // 이미지를 저장할 버킷 이름
        .createSignedUploadUrl(path);

    if (error) {
        console.error('Error creating signed upload URL:', error);
        return { success: false, error: 'Signed URL 생성에 실패했습니다.' };
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
        .from('post')
        .getPublicUrl(path);

    return { success: true, signedUrl: data.signedUrl, path, publicUrl };
}

type CreatePostState = {
  error: string | null;
  redirectTo?: string | null;
}

export async function createPost(formData: FormData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: '로그인이 필요합니다.' };
  }
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const boardId = Number(formData.get('boardId'));

  if (!title || !content || !boardId) {
    return { error: '제목, 내용, 게시판은 필수 입력 항목입니다.' };
  }
  
  const { data, error } = await supabase.rpc('create_post_and_award_points', {
    p_user_id: user.id,
    p_title: title,
    p_content: content,
    p_board_id: boardId
  }).single<{ id: number }>();

  if (error) {
    console.error('Error creating post:', error);
    return { error: '게시글을 생성하는 중 오류가 발생했습니다.' };
  }

  const newPostId = data.id;
  
  revalidatePath('/community', 'layout');
  redirect(`/community/${newPostId}`);
}

export async function createComment(postId: number, content: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '댓글을 작성하려면 로그인이 필요합니다.' };
  }
  
  if (!content.trim()) {
    return { error: '댓글 내용을 입력해주세요.' };
  }

  const { error } = await supabase.rpc('create_comment_and_award_points', {
    p_user_id: user.id,
    p_post_id: postId,
    p_content: content.trim()
  });

  if (error) {
    console.error('Error creating comment:', error);
    return { error: '댓글 등록 중 오류가 발생했습니다.' };
  }

  revalidatePath(`/community/${postId}`);
  return { success: true };
}

export async function likePost(postId: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '로그인이 필요합니다.' };
  }

  const { error } = await supabase.from('likes').insert({
    post_id: postId,
    user_id: user.id,
  });

  if (error) {
    console.error('Error liking post:', error);
    return { error: '좋아요 처리 중 오류가 발생했습니다.' };
  }
  
  revalidatePath(`/community/[id]`, 'layout');
  return { success: true };
}

export async function unlikePost(postId: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '로그인이 필요합니다.' };
  }

  const { error } = await supabase.from('likes').delete()
    .eq('post_id', postId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error unliking post:', error);
    return { error: '좋아요 취소 중 오류가 발생했습니다.' };
  }
  
  revalidatePath(`/community/[id]`, 'layout');
  return { success: true };
} 