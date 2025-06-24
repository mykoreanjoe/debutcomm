import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 세션 교환이 성공하면, 추가 정보 입력 페이지로 보냅니다.
      // additional-info 페이지에서 프로필 완성 여부를 확인하고
      // 이미 완료된 사용자는 원래 목적지로 리디렉션하게 됩니다.
      return NextResponse.redirect(`${origin}/additional-info`)
    }
  }

  // 오류 발생 시 로그인 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/login?error=Authentication failed`)
} 