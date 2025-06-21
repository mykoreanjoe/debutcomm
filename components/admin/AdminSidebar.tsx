'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, UserCheck, BookOpen, CreditCard, BarChart2, Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/admin', label: '대시보드', icon: Home },
    { href: '/admin/accounts', label: '계정/권한 관리', icon: Users },
    { href: '/admin/enrollment', label: '재원생 인증', icon: UserCheck },
    { href: '/admin/classes', label: '반/학생 관리', icon: BookOpen },
    { href: '/admin/payments', label: '결제/미납 관리', icon: CreditCard },
    { href: '/admin/data', label: '학습 데이터', icon: BarChart2 },
    { href: '/admin/community', label: '커뮤니티 관리', icon: Shield },
    { href: '/admin/settings', label: '통계/설정', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-gray-50 p-4">
            <div className="mb-8 text-2xl font-bold text-center">
                <Link href="/admin">Debut Edu</Link>
            </div>
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                isActive
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
} 