import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// ClerkProvider 및 관련 import 주석 처리 또는 삭제
// import {
//   ClerkProvider,
// } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "데뷰 영어 학원",
  description: "데뷰 영어 학원: 같이 완성, Let's Do It!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider> // ClerkProvider 제거
      <html lang="ko">
        <body className={inter.className}>
          {/* Header 내 Clerk 관련 버튼은 Header 컴포넌트에서 직접 제거 예정 */}
          <Header />
          <main>{children}</main>
        </body>
      </html>
    // </ClerkProvider> // ClerkProvider 제거
  );
}
