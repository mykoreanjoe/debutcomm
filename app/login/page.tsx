import { login, signup, signInWithKakao } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string, redirectTo?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect(searchParams.redirectTo || '/community')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <form action={login} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <input type="hidden" name="redirectTo" value={searchParams.redirectTo} />
          <Button type="submit" className="w-full">
            로그인
          </Button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <div className="text-center text-sm">
          계정이 없으신가요?{' '}
          <form action={signup} className="inline-block">
            <button type="submit" className="underline">
              회원가입
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>

        <form action={signInWithKakao}>
          <Button 
            variant="outline" 
            className="w-full bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
          >
            카카오로 시작하기
          </Button>
        </form>

      </div>
    </div>
  )
} 