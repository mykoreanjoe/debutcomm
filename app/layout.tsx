import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/sonner"
import localFont from 'next/font/local'
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";
import { createClient } from '@/lib/supabase/server';
import { Analytics } from "@vercel/analytics/react"

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.debutenglish.com'),
  title: {
    default: '같이 완성하는 목동데뷰영어',
    template: '%s | 목동데뷰영어',
  },
  description: '대한민국 최상위 1%의 영어 학습법, 데뷰영어에서 만나보세요.',
  openGraph: {
    title: '목동데뷰영어',
    description: '대한민국 최상위 1%의 영어 학습법',
    url: 'https://www.debutenglish.com',
    siteName: '데뷰영어',
    images: [
      {
        url: '/debutlogo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profile } = user
    ? await supabase.from("user_profile").select("id, nickname, avatar_url, points").eq("id", user.id).single()
    : { data: null };
  
  // 사용자는 있는데 프로필이 아직 없는 경우 (ex: 이메일 인증 직후)
  // AuthButton에 기본값을 전달하기 위한 임시 프로필 객체 생성
  if (user && !profile) {
    profile = {
      id: user.id,
      nickname: '신규 사용자',
      avatar_url: null,
      points: 0
    };
  }

  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`${pretendard.className} flex flex-col min-h-screen`}>
        <Header user={user} profile={profile} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <FloatingInquiryButton />
      </body>
    </html>
  );
}
