"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

function sanitize(dirty: string) {
  // 기본 설정에 추가적으로 허용할 태그나 속성을 여기에 정의할 수 있습니다.
  // 예를 들어, Tiptap 에디터가 사용하는 특정 태그나 스타일을 허용해야 할 수 있습니다.
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'img': ['src', 'alt', 'width', 'height'],
      'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
    },
  });
}

export async function toggleLike(postId: number) {
  // This function is commented out as per the instructions
  // It's not used in the new implementation
}

export async function deletePost(postId: number): Promise<{ error?: string }> {
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
    // 연결된 포인트 기록 삭제
    const { error: pointHistoryError } = await supabase
      .from('point_history')
      .delete()
      .eq('post_id', postId);

    if (pointHistoryError) {
      console.error('Error deleting point history:', pointHistoryError);
      return { error: '게시글의 포인트 기록을 삭제하는 중 오류가 발생했습니다.' };
    }

    // 게시글 삭제
    const { error: postError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (postError) throw postError;

  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: '게시글 삭제 중 오류가 발생했습니다.' };
  }

  revalidatePath('/community');
  redirect('/community');
}

export async function updatePost(postId: number, previousState: unknown, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: '로그인이 필요합니다.' };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const sanitizedContent = sanitize(content);

  if (!title || !sanitizedContent) {
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
      .update({ title, content: sanitizedContent, updated_at: new Date().toISOString() })
      .eq('id', postId);

    if (updateError) throw updateError;

  } catch (error) {
    console.error('Error updating post:', error);
    return { error: '게시글 수정 중 오류가 발생했습니다.' };
  }

  revalidatePath('/community', 'layout');
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

    // 포인트 유형에 따른 사유 메시지 생성
    const reasonMessages = {
        'POST_CREATION': '게시글 작성 보상',
        'COMMENT_CREATION': '댓글 작성 보상',
        'LIKE_RECEIVED': '좋아요 받음',
        'NICKNAME_SETUP': '닉네임 설정 보상',
        'ADMIN_ADJUSTMENT': '관리자 조정'
    };
    const reason = reasonMessages[type] || '기타 포인트 변동';

    // 2. 사용자 프로필의 총 포인트 업데이트 (RPC 호출)
    const { error: rpcError } = await supabase.rpc('change_user_points', {
        p_user_id: userId,
        p_amount: amount,
        p_reason: reason
    });

    if (rpcError) {
        console.error('Error changing user points:', rpcError);
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
                user_id: user.id,
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

const CreatePostSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상 입력해주세요."),
  content: z.string().min(20, "내용은 20자 이상 입력해주세요."),
  boardId: z.coerce.number().min(1, "게시판을 선택해주세요."),
});
export async function createPost(previousState: unknown, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    boardId: formData.get('board_id'),
  });

  if (!validatedFields.success) {
    return {
      error: '입력값이 올바르지 않습니다.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, content, boardId } = validatedFields.data;
  const sanitizedContent = sanitize(content);
  
  const { data: post, error } = await supabase
    .from('posts')
    .insert({ 
      title, 
      content: sanitizedContent,
      user_id: user.id,
      board_id: boardId,
    })
    .select()
    .single();

  if (error) {
    return { error: '게시글 생성에 실패했습니다.' };
  }

  revalidatePath('/community');
  return { success: true, redirectTo: `/community/${post.id}` };
}

export type CommentState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    content?: string[];
  };
};

export const createComment = async (prevState: unknown, formData: FormData): Promise<CommentState> => {
    'use server';
    const supabase = createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const schema = z.object({
        content: z.string().min(1, "댓글 내용을 입력해주세요."),
        postId: z.coerce.number(),
        parentId: z.coerce.number().optional().nullable(),
    });

    const validatedFields = schema.safeParse({
        content: formData.get('content'),
        postId: formData.get('postId'),
        parentId: formData.get('parentId'),
    });

    if (!validatedFields.success) {
        return {
            error: '입력값이 올바르지 않습니다.',
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { content, postId, parentId } = validatedFields.data;

    // DB 함수를 호출하여 댓글 생성, 포인트 지급, 알림 생성을 한번에 처리
    const { data: newComment, error: rpcError } = await supabase
        .rpc('create_comment_and_notification', {
            p_post_id: postId,
            p_user_id: user.id,
            p_content: content,
            p_parent_id: parentId,
        });

    if (rpcError) {
        console.error('Error creating comment:', rpcError);
        return { error: '댓글을 작성하는 중 오류가 발생했습니다.' };
    }

    revalidatePath(`/community/${postId}`);
    revalidatePath(`/community/[id]`, 'layout');
    return { success: true };
};

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

export async function uploadImage(formData: FormData) {
  const supabase = createClient();
  const file = formData.get('file') as File;
  if (!file) {
    return { error: '이미지 파일이 없습니다.' };
  }
  const fileName = `${crypto.randomUUID()}`;
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file);
  
  if (error) {
    return { error: error.message };
  }
  
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(data.path);

  return { url: publicUrl };
}

const ReportSchema = z.object({
  // ...
});
export async function report(prevState: unknown, formData: FormData) {
  // ... (function body for report)
}

export type Board = {
  id: number;
  name: string;
  slug: string;
};

export type PostForList = {
  id: number;
  created_at: string;
  title: string;
  view_count: number;
  user_profile: { nickname: string | null; avatar_url: string | null; } | null;
  board: { name: string; slug: string; } | null;
  likes: { count: number }[];
  comments: { count: number }[];
};

export async function getBoards(): Promise<Board[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('board').select('*').order('id', { ascending: true });
  if (error) {
    console.error("Error fetching boards:", error);
    return [];
  }
  return data;
}

export async function getPosts(
  page: number,
  limit: number,
  boardSlug?: string | null
): Promise<{ posts: PostForList[], count: number }> {
    const supabase = createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('posts')
        .select(`
            id, created_at, title, view_count,
            user_profile ( nickname, avatar_url ),
            board ( name, slug ),
            likes(count),
            comments(count)
        `, { count: 'exact' });

    if (boardSlug && boardSlug !== 'all') {
        query = query.eq('board.slug', boardSlug);
    }
    
    query = query.order('created_at', { ascending: false }).range(from, to);
    const { data, error, count } = await query;
    
    if (error) {
        console.error("Error fetching posts:", error);
        return { posts: [], count: 0 };
    }

    const posts: PostForList[] = data.map((p: any) => ({
      ...p,
      user_profile: Array.isArray(p.user_profile) ? p.user_profile[0] : p.user_profile,
      board: Array.isArray(p.board) ? p.board[0] : p.board,
      likes: Array.isArray(p.likes) ? p.likes : [],
      comments: Array.isArray(p.comments) ? p.comments : [],
    }));

    return { posts, count: count || 0 };
} 