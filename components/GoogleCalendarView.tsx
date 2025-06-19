'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import { useWindowSize } from '@/lib/hooks';
import { Calendar } from 'lucide-react';

interface GoogleCalendarViewProps {
  apiKey: string;
  calendarId: string;
}

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  htmlLink: string;
}

const formatEventDate = (start: { dateTime?: string; date?: string; }) => {
    const eventDate = start.dateTime || start.date;
    if (!eventDate) return "날짜 정보 없음";

    const date = new Date(eventDate);
    if (isNaN(date.getTime())) return "유효하지 않은 날짜";
  
    // 'date'만 있는 경우 (종일 이벤트), 시간을 표시하지 않음
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
  
    if (start.dateTime) {
      options.hour = 'numeric';
      options.minute = 'numeric';
      options.hour12 = true;
    }
  
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const GoogleCalendarView: React.FC<GoogleCalendarViewProps> = ({ apiKey, calendarId }) => {
  const size = useWindowSize();
  const isMobile = size.width ? size.width < 768 : false;
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
  
      const timeMin = today.toISOString();
      const timeMax = nextWeek.toISOString();
  
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // 응답이 실패했을 때, 본문을 텍스트로 읽어 에러 메시지를 확인
          const errorText = await response.text();
          console.error('Failed to fetch calendar events:', errorText);
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setUpcomingEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
    if (apiKey && calendarId) {
      fetchUpcomingEvents();
    }
  }, [apiKey, calendarId]);

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

      {upcomingEvents.length > 0 && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <Calendar className="w-5 h-5 mr-2" />
            다가오는 주요 일정 (7일 이내)
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <a 
                key={event.id}
                href={event.htmlLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-gray-800">{event.summary}</p>
                <p className="text-sm text-gray-600 mt-1">{formatEventDate(event.start)}</p>
              </a>
            ))}
          </div>
        </div>
      )}
      
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
        googleCalendarApiKey={apiKey}
        events={{
          googleCalendarId: calendarId,
        }}
        eventDisplay="block"
        eventTextColor="#ffffff"
        eventBackgroundColor="#13588f"
        eventBorderColor="#0e4a7a"
        headerToolbar={isMobile ? {
          left: 'prev,next',
          center: 'title',
          right: 'today'
        } : {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        height={isMobile ? 'auto' : '80vh'}
        locale='ko'
        buttonText={{
          today:    '오늘',
          month:    '월',
          week:     '주',
          list:     '목록'
        }}
      />
    </div>
  );
};

export default GoogleCalendarView; 