'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';

interface GoogleCalendarViewProps {
  apiKey: string;
  calendarId: string;
}

const GoogleCalendarView: React.FC<GoogleCalendarViewProps> = ({ apiKey, calendarId }) => {
  if (!apiKey || !calendarId) {
    return (
      <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg text-center text-red-500">
        Google Calendar API 키 또는 캘린더 ID가 .env.local 파일에 설정되지 않았습니다.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">데뷰 캘린더</h2>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={apiKey}
        events={{
          googleCalendarId: calendarId,
        }}
        eventDisplay="block"
        eventTextColor="#ffffff"
        eventBackgroundColor="#13588f"
        eventBorderColor="#0e4a7a"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        height="80vh"
        locale='ko'
        buttonText={{
          today:    '오늘',
          month:    '월',
          week:     '주',
        }}
      />
    </div>
  );
};

export default GoogleCalendarView; 