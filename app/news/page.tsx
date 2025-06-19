import NewsClientPage from './client';

export default function NewsPage() {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY || '';
  const calendarId = process.env.GOOGLE_CALENDAR_ID || '';

  return <NewsClientPage apiKey={apiKey} calendarId={calendarId} />;
}