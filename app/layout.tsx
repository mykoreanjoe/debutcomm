import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="e8c89b33a7f8b7c7b67b732e4d5b2db0f8a8b8c8"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <PageTransitionWrapper>
            <main className="flex-grow pt-16">{children}</main>
          </PageTransitionWrapper>
          <Footer />
          <FloatingInquiryButton />
        </div>
      </body>
    </html>
  );
}
