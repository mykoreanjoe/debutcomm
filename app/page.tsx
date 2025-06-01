import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, BookOpenCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 text-center">
      {/* 학습경험 섹션 (초등부) 시작 */}
      <section className="mb-16 w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <Star className="h-16 w-16 text-yellow-400 fill-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#13588f] mb-6">
          최고의 학습 경험 (초등부)
        </h2>
        <ul className="space-y-3 text-left inline-block mb-8">
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>매월 스피킹 발표</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>학습 리워드</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>영상 포트폴리오</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>온라인 AI 학습 레포트</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>데뷰카드</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>참여형 클래스</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>문법학습과 하브루타</span>
          </li>
        </ul>
        <div>
          <Link href="/learning-process" className="font-semibold text-[#13588f] hover:text-[#0f4a7b] text-lg">
            데뷰 학습 경험 자세히 보기 &gt;
          </Link>
        </div>
      </section>
      {/* 학습경험 섹션 (초등부) 끝 */}

      {/* 학습경험 섹션 (중등부) 시작 */}
      <section className="mb-16 w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <BookOpenCheck className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#13588f] mb-6">
          최고의 학습 경험 (중등부)
        </h2>
        <ul className="space-y-3 text-left inline-block mb-8">
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>수능 대비 어휘 학습</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>배경지식 학습</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>수행평가 대비</span>
          </li>
          <li className="flex items-center text-md md:text-lg text-gray-700">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
            <span>천일문 학습 등</span>
          </li>
        </ul>
        <div>
          <Link href="/learning-process" className="font-semibold text-[#13588f] hover:text-[#0f4a7b] text-lg">
            데뷰 학습 경험 자세히 보기 &gt;
          </Link>
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
