import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/sonner"
import localFont from 'next/font/local'
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";
import AuthButton from '@/components/AuthButton';
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
    default: '목동데뷰영어 | 대한민국 최상위 1% 영어',
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className}>
        <PageTransitionWrapper>
          <Header>
            <AuthButton />
          </Header>
          <main className="pt-16 bg-slate-50">
            {children}
          </main>
          <Footer />
        </PageTransitionWrapper>
        <FloatingInquiryButton />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
