import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, BookOpenCheck, ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 text-center">
      {/* 학습경험 섹션 (초등부) 시작 */}
      <section className="mb-16 w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <Star className="h-16 w-16 text-yellow-400 fill-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#13588f] mb-4">
          최고의 학습 경험 (초등부)
        </h2>
        <p className="text-md md:text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          놀이처럼 즐거운 학습, 탄탄한 기본기 형성! 데뷰 초등부는 아이들의 눈높이에 맞춘 재미있고 효과적인 프로그램을 제공합니다.
        </p>
        <div>
          <Button asChild size="lg" className="bg-[#13588f] hover:bg-[#0f4a7b] text-white">
            <Link href="/learning-process#elementary">
              초등부 학습 내용 자세히 보기 <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      {/* 학습경험 섹션 (초등부) 끝 */}

      {/* 학습경험 섹션 (중등부) 시작 */}
      <section className="mb-16 w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <BookOpenCheck className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#13588f] mb-4">
          최고의 학습 경험 (중등부)
        </h2>
        <p className="text-md md:text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          목표 달성을 위한 체계적인 관리, 심화 학습으로 실력 완성! 데뷰 중등부는 내신부터 수능까지 빈틈없이 준비합니다.
        </p>
        <div>
          <Button asChild size="lg" className="bg-[#13588f] hover:bg-[#0f4a7b] text-white">
            <Link href="/learning-process#middle">
              중등부 학습 내용 자세히 보기 <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      {/* 학습경험 섹션 (중등부) 끝 */}

      <Link href="/">
        <Image 
          src="/debutlogo.png" 
          alt="데뷰 영어 학원 로고" 
          width={240}
          height={120}
          priority
        />
      </Link>

      <h1 className="text-3xl md:text-5xl font-bold mt-8">
        가장 완성도 높은 영어 학원.
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold mt-2 text-[#13588f]">
        그 여정을 데뷰 영어는 같이 합니다.
      </h2>
      
      <p className="mt-8 text-md md:text-lg text-gray-600">
        신목초, 목동초, 목일중, 목동중 학생들을 전문으로 관리하고 있습니다.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button asChild size="lg" className="bg-[#13588f] hover:bg-[#0f4a7b] text-white">
          <Link href="/reservation">테스트 예약</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-[#13588f] text-[#13588f] hover:bg-[#13588f]/10">
          <Link href="/learning-process">학습과정 보기</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-[#13588f] text-[#13588f] hover:bg-[#13588f]/10">
          <Link href="/consulting">상담하기</Link>
        </Button>
      </div>

      {/* 네이버 블로그 바로가기 버튼 */}
      <div className="mt-12">
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
          <Link href="https://blog.naver.com/ourdebut" target="_blank" rel="noopener noreferrer">
            네이버 블로그 바로가기
          </Link>
        </Button>
      </div>
    </main>
  );
}
