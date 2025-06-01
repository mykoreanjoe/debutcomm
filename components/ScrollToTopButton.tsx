"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle } from 'lucide-react';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="text-center mt-8 mb-4">
      <Button onClick={scrollToTop} variant="outline" size="sm" className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400">
        <ArrowUpCircle size={18} className="mr-2" />
        맨 위로 가기
      </Button>
    </div>
  );
};

export default ScrollToTopButton;