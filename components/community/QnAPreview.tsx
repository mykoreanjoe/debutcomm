'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquareQuoteIcon, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PostForList } from './PostList'; // Reuse type from PostList

interface QnAPreviewProps {
  posts: PostForList[];
}

const QnAPreview: React.FC<QnAPreviewProps> = ({ posts }) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <MessageSquareQuoteIcon className="w-6 h-6 mr-3 text-sky-600" />
          최근 Q&A 질문
        </CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length > 0 ? (
            <ul className="space-y-4">
            {posts.map((post) => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex-1 mb-2 sm:mb-0">
                        <Link href={`/community/${post.id}`} className="font-semibold text-gray-800 hover:underline">
                            <span className="mr-2">Q.</span>{post.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                            <span>{post.author_name}</span>
                            <span className="mx-1.5">·</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Placeholder for answer status */}
                        {post.comment_count > 0 ? (
                            <Badge variant="secondary" className="bg-teal-100 text-teal-800">답변완료</Badge>
                        ) : (
                            <Badge variant="outline">답변대기</Badge>
                        )}
                        <span className="flex items-center text-sm text-gray-600">
                            <ThumbsUp className="w-4 h-4 mr-1.5 text-red-400"/>
                            {post.like_count}
                        </span>
                    </div>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-center text-gray-500 py-6">
                아직 Q&A 질문이 없습니다.
            </p>
        )}
      </CardContent>
    </Card>
  );
};

export default QnAPreview; 