'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Rss } from "lucide-react";
import GoogleCalendarView from '@/components/GoogleCalendarView';
import SectionTitle from "@/components/SectionTitle";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

interface NewsClientPageProps {
  calendarId: string;
}

export default function NewsClientPage({ calendarId }: NewsClientPageProps) {
  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection>
                <SectionTitle
                    icon={Rss}
                    title="News & Calendar"
                    subtitle="데뷰의 새로운 소식은 블로그에서, 학원 일정은 캘린더에서 확인하세요."
                    iconColor="text-orange-500"
                />
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        데뷰의 모든 소식은 공식 블로그에서!
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        학원의 최신 공지사항, 교육 정보, 학생들의 생생한 이야기, 특별 이벤트 등<br/>
                        다채로운 소식이 데뷰 영어 공식 네이버 블로그에 가장 먼저 업데이트됩니다.
                    </p>
                    <Button asChild size="lg">
                        <Link href="https://blog.naver.com/ourdebut" target="_blank" rel="noopener noreferrer">
                            네이버 블로그 바로가기
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
                     <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">학원 주요 일정</h2>
                    <GoogleCalendarView calendarId={calendarId} />
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
} 