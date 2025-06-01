import React from 'react';
import { CalendarDays, Clock, Users, BookOpen, Sun, Moon } from 'lucide-react';
import Head from 'next/head';

interface TimeTableEntry {
  class: string;
  days: string;
  time: string;
  details?: string[];
  target: string;
  icon?: React.ElementType;
}

const elementaryTimetableData: TimeTableEntry[] = [
  {
    class: "초등부 정규반 (월수금반)",
    days: "월요일, 수요일, 금요일",
    time: "14:30 - 17:20 (주 3회, 각 170분)",
    target: "초1~초5",
    details: [
      "영어의 기초를 다지는 과정",
      "파닉스, 리딩, 스피킹, 라이팅 균형 학습",
      "자체 교재 및 다양한 액티비티 활용",
    ],
    icon: Sun,
  },
  {
    class: "초등부 정규반 (화목반)",
    days: "화요일, 목요일",
    time: "14:30 - 17:20 (주 2회, 각 170분)",
    target: "초1~초5",
    details: [
      "핵심 내용 집중 학습",
      "정규 과정 커리큘럼 동일 적용",
      "금요일 온라인 학습 및 과제 병행",
    ],
    icon: Sun,
  },
  {
    class: "초등부 인텐시브 (화목반)",
    days: "화요일, 목요일",
    time: "16:30 - 19:20 (주 2회, 각 170분)",
    target: "초5~초6 (중등 준비)",
    details: [
      "중등 과정 선행 학습",
      "심화 리딩, 문법, 어휘 학습",
      "토론 및 발표 중심 수업",
    ],
    icon: BookOpen,
  },
];

const middleSchoolTimetableData: TimeTableEntry[] = [
  {
    class: "중등부 정규반 (월수금반)",
    days: "월요일, 수요일, 금요일",
    time: "17:30 - 20:20 (주 3회, 각 170분)",
    target: "중1~중3",
    details: [
      "내신 대비 및 수능 기초 확립",
      "문법, 독해, 듣기, 어휘 심층 학습",
      "수행평가 대비 프로그램 포함",
    ],
    icon: Moon,
  },
  {
    class: "중등부 정규반 (화목반)",
    days: "화요일, 목요일",
    time: "17:30 - 20:20 (주 2회, 각 170분)",
    target: "중1~중3",
    details: [
      "주요 과목 집중 학습",
      "정규 과정 커리큘럼 동일 적용",
      "금요일 온라인 학습 및 심화 과제 병행",
    ],
    icon: Moon,
  },
];


const TimetableCard: React.FC<TimeTableEntry> = ({ class: className, days, time, details, target, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
    <div className="flex items-center mb-4">
      {Icon && <Icon className="w-8 h-8 text-blue-600 mr-3" />}
      <h3 className="text-xl font-semibold text-blue-700">{className}</h3>
    </div>
    <div className="space-y-2 text-gray-700">
      <p className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-500" /> <strong>대상:</strong> {target}</p>
      <p className="flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-blue-500" /> <strong>수업 요일:</strong> {days}</p>
      <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-500" /> <strong>수업 시간:</strong> {time}</p>
      {details && details.length > 0 && (
        <div className="pt-2 mt-2 border-t border-gray-200">
          <h4 className="font-semibold text-sm text-gray-600 mb-1">세부 내용:</h4>
          <ul className="list-disc list-inside text-sm space-y-1 pl-1">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default function TimetablePage() {
  return (
    <>
      <Head>
        <title>시간표 | 데뷰 영어 학원</title>
        <meta name="description" content="데뷰 영어 학원의 초등부 및 중등부 시간표를 안내합니다." />
      </Head>
      <main className="container mx-auto px-4 py-12 md:py-16 bg-gradient-to-br from-sky-50 to-indigo-50">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            데뷰 영어 시간표
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생들의 학습 효과를 극대화하기 위한 최적의 시간표입니다. <br/>자세한 내용은 각 과정별 안내를 참고해주세요.
          </p>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-8 text-center flex items-center justify-center">
            <Sun className="w-10 h-10 mr-3" /> 초등부 시간표
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {elementaryTimetableData.map((entry) => (
              <TimetableCard key={entry.class} {...entry} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-8 text-center flex items-center justify-center">
            <Moon className="w-10 h-10 mr-3" /> 중등부 시간표
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {middleSchoolTimetableData.map((entry) => (
              <TimetableCard key={entry.class} {...entry} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
} 