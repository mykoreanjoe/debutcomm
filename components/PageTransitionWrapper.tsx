"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    if (pathname !== key) {
      setTransitioning(true);
      setTimeout(() => {
        setKey(pathname);
        setTransitioning(false);
      }, 300); // CSS transition duration과 일치시킵니다.
    }
  }, [pathname, key]);

  return (
    <main key={key} className={transitioning ? 'page-transition-exit-active' : 'page-transition-enter-active'}>
      {children}
    </main>
  );
} 