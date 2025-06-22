import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, FileText, Users, UserCheck } from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { sessionClaims } = await auth();

    const userRole = (sessionClaims?.metadata as { role?: string })?.role;

    // 관리자가 아니면 홈페이지로 리디렉션
    if (userRole !== 'admin') {
        redirect('/');
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <div className="mb-8">
                    <Link href="/admin" className="flex items-center gap-2 text-2xl font-bold">
                        <ShieldCheck className="h-8 w-8 text-green-400" />
                        <span>관리자</span>
                    </Link>
                </div>
                <nav className="flex flex-col space-y-2">
                    <Link href="/admin/reports" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <FileText className="h-5 w-5" />
                        <span>신고 관리</span>
                    </Link>
                    <Link href="/admin/verifications" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <UserCheck className="h-5 w-5" />
                        <span>재원생 인증</span>
                    </Link>
                    {/* Add other admin links here later */}
                    <Link href="/admin/users" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <Users className="h-5 w-5" />
                        <span>사용자 관리</span>
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-8 bg-gray-100">
                {children}
            </main>
        </div>
    );
} 