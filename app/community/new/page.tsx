import PostCreateForm from '@/components/community/PostCreateForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/community" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    커뮤니티로 돌아가기
                </Link>
            </div>
            <PostCreateForm formAction={async () => ({ success: true })} />
        </div>
      </div>
    </div>
  );
} 