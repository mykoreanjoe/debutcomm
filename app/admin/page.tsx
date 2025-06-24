"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getUsers, getRoles, getAnnouncements, getDailyStatsForChart, getStatistics, DailyStat, AnnouncementForAdminPage } from "./actions";
import UserTable, { Role, UserWithRole } from "./UserTable";
import { StatCard, StatCardSkeleton } from "./StatCard";
import AnalyticsChart from "./AnalyticsChart";
import PaginationControls from "@/app/community/PaginationControls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? "1");
  const limit = 10;
  
  const [stats, setStats] = useState({ total_users: 0, total_posts: 0, total_comments: 0 });
  const [announcements, setAnnouncements] = useState<AnnouncementForAdminPage[]>([]);
  const [chartData, setChartData] = useState<DailyStat[]>([]);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [roles, setRoles] = useState<Role[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      const [statsData, announcementData, dailyStats, userData, rolesData] = await Promise.all([
        getStatistics(),
        getAnnouncements(1, 5), // 최근 5개만 가져옴
        getDailyStatsForChart(),
        getUsers(page, limit),
        getRoles()
      ]);
      
      setStats(statsData);
      setAnnouncements(announcementData.announcements);
      setChartData(dailyStats);
      setUsers(userData.users);
      setTotalUsers(userData.totalCount);
      setRoles(rolesData);
    }
    fetchData();
  }, [page]);
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-bold">관리자 대시보드</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>}>
          <StatCard title="총 사용자 수" value={stats.total_users} />
          <StatCard title="총 게시물 수" value={stats.total_posts} />
          <StatCard title="총 댓글 수" value={stats.total_comments} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>공지사항 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/announcements" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80">
              <div>
                <h3 className="font-semibold">공지사항 전체 목록</h3>
                <p className="text-sm text-muted-foreground">공지사항을 작성, 수정, 삭제합니다.</p>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>콘텐츠 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/content/posts" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80">
              <div>
                <h3 className="font-semibold">게시물 관리</h3>
                <p className="text-sm text-muted-foreground">모든 게시물을 검색하고 관리합니다.</p>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/admin/content/comments" className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80">
              <div>
                <h3 className="font-semibold">댓글 관리</h3>
                <p className="text-sm text-muted-foreground">모든 댓글을 검색하고 관리합니다.</p>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>사용자 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable initialUsers={users} roles={roles} />
          <div className="mt-4 flex justify-center">
            <PaginationControls
              currentPage={page}
              totalCount={totalUsers}
              postsPerPage={limit}
              path="/admin"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <AnalyticsChart data={chartData} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>최근 공지사항</CardTitle>
            <Link href="/admin/announcements">
              <Button variant="outline" size="sm">전체 보기</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary">
                  <Link href={`/community/announcements/${announcement.id}`} className="hover:underline">
                    <h3 className="font-semibold">{announcement.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{new Date(announcement.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 