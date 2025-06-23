import PaginationControls from "@/app/community/PaginationControls";
import { Suspense } from "react";
import { getUsers, getDashboardStats, getRoles } from "./actions";
import UserTable from "./UserTable";
import { StatCard, StatCardSkeleton } from "./StatCard";
import { Users, FileText, MessageSquare } from 'lucide-react';

async function DashboardStats() {
  const stats = await getDashboardStats();
  return (
    <>
      <StatCard 
        title="총 사용자" 
        value={stats.total_users} 
        icon={Users} 
        description={`${stats.today_users_count}명 오늘 가입`}
      />
      <StatCard 
        title="오늘의 게시글" 
        value={stats.today_posts_count} 
        icon={FileText} 
      />
      <StatCard 
        title="오늘의 댓글" 
        value={stats.today_comments_count} 
        icon={MessageSquare} 
      />
    </>
  );
}

const USERS_PER_PAGE = 15;

export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const page = Number(searchParams.page ?? "1");
  const limit = Number(searchParams.limit ?? USERS_PER_PAGE);

  const [{ users, totalCount }, roles] = await Promise.all([
    getUsers(page, limit),
    getRoles()
  ]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">관리자 대시보드</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Suspense fallback={
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        }>
          <DashboardStats />
        </Suspense>
      </div>

      <h2 className="text-xl font-semibold mb-4">사용자 관리</h2>
      <UserTable initialUsers={users} roles={roles} />
      <div className="mt-4 flex justify-center">
        <PaginationControls
          currentPage={page}
          totalCount={totalCount}
          postsPerPage={limit}
        />
      </div>
    </div>
  );
} 