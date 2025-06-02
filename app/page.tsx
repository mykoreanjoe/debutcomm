import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 text-center">
      {/* 학습경험 섹션 (초등부) 삭제 */}
      {/* 학습경험 섹션 (중등부) 삭제 */}

      <AnimatedSection delay={0}>
        <Link href="/">
          <Image 
            src="/debutlogo.png" 
            alt="데뷰 영어 학원 로고" 
            width={240}
            height={120}
            priority
          />
        </Link>
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <h1 className="text-3xl md:text-5xl font-bold mt-8">
          가장 완성도 높은 영어
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mt-2 text-[#13588f]">
          같이 완성합니다
        </h2>
      </AnimatedSection>
      
      <AnimatedSection delay={0}>
        <p className="mt-8 text-md md:text-lg text-gray-600">
          신목초, 목동초, 목일중, 목동중 학생들을 전문으로 관리하고 있습니다.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0}>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#F0D900] text-gray-800 font-semibold btn-apple-style">
            <Link href="/reservation">테스트 예약</Link>
          </Button>
          <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#F0D900] text-gray-800 font-semibold btn-apple-style">
            <Link href="/consulting">상담 받기</Link>
          </Button>
          <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#F0D900] text-gray-800 font-semibold btn-apple-style">
            <Link href="https://blog.naver.com/ourdebut" target="_blank" rel="noopener noreferrer">
              데뷰 블로그
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* 네이버 블로그 바로가기 버튼 - 위 div로 통합 */}
      {/* <div className="mt-12">
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white btn-apple-style">
          <Link href="https://blog.naver.com/ourdebut" target="_blank" rel="noopener noreferrer">
            데뷰 블로그
          </Link>
        </Button>
      </div> */}
    </main>
  );
}
