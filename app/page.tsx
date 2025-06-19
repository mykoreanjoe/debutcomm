import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '목동데뷰영어 | 같이 완성하는 가장 완성도 높은 영어',
  description: '목동 대표 영어학원, 데뷰. 학생 중심의 교육 철학과 체계적인 시스템으로 영어 실력의 완성을 넘어, 학생의 미래를 같이 완성합니다. 레벨테스트 예약 및 상담 신청.',
  openGraph: {
    title: '목동데뷰영어 | 같이 완성하는 가장 완성도 높은 영어',
    description: '데뷰에서 당신의 영어 실력과 미래를 완성하세요. 지금 바로 레벨테스트를 예약하고 차이를 경험해보세요.',
    url: 'https://www.debutenglish.com', // 실제 도메인으로 추후 변경
    images: [
      {
        url: "/images/og-main.png", // 메인 페이지 전용 OG 이미지 (가정)
        width: 1200,
        height: 630,
        alt: "데뷰 영어 메인 페이지 OG 이미지",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <Link href="/">
              <Image 
                src="/debutlogo.png" 
                alt="데뷰 영어 학원 로고" 
                width={200}
                height={100}
                className="mx-auto mb-8"
                priority
              />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 tracking-tight">
              가장 완성도 높은 영어,
              <br />
              <span className="text-indigo-600">같이 완성합니다.</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-md md:text-lg text-gray-700 max-w-2xl mx-auto">
              신목초, 목동초, 목일중, 목동중 학생들을 중심으로 관리하고 있습니다.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-[#03C75A] hover:bg-[#03B352] text-white shadow-lg transition-transform transform hover:scale-105">
                <Link href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" /> 테스트 예약
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#f2da00] text-gray-800 shadow-lg transition-transform transform hover:scale-105">
                <Link href="http://pf.kakao.com/_pGxkPn/chat" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" /> 카카오톡 상담
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="transition-colors">
                <Link href="/why-debut">
                  WHY DEBUT <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
