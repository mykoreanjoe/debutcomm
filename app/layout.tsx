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
          content="e9f7c31bafdaa9baf8373b13df3af5c1540dff2c"
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
