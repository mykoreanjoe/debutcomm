'use server';

import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// ====================================================================
// Type Definitions
// ====================================================================

export type UserProfile = {
  user_id: string;
  name: string;
  role: string;
  email: string;
  student_id: string | null;
  points: number;
  is_verified: boolean;
  image_url?: string;
};

export type Category = {
  id: number;
  name: string;
  description: string | null;
};

export type Post = {
  id: number;
  user_id: string;
  category_id: number | null;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  user_profile: UserProfile | null;
  comments: { count: number }[];
  category: string | null;
  likes: any[];
};

export type Comment = {
  id: number;
  created_at: string;
  author_id: string;
  post_id: number;
  content: string;
  is_private: boolean;
  user_profile: UserProfile;
};

export type CommentWithUser = {
  id: number;
  post_id: number;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_private: boolean;
  users: {
      name: string | null;
      role: string | null;
  } | null;
};

// Re-exporting Post as PostType for client-side usage consistency
export type PostType = Post;

// Defining and exporting UserType
export type UserType = {
    id: string | undefined;
};


// ====================================================================
// Category Actions
// ====================================================================

export async function getCategories(): Promise<Category[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}


// ====================================================================
// Post Actions
// ====================================================================

export async function getPosts(
    category?: string, 
    query?: string, 
    page: number = 1, 
    limit: number = 10
) {
  const supabase = createSupabaseServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  let countQuery = supabase
    .from('posts')
    .select('id', { count: 'exact', head: true });

  let dataQuery = supabase
    .from('posts')
    .select(`
      id, title, created_at, user_id,
      users ( name ),
      categories ( name ),
      comments ( count )
    `)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (category && category !== 'all') {
    countQuery = countQuery.eq('categories.name', category);
    dataQuery = dataQuery.eq('categories.name', category);
  }

  if (query) {
    const searchQuery = `title.ilike.%${query}%,content.ilike.%${query}%`;
    countQuery = countQuery.or(searchQuery);
    dataQuery = dataQuery.or(searchQuery);
  }

  const [{ data: posts, error: postsError }, { count, error: countError }] = await Promise.all([
    dataQuery,
    countQuery
  ]);

  if (postsError || countError) {
    console.error('Error fetching posts or count:', postsError || countError);
    return { posts: [], totalCount: 0 };
  }

  const formattedPosts = posts.map(p => ({
    id: p.id,
    title: p.title,
    author_id: p.user_id,
    author_name: (p.users as any)?.name || '익명',
    category: (p.categories as any)?.name || null,
    created_at: p.created_at,
    comment_count: p.comments[0]?.count || 0,
    like_count: 0, // Placeholder
    view_count: 0, // Placeholder
  }));

  return { posts: formattedPosts, totalCount: count ?? 0 };
}

export async function getPost(id: number): Promise<Post | null> {
    const supabase = createSupabaseServerClient();
    if (isNaN(id)) return null;

    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            user_profile(*),
            categories(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }
    // likes and comments count can be fetched separately if needed or handled in the component
    return { ...data, likes: [], comments: [] } as unknown as Post;
}

export async function createPost(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const user = await currentUser();
  if (!user) throw new Error('Authentication required.');

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const categoryId = Number(formData.get('categoryId'));
  const imageFile = formData.get('image') as File;

  if (!title || !content || !categoryId) {
    return { success: false, message: '제목, 내용, 카테고리는 필수입니다.' };
  }

  // RBAC Check for "Notice" category (assuming categoryId 5 is '공지사항')
  if (categoryId === 5) {
      const userRole = user.publicMetadata?.role;
      if (userRole !== 'admin' && userRole !== 'teacher') {
          return { success: false, message: '공지사항 작성 권한이 없습니다.' };
      }
  }

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const filePath = `public/posts/${user.id}/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { success: false, message: '이미지 업로드에 실패했습니다.' };
    }
    const { data: publicUrlData } = supabase.storage.from('posts').getPublicUrl(filePath);
    imageUrl = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      category_id: categoryId,
      title,
      content,
      image_url: imageUrl,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return { success: false, message: '게시글 생성에 실패했습니다.' };
  }

  revalidatePath('/community');
  revalidatePath(`/community/${data.id}`);
  redirect(`/community/${data.id}`);
}

export async function updatePost(postId: number, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const user = await currentUser();
  if (!user) throw new Error('Authentication required.');

  const { data: postToUpdate, error: fetchError } = await supabase
    .from('posts')
    .select('user_id, image_url')
    .eq('id', postId)
    .single();

  if (fetchError || !postToUpdate) {
    return { success: false, message: '게시글을 찾을 수 없습니다.' };
  }

  if (postToUpdate.user_id !== user.id) {
    return { success: false, message: '수정 권한이 없습니다.' };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const categoryId = Number(formData.get('categoryId'));
  const imageFile = formData.get('image') as File;
  const deleteImage = formData.get('deleteImage') === 'on';

  if (!title || !content || !categoryId) {
    return { success: false, message: '제목, 내용, 카테고리는 필수입니다.' };
  }

  let newImageUrl: string | null = postToUpdate.image_url;

  // Case 1: New image is uploaded
  if (imageFile && imageFile.size > 0) {
    // Delete the old image from storage if it exists
    if (postToUpdate.image_url) {
      const oldImagePath = postToUpdate.image_url.substring(postToUpdate.image_url.lastIndexOf('/') + 1);
      if (oldImagePath) {
          await supabase.storage.from('post-images').remove([oldImagePath]);
      }
    }
    // Upload the new image
    const fileName = `${user.id}-${Date.now()}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading new image:', uploadError);
      return { success: false, message: '이미지 업로드에 실패했습니다.' };
    }
    
    const { data: { publicUrl } } = supabase.storage.from('post-images').getPublicUrl(uploadData.path);
    newImageUrl = publicUrl;
  } 
  // Case 2: No new image, but "delete" is checked
  else if (deleteImage && postToUpdate.image_url) {
    const oldImagePath = postToUpdate.image_url.substring(postToUpdate.image_url.lastIndexOf('/') + 1);
    if (oldImagePath) {
        await supabase.storage.from('post-images').remove([oldImagePath]);
    }
    newImageUrl = null;
  }
  
  const { error: updateError } = await supabase
    .from('posts')
    .update({
      title,
      content,
      category_id: categoryId,
      image_url: newImageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId);

  if (updateError) {
    console.error('Error updating post:', updateError);
    return { success: false, message: '게시글 수정에 실패했습니다.' };
  }

  revalidatePath('/community');
  revalidatePath(`/community/${postId}`);
  redirect(`/community/${postId}`);
}

export async function deletePost(postId: number) {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) throw new Error('Authentication required.');

    // RLS will enforce ownership, but we can check for admin role here for clarity
    const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('author_id')
        .eq('id', postId)
        .single();

    if (fetchError || !post) {
        return { success: false, message: '게시글을 찾을 수 없습니다.' };
    }

    if (post.author_id !== user.id && user.publicMetadata.role !== 'admin') {
        return { success: false, message: '삭제 권한이 없습니다.' };
    }

    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
        console.error('Error deleting post:', error);
        return { success: false, message: '게시글 삭제에 실패했습니다.' };
    }

    revalidatePath('/community');
    redirect('/community');
}

export async function getMyPosts() {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) return [];

    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            id,
            title,
            created_at,
            users ( name ),
            categories ( name ),
            comments ( count )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching my posts:', error);
        return [];
    }
    
    // This should align with PostForList type
    return posts.map((p: any) => ({
        id: p.id,
        title: p.title,
        author_name: (p.users as any)?.name || '익명',
        category: (p.categories as any)?.name || null,
        created_at: p.created_at,
        comment_count: p.comments[0]?.count || 0,
        like_count: 0, // Placeholder
        view_count: 0, // Placeholder
    }));
}

export async function getMyComments() {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('comments')
        .select(`
            id,
            content,
            created_at,
            posts ( id, title )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching my comments:', error);
        return [];
    }

    return data.map((comment: any) => ({
        ...comment,
        posts: Array.isArray(comment.posts) ? comment.posts[0] : comment.posts,
    }));
}

// ====================================================================
// Comment Actions
// ====================================================================

export async function getComments(postId: number): Promise<CommentWithUser[]> {
    const supabase = createSupabaseServerClient();

    const { data: comments, error } = await supabase
        .from('comments')
        .select(`
            *,
            users ( name, role )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return comments as CommentWithUser[];
}

export async function createComment(formData: FormData) {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) throw new Error('Authentication required.');

    const content = formData.get('content') as string;
    const postId = Number(formData.get('postId'));
    const isPrivate = formData.get('isPrivate') === 'true';

    if (!content || !postId) {
        return { success: false, message: '내용을 입력해주세요.' };
    }

    const { error } = await supabase.from('comments').insert({
        author_id: user.id,
        post_id: postId,
        content,
        is_private: isPrivate,
    });

    if (error) {
        console.error('Error creating comment:', error);
        return { success: false, message: '댓글 작성에 실패했습니다.' };
    }

    revalidatePath(`/community/${postId}`);
    return { success: true, message: '댓글이 작성되었습니다.' };
}

export async function deleteComment(commentId: number, postId: number) {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) throw new Error('Authentication required.');

    // RLS will enforce ownership, but we can check here as well.
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) {
        console.error('Error deleting comment:', error);
        return { success: false, message: '댓글 삭제에 실패했습니다.' };
    }

    revalidatePath(`/community/${postId}`);
    return { success: true, message: '댓글이 삭제되었습니다.' };
}

// ====================================================================
// Like Actions
// ====================================================================

export async function toggleLikePost(postId: number) {
    const supabase = createSupabaseServerClient();
    const user = await currentUser();
    if (!user) throw new Error('Authentication required.');

    // Check if the user already liked the post
    const { data: existingLike, error: likeError } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

    if (likeError && likeError.code !== 'PGRST116') { // PGRST116: no rows found
        console.error("Error checking for existing like:", likeError);
        return { success: false, message: "좋아요 처리 중 오류가 발생했습니다." };
    }

    if (existingLike) {
        // User already liked it, so unlike it
        const { error: deleteError } = await supabase.from('likes').delete().eq('id', existingLike.id);
        if (deleteError) {
            console.error('Error unliking post:', deleteError);
            return { success: false, message: '좋아요 취소에 실패했습니다.' };
        }
        revalidatePath(`/community/${postId}`);
        return { success: true, message: '추천을 취소했습니다.', newState: 'unliked' };
    } else {
        // User has not liked it, so add a like
        const { error: insertError } = await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
        if (insertError) {
            console.error('Error liking post:', insertError);
            return { success: false, message: '추천에 실패했습니다.' };
        }
        revalidatePath(`/community/${postId}`);
        return { success: true, message: '게시글을 추천했습니다!', newState: 'liked' };
    }
}

export async function getLikes(postId: number) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId);

    if (error) {
        console.error("Error fetching likes", error);
        return [];
    }
    return data;
}

export async function getPostById(id: number) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*, users!inner(*), likes(user_id)')
        .eq('id', id)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getPopularPosts() {
    const supabase = createSupabaseServerClient();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const { data, error } = await supabase
        .from('posts')
        .select(`
            id, title, created_at, user_id,
            users ( name ),
            categories ( name ),
            likes ( count ),
            comments ( count )
        `)
        .gte('created_at', oneMonthAgo.toISOString())
        .order('likes', { foreignTable: 'likes', ascending: false })
        .limit(3);
    
    if (error) {
        console.error('Error fetching popular posts:', error);
        return [];
    }

    const formattedPosts = data.map(p => ({
        id: p.id,
        title: p.title,
        author_id: p.user_id,
        author_name: (p.users as any)?.name || '익명',
        category: (p.categories as any)?.name || null,
        created_at: p.created_at,
        comment_count: p.comments[0]?.count || 0,
        like_count: p.likes[0]?.count || 0,
        view_count: 0, // Placeholder
    }));

    return formattedPosts;
} 