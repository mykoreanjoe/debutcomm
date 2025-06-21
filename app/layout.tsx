import type { Metadata } from 'next';
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";
import FloatingCommunityButton from '@/components/FloatingCommunityButton';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner"
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.debutenglish.com'), // 실제 운영 도메인으로 변경해야 합니다.
  title: {
    default: '목동데뷰영어',
    template: '%s | 목동데뷰영어',
  },
  description: '가장 완성도 높은 영어, 같이 완성합니다. 목동 대표 영어학원, 데뷰.',
  openGraph: {
    title: '목동데뷰영어',
    description: '가장 완성도 높은 영어, 같이 완성합니다.',
    images: ['/debutlogo.png'],
    siteName: '목동데뷰영어',
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
    <ClerkProvider>
      <html lang="ko" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="naver-site-verification"
            content="e9f7c31bafdaa9baf8373b13df3af5c1540dff2c"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            pretendard.className
          )}
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
            <Footer />
            <FloatingInquiryButton />
            <FloatingCommunityButton />
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
