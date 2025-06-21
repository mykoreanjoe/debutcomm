// import { getPost, updatePost } from '@/app/actions/posts';
import PostCreateForm from '@/components/community/PostCreateForm';
import { notFound } from 'next/navigation';
// import { currentUser } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// type EditPostPageProps = {
//     params: { id: string };
// };

// Dummy action for UI testing
const updatePost_dummy = async (postId: number, formData: FormData) => {
    console.log(`Dummy updatePost action triggered for post ${postId}.`);
    await new Promise(res => setTimeout(res, 1000));
    return { success: true, message: "UI 테스트: 게시글이 수정되었습니다." };
}

// export default async function EditPostPage({ params }: EditPostPageProps) {
export default async function EditPostPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }

    // const user = await currentUser();
    // const post = await getPost(id);
    // Dummy post data for UI testing
    const post = {
        title: '테스트 게시글 제목',
        content: '<p>이것은 테스트용 게시글 내용입니다.</p>',
        category_id: 1, // '자유'
        image_url: null
    };

    if (!post) {
        return notFound();
    }

    // Authorization check is disabled for UI testing
    // if (post.user_id !== user?.id) { ... }

    // Bind the postId to the updatePost action
    const updatePostWithId = updatePost_dummy.bind(null, id);

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