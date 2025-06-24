"use client";

import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { CalendarDays } from 'lucide-react';
import GoogleCalendarView from '@/components/GoogleCalendarView';

const CalendarPage = () => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                
                {/* --- 구글 캘린더 --- */}
                <AnimatedSection>
                  <section id="google-calendar" className="mb-16">
                    <SectionTitle
                      icon={CalendarDays}
                      title="데뷰 학사일정"
                      subtitle="데뷰의 월별, 주별 전체 학사일정을 확인하실 수 있습니다."
                      iconColor="text-blue-500"
                    />
                    <div className="mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto">
                      <GoogleCalendarView 
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY!}
                        calendarId={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID!}
                      />
                    </div>
                  </section>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default CalendarPage;