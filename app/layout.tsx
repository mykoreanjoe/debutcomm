import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import FloatingInquiryButton from "@/components/FloatingInquiryButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
          "min-h-screen bg-background antialiased"
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
