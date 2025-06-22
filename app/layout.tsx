import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";
import { Toaster } from 'sonner';
import AuthButton from '@/components/AuthButton';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header>
            <AuthButton />
          </Header>
          <main className="flex-grow">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </main>
          <Toaster />
          <FloatingInquiryButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
