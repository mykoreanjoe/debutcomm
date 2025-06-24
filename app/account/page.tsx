import { redirect } from 'next/navigation';
import UpdateProfileForm from './UpdateProfileForm';
import { getAccountPageData } from './actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from 'react';
import PointHistory from './PointHistory';
import { PointHistorySkeleton } from './PointHistorySkeleton';
import MyPosts from './MyPosts';
import { MyPostsSkeleton } from './MyPostsSkeleton';
import MyComments from './MyComments';

export default async function AccountPage() {
  const { user, profile, posts, comments, points } = await getAccountPageData();

  if (!user || !profile) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">프로필 수정</TabsTrigger>
          <TabsTrigger value="posts">작성한 글</TabsTrigger>
          <TabsTrigger value="comments">작성한 댓글</TabsTrigger>
          <TabsTrigger value="points">포인트 내역</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UpdateProfileForm user={user} profile={profile} />
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          <MyPosts posts={posts} />
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <MyComments comments={comments} />
        </TabsContent>
        
        <TabsContent value="points" className="mt-6">
          <PointHistory points={points} />
        </TabsContent>

      </Tabs>
    </div>
  );
} 