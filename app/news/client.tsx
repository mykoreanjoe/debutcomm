'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import GoogleCalendarView from '@/components/GoogleCalendarView';

interface NewsClientPageProps {
  apiKey: string;
  calendarId: string;
}

export default function NewsClientPage({ apiKey, calendarId }: NewsClientPageProps) {
  const handleGoToBlog = () => {
    window.open('https://blog.naver.com/ourdebut', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">데뷰 소식을 확인해보세요</h1>
        <p className="text-lg text-gray-600 mb-8">
          데뷰의 최신 소식과 다양한 정보는 공식 블로그에서, <br />
          주요 학사 일정은 하단 캘린더에서 확인하실 수 있습니다.
        </p>
        <Button onClick={handleGoToBlog} size="lg">
          데뷰 공식 블로그 바로가기
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="mt-16">
        <GoogleCalendarView apiKey={apiKey} calendarId={calendarId} />
      </div>
    </div>
  );
} 