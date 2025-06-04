// "use client"; // 최상단 "use client" 제거
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingInquiryButton from "@/components/FloatingInquiryButton";
// ClerkProvider 및 관련 import 주석 처리 또는 삭제
// import {
//   ClerkProvider,
// } from "@clerk/nextjs";
// import { usePathname } from 'next/navigation'; // 제거
// import { useEffect, useState } from 'react'; // 제거
import PageTransitionWrapper from '@/components/PageTransitionWrapper'; // 새로 추가

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "데뷰 영어 학원",
  description: "데뷰 영어 학원: 같이 완성, Let's Do It! 목동, 양천구, 신정동 대표 영어학원. 초등 영어회화부터 중등 내신, 수능 대비까지.",
  keywords: [
    // 지역 기반
    "목동 영어학원", "양천구 영어학원", "신정동 영어학원", 
    "신목초 영어학원", "목동초 영어학원", "목일중 영어학원",
    "목동 초등영어", "목동 중등영어",
    // 수업/방식 기반
    "초등 영어 회화", "중등 영어 문법", "영어 쉐도잉", "영어 단어 암기", 
    "1:1 영어 튜터링", "영어 내신 대비", "수능 영어 대비", "온라인 영어 학습",
    "파닉스", "영어원서읽기", "스피킹", "라이팅",
    // 경쟁 및 기타 주요 키워드
    "폴리어학원 비교", "프라미스어학원 비교", "현재어학원 비교", "씨앤씨어학원 비교", 
    "특목고 영어 대비", "영어 학습 습관", "자기주도학습 영어", "소수정예 영어학원"
  ],
  // OG 이미지 정보 추가
  openGraph: {
    title: "데뷰 영어 학원 | 같이 완성, Let's Do It!",
    description: "목동, 양천구, 신정동 대표 영어학원. 초등 영어회화부터 중등 내신, 수능 대비까지. 데뷰에서 영어 실력을 완성하세요!",
    url: "https://www.debutenglish.com", // 실제 웹사이트 URL로 변경 필요
    siteName: "데뷰 영어 학원",
    images: [
      {
        url: "/images/og-default.png", // '/public' 폴더 기준 경로
        width: 1200,
        height: 630,
        alt: "데뷰 영어 학원 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: { // 트위터 카드 정보 (선택 사항이지만 권장)
    card: "summary_large_image",
    title: "데뷰 영어 학원 | 같이 완성, Let's Do It!",
    description: "목동, 양천구, 신정동 대표 영어학원. 데뷰에서 영어 실력을 완성하세요!",
    images: ["/images/og-default.png"], // 트위터용 이미지도 동일하게 사용
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname(); // 제거
  // const [transitioning, setTransitioning] = useState(false); // 제거
  // const [key, setKey] = useState(pathname); // 제거

  // useEffect(() => { // 제거
  //   if (pathname !== key) {
  //     setTransitioning(true);
  //     setTimeout(() => {
  //       setKey(pathname);
  //       setTransitioning(false);
  //     }, 300);
  //   }
  // }, [pathname, key]); // 제거

  return (
    <html lang="ko">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WNBBJY06SL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WNBBJY06SL');
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Header 내 Clerk 관련 버튼은 Header 컴포넌트에서 직접 제거 예정 */}
        <Header />
        <PageTransitionWrapper>{children}</PageTransitionWrapper> {/* PageTransitionWrapper 사용 */}
        <Footer />
        <FloatingInquiryButton />
      </body>
    </html>
  );
}
