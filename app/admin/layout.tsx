import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { UserButton } from '@clerk/nextjs';

async function isUserAdmin(userId: string): Promise<boolean> {
    // This is a simplified check. In a real app, you might use clerkClient.
    const user = await currentUser();
    return user?.publicMetadata.role === 'admin';
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    if (!user || !(await isUserAdmin(user.id))) {
        redirect('/');
    }

    return (
        <div className="flex h-screen bg-white">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <header className="flex h-16 items-center justify-end border-b bg-white px-6">
                    <UserButton afterSignOutUrl="/" />
                </header>
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
} 