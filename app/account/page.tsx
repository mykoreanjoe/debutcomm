import { redirect } from 'next/navigation';
import UpdateProfileForm from './UpdateProfileForm';
import { getProfileData } from './actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from 'react';
import PointHistory from './PointHistory';
import { PointHistorySkeleton } from './PointHistorySkeleton';
import MyPosts from './MyPosts';
import { MyPostsSkeleton } from './MyPostsSkeleton';

export default async function AccountPage() {
  const { user, profile } = await getProfileData();

  if (!user || !profile) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">프로필 수정</TabsTrigger>
          <TabsTrigger value="points">포인트 내역</TabsTrigger>
          <TabsTrigger value="posts">작성한 글</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UpdateProfileForm user={user} profile={profile} />
        </TabsContent>

        <TabsContent value="points" className="mt-6">
          <Suspense fallback={<PointHistorySkeleton />}>
            <PointHistory />
          </Suspense>
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
           <Suspense fallback={<MyPostsSkeleton />}>
            <MyPosts />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
} 