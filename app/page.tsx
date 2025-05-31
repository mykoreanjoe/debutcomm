import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 text-center">
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
    </main>
  );
}
