"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 페이지가 변경될 때마다 짧은 애니메이션 효과를 줍니다.
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300); // 애니메이션 지속 시간
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main
      key={pathname}
      className={`flex-grow pt-16 ${isAnimating ? 'page-transition-enter-active' : ''}`}
    >
      {children}
    </main>
  );
} 