import { getAdminDashboardStats, getUnpaidStudentsList, getAllClasses } from "@/app/actions/admin";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { UnpaidStudentsPanel } from "@/components/admin/dashboard/UnpaidStudentsPanel";
import SectionTitle from "@/components/SectionTitle";
import { AlertTriangle, BarChart2, Bell, BookOpen, CreditCard, UserCheck, Users } from "lucide-react";
import { format } from "date-fns";

interface AdminDashboardPageProps {
    searchParams: {
        month?: string; // YYYY-MM
        classId?: string;
    }
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
    const month = searchParams.month ? `${searchParams.month}-01` : format(new Date(), 'yyyy-MM-01');
    const classId = searchParams.classId ? parseInt(searchParams.classId, 10) : undefined;
    
    // Fetch data in parallel
    const [stats, unpaidStudents, allClasses] = await Promise.all([
        getAdminDashboardStats(),
        getUnpaidStudentsList(month, classId),
        getAllClasses()
    ]);

    return (
        <div className="space-y-6">
            <SectionTitle title="대시보드" subtitle="전체 현황을 한 눈에 확인하세요." />

            {/* Stat Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="신규 인증요청" 
                    value={stats?.pending_auth_requests ?? 0}
                    icon={Bell}
                    description="승인 대기중인 재원생/학부모"
                />
                <StatCard 
                    title="재원생 현원" 
                    value={stats?.total_students ?? 0}
                    icon={Users}
                    description="현재 인증된 총 학생 수"
                />
                <StatCard 
                    title="반 / 강사 현황" 
                    value={`${stats?.total_classes ?? 0}반 / ${stats?.total_teachers ?? 0}명`}
                    icon={BookOpen}
                    description="전체 반과 강사 수"
                />
                <StatCard 
                    title="결제 미납자 (이번 달)" 
                    value={`${stats?.unpaid_this_month ?? 0}명`}
                    icon={AlertTriangle}
                    description="이번 달 수납 기간 내 미납자"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Unpaid Students Panel */}
                <div className="lg:col-span-2">
                    <UnpaidStudentsPanel 
                        unpaidStudents={unpaidStudents} 
                        allClasses={allClasses}
                    />
                </div>

                {/* Quick Actions & Recent Activity (Placeholder) */}
                <div className="space-y-6">
                    <StatCard 
                        title="오늘 출결체크" 
                        value={`${stats?.today_attendance_count ?? 0}명`}
                        icon={UserCheck}
                    />
                    <StatCard 
                        title="최근 결제 (지난 7일)" 
                        value={`${stats?.recent_payments_week ?? 0}건`}
                        icon={CreditCard}
                    />
                </div>
            </div>
        </div>
    );
} 