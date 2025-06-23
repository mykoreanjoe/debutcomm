import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?message=관리자 페이지에 접근하려면 로그인이 필요합니다.');
  }

  const { data: userProfile } = await supabase
    .from('user_profile')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!userProfile?.is_admin) {
    redirect('/?error=접근 권한이 없습니다.');
  }

  return (
    <div>
      {/* <h1>Admin Layout</h1> */}
      <main>{children}</main>
    </div>
  );
} 