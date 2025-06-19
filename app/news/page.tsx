"use client";

import React from 'react';
import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Rss, ExternalLink, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import GoogleCalendarView from '@/components/GoogleCalendarView';
// import NewsClient from './client';

// export const metadata: Metadata = {
//     title: 'News & Events | 데뷰 영어 학원',
//     description: '데뷰 영어의 새로운 소식과 이벤트, 학사일정 정보를 가장 빠르게 만나보세요.',
// };

const NewsPage = () => {
    const naverBlogUrl = "https://blog.naver.com/ourdebut";

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                
                <AnimatedSection>
                    <SectionTitle
                        icon={Rss}
                        title="News & Events"
                        subtitle="데뷰 영어의 새로운 소식과 이벤트 정보를 가장 빠르게 만나보세요."
                        iconColor="text-orange-500"
                    />
                </AnimatedSection>
                
                <AnimatedSection>
                    <div className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">데뷰의 모든 소식은 공식 블로그에서!</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            학원의 최신 공지사항, 교육 정보, 학생들의 생생한 이야기, 특별 이벤트 등 다채로운 소식이 데뷰 영어 공식 네이버 블로그에 가장 먼저 업데이트됩니다.
                        </p>
                        <Button asChild size="lg">
                            <Link href={naverBlogUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" />
                                공식 네이버 블로그 바로가기
                            </Link>
                        </Button>
                    </div>
                </AnimatedSection>
                
                {/* --- 구글 캘린더 --- */}
                <AnimatedSection>
                  <section id="google-calendar" className="my-16 max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-gray-200 flex items-center justify-center">
                      <CalendarDays className="w-8 h-8 mr-3 text-blue-500" />
                      전체 학사일정
                    </h2>
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
                      <GoogleCalendarView 
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY!}
                        calendarId={process.env.NEXT_PUBLIC_DEBUT_CALENDAR_ID!}
                      />
                    </div>
                  </section>
                </AnimatedSection>

            </div>
        </div>
    );
};

export default NewsPage;