import { getPost, updatePost } from '@/app/actions/posts';
import PostCreateForm from '@/components/community/PostCreateForm';
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type EditPostPageProps = {
    params: { id: string };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }

    const user = await currentUser();
    const post = await getPost(id);

    if (!post) {
        return notFound();
    }

    // Authorization check
    if (post.user_id !== user?.id) {
        return (
            <div className="text-center py-24">
                <p className="text-lg text-red-600">수정 권한이 없습니다.</p>
                <Link href="/community" className="text-sm text-gray-600 mt-4 inline-block">
                    커뮤니티로 돌아가기
                </Link>
            </div>
        );
    }

    // Bind the postId to the updatePost action
    const updatePostWithId = updatePost.bind(null, id);

    return (
        <div className="bg-slate-50 min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <Link href={`/community/${id}`} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            게시글로 돌아가기
                        </Link>
                    </div>
                    <PostCreateForm 
                        formAction={updatePostWithId}
                        initialData={{
                            title: post.title || '',
                            content: post.content,
                            category_id: post.category_id,
                            image_url: post.image_url,
                        }}
                    />
                </div>
            </div>
        </div>
    );
} 