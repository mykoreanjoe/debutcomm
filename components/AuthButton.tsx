import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from '@/app/login/actions';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden sm:inline">{user.email}</span>
      <form action={signOut}>
        <Button variant="outline" size="sm">로그아웃</Button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      <Button variant="outline" size="sm">로그인</Button>
    </Link>
  );
} 