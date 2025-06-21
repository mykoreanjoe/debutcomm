'use client';

import React from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

// This type should be aligned with the data fetched from Supabase
export type PostForList = {
  id: number;
  category: string | null;
  title: string;
  author_id: string;
  author_name: string | null;
  created_at: string;
  view_count: number; // Placeholder
  like_count: number; // Placeholder
  comment_count: number;
};

export interface PostListProps {
  posts: PostForList[];
  showFeatured?: boolean;
  showStats?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, showFeatured = true, showStats = true }) => {
  const featuredPosts = showFeatured ? posts.slice(0, 3) : [];
  const regularPosts = showFeatured ? posts.slice(3) : posts;

  const renderPostRow = (post: PostForList) => (
    <TableRow key={post.id}>
      <TableCell className="text-center hidden sm:table-cell">
        {post.category && (
          <Badge variant="outline" className="text-gray-600">{post.category}</Badge>
        )}
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Link href={`/community/${post.id}`} className="hover:underline truncate">
            {post.title || '제목 없음'}
          </Link>
          <span className="text-gray-500 font-normal ml-1">[{post.comment_count}]</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Link href={`/users/${post.author_id}`} className="hover:underline hover:text-indigo-600">
          {post.author_name || '익명'}
        </Link>
      </TableCell>
      <TableCell className="text-center hidden sm:table-cell text-sm text-gray-500">
        {format(new Date(post.created_at), 'yyyy-MM-dd')}
      </TableCell>
      {showStats && (
        <>
          <TableCell className="text-center hidden md:table-cell">
            <div className="flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              {post.like_count}
            </div>
          </TableCell>
          <TableCell className="text-center hidden md:table-cell">
            <div className="flex items-center justify-center gap-1">
              <Eye className="w-4 h-4 text-gray-500" />
              {post.view_count}
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50/80">
            <TableHead className="w-[100px] text-center hidden sm:table-cell">분류</TableHead>
            <TableHead className="flex-1">제목</TableHead>
            <TableHead className="w-[120px] hidden md:table-cell">작성자</TableHead>
            <TableHead className="w-[120px] text-center hidden sm:table-cell">작성일</TableHead>
            {showStats && (
              <>
                <TableHead className="w-[100px] text-center hidden md:table-cell">추천</TableHead>
                <TableHead className="w-[100px] text-center hidden md:table-cell">조회</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {regularPosts.length > 0 ? (
            regularPosts.map(renderPostRow)
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                게시글이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostList; 