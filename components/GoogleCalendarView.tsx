'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface GoogleCalendarViewProps {
  calendarId: string;
}

const GoogleCalendarView: React.FC<GoogleCalendarViewProps> = ({ calendarId }) => {
  if (!calendarId) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md">
        <p className="font-bold">캘린더 ID가 설정되지 않았습니다.</p>
        <p>관리자에게 문의하여 구글 캘린더 ID를 제공받으세요.</p>
      </div>
    );
  }

  const src = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Asia/Seoul`;

  return (
    <section id="google-calendar" className="mt-12 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-teal-700 mb-6 pb-3 border-b-2 border-teal-100 flex items-center">
        <Calendar className="w-8 h-8 mr-3 text-teal-500" />
        학원 전체 일정
      </h2>
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100 aspect-w-16 aspect-h-9">
        <iframe
          src={src}
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
       <p className="text-sm text-gray-500 mt-4 text-center">
        * 전체 화면으로 보시려면 캘린더 우측 하단의 Google Calendar 로고를 클릭하세요.
      </p>
    </section>
  );
};

export default GoogleCalendarView; 