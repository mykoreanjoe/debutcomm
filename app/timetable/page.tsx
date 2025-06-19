import React from 'react';
import { CalendarDays, Sun, Award, Clock, User } from 'lucide-react';
import Head from 'next/head';

// 초등 인텐시브 코스 데이터 타입
interface ElementaryIntensiveEntry {
  classType: string;
  time: string;
  duration: string;
}

const elementaryIntensiveData: ElementaryIntensiveEntry[] = [
  { classType: "월수금 주3회", time: "6:00 ~ 7:35", duration: "95분" },
  { classType: "화목 주2회", time: "6:00 ~ 8:25", duration: "285분" }, // 이미지에는 285분으로 되어있으나, 2시간 25분은 145분입니다. 일단 이미지대로 285분으로 표기합니다.
];

const elementaryIntensiveInfo = [
  "교재: 자체/외부 교재 구성",
  "데뷰 데이 월 1회 토요일 (이벤트 행사로 진행)",
  "완성학습: 학생별 과제 수행이 필요할 경우, 학원 스케줄은 수업 전후로 고정하여 루틴으로 진행합니다.",
];

// 중등부 시간표 데이터 타입
interface MiddleSchoolClassEntry {
  level: string;
  time: string;
  teacher: string;
  note?: string;
}

const middleMonFriClassData: MiddleSchoolClassEntry[] = [
  { level: "중등 Master", time: "5:00 - 8:00", teacher: "원장 직강", note: "(수업후 30분 완성학습 의무)" },
  { level: "고등 Inter", time: "7:00 ~ 10:00", teacher: "원장 직강", note: "(수업전 30분 완성학습 의무)" },
];

const middleTueThuClassData: MiddleSchoolClassEntry[] = [
  { level: "중등 Master", time: "5:00 - 8:00", teacher: "원장 직강", note: "(수업후 30분 완성학습 의무)" },
  { level: "고등 Master", time: "7:00 ~ 10:00", teacher: "원장 직강", note: "(수업전 30분 완성학습 의무)" },
];

const middleWedClinicData: MiddleSchoolClassEntry[] = [
  { level: "무레벨제", time: "5:00 ~ 10:00", teacher: "원장 직강" },
];

const middleSchoolInfo = [
  // "수업 프로세스: 어휘시험 -> Lecture -> 1:1 검사 발표 -> 밴드 과제",
  "완성학습: 스터디 매니저와 상담 후 수업 전 또는 후를 선택하여 30분 또는 1시간 진행합니다.",
  "수요 클리닉: 실력 보충이 필요한 학생은 수요일 의무 참석입니다. (시간은 학생별로 상이할 수 있습니다.)",
  "추천 대상: 주2회 수업으로 학습 노출 빈도를 높이고자 하는 학생에게 적합합니다. 실력 보충이 필요한 학생은 수요일 또는 다른 요일에 필수 참여해야 합니다.",
];
const middleSchoolCompletionInfo = [
  "학생별 과제 수행이 필요할 경우, 학원 스케줄은 수업 전후로 고정하여 루틴으로 진행합니다.",
];


// 초등부 일반 시간표 데이터 타입
interface ElementaryRegularEntry {
  time: string;
  level: string;
}

const elementaryMonWedFriData: ElementaryRegularEntry[] = [
  { time: "2:30 ~ 4:05", level: "DK ~ D4" },
  { time: "4:10 ~ 5:45", level: "D3 ~ D6" },
  { time: "6:00 ~ 7:35", level: "초등 인텐시브 코스" },
];

const elementaryTueThuData: ElementaryRegularEntry[] = [
  { time: "화목 3:00 ~ 5:25", level: "D3 ~ D7" }, // 이미지에 '화목'이 시간 데이터에 포함되어 있어 그대로 사용
  { time: "화목 6:00 ~ 8:30", level: "초등 인텐시브" }, // 시간표기 수정: 600 -> 6:00
];

const elementaryRegularInfo1 = [
  "추천 대상: 주3회 수업으로 학습 노출 빈도를 높이고자 하는 학생에게 적합합니다.",
];

const elementaryRegularInfo2 = [
  "추천 대상: 주2회 수업으로 학습 노출 빈도를 높이고자 하는 학생에게 적합합니다.",
  "완성학습: 학생 특성에 따라 학원 스케줄은 수업 전후로 고정하여 루틴으로 진행하며, 시간은 30분 또는 1시간입니다.",
  "학습 완성도에 따라 더 일찍 종료될 수 있습니다.",
  "데뷰 데이 월 1회 토요일 (이벤트 행사로 진행)",
];


const SectionTitle: React.FC<{ title: string; icon?: React.ElementType; className?: string }> = ({ title, icon: Icon, className }) => (
  <div className={`flex items-center justify-center mb-8 ${className}`}>
    {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10 mr-3" />}
    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
  </div>
);

const InfoList: React.FC<{ items: string[]; title?: string }> = ({ items, title }) => (
  <div className="mt-6">
    {title && <h4 className="font-semibold text-lg text-gray-700 mb-2">{title}</h4>}
    <ul className="space-y-1 text-gray-600 text-sm md:text-base">
      {items.map((item, index) => {
        if (item.startsWith("완성학습:")) {
          const parts = item.split(":");
          const mainText = parts[0] + ":";
          // subText 변수는 사용되지 않으므로 삭제합니다.
          // const subText = parts.slice(1).join(":").trim(); 
          // "완성학습"과 관련된 세부 항목들을 이미지에 맞게 수정
          const completionDetails = [
            "학생 특성에 따라 학원 스케줄은 수업 전후로 고정하여 루틴으로 진행합니다.",
            "시간: 30분 또는 1시간 진행합니다."
          ];
          return (
            <li key={index} className="list-item list-disc list-inside">
              {mainText}
              <ul className="list-none pl-5 mt-1 space-y-0.5">
                {completionDetails.map((detail, i) => (
                  <li key={i} className="before:content-['-'] before:mr-2">{detail}</li>
                ))}
              </ul>
            </li>
          );
        }
        return (
          <li key={index} className="list-item list-disc list-inside">{item}</li>
        );
      })}
    </ul>
  </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">{children}</h3>
);

// 시간표 카드를 위한 새로운 컴포넌트
const TimeCard: React.FC<{ time: string; level: string; }> = ({ time, level }) => (
  <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm transition-transform hover:scale-105">
    <div className="flex items-center">
      <Clock className="w-5 h-5 mr-3 text-blue-500" />
      <span className="font-bold text-lg text-gray-800">{time}</span>
    </div>
    <span className="text-md text-gray-600 font-medium">{level}</span>
  </div>
);

// 초등 인텐시브 및 중등부 시간표를 위한 새로운 카드 컴포넌트
interface ClassCardProps {
  title: string;
  time: string;
  details: { label: string; value: string; }[];
  note?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, time, details, note }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-sm transition-transform hover:scale-105 flex flex-col h-full">
    <div className="flex items-center mb-3">
      <h4 className="font-bold text-lg text-blue-600">{title}</h4>
    </div>
    <div className="flex-grow space-y-2 text-sm">
      <div className="flex items-center text-gray-800">
        <Clock className="w-4 h-4 mr-2" />
        <span className="font-semibold">{time}</span>
      </div>
      {details.map((detail, index) => (
        <div key={index} className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span>{detail.label}: {detail.value}</span>
        </div>
      ))}
    </div>
    {note && <p className="text-xs text-red-500 mt-3 pt-3 border-t border-gray-200">{note}</p>}
  </div>
);


export default function TimetablePage() {
  // const mainText = "주간 학습 시간표"; // mainText 주석 처리
  // const constPurpleBoxText = "시간표는 학사일정에 따라 변경될 수 있습니다."; // 올바르게 주석 처리
  return (
    <>
      <Head>
        <title>시간표 | 데뷰 영어 학원</title>
        <meta name="description" content="데뷰 영어 학원의 초등부 및 중등부 시간표를 안내합니다." />
      </Head>
      <main className="container mx-auto px-4 py-12 md:py-16 bg-gray-50">
        {(() => { console.log("TimetablePage 렌더링 시작"); return null; })()}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <CalendarDays className="w-10 h-10 md:w-12 md:h-12 mr-3 text-blue-600" /> 시간표
          </h1>
        </section>

        {/* 초등부 일반 시간표 */}
        <section className="mb-12 md:mb-16 p-6 bg-white rounded-lg shadow-lg">
          <SectionTitle title="초등부 시간표" icon={Sun} className="text-sky-600" />

          <SubHeading>정규 클래스 (월수금/화목)</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elementaryMonWedFriData.map((row) => (
              <TimeCard key={row.time} time={row.time} level={row.level} />
            ))}
            {elementaryTueThuData.map((row) => (
              <TimeCard key={row.time} time={row.time} level={row.level} />
            ))}
          </div>
          <InfoList items={[...elementaryRegularInfo1, ...elementaryRegularInfo2]} />

          <SubHeading>인텐시브 코스</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elementaryIntensiveData.map((row) => (
              <ClassCard 
                key={row.classType}
                title={row.classType}
                time={row.time}
                details={[{ label: '총 시간', value: row.duration }]}
              />
            ))}
          </div>
          <InfoList items={elementaryIntensiveInfo} />
        </section>

        {/* 중등부 시간표 */}
        <section className="mb-12 md:mb-16 p-6 bg-white rounded-lg shadow-lg">
          <SectionTitle title="중등부 시간표" icon={Award} className="text-indigo-600" />
          
          <SubHeading>월금 클래스</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {middleMonFriClassData.map((row) => (
              <ClassCard 
                key={row.level}
                title={row.level}
                time={row.time}
                details={[{ label: '담당', value: row.teacher }]}
                note={row.note}
              />
            ))}
          </div>

          <SubHeading>화목 클래스</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {middleTueThuClassData.map((row) => (
              <ClassCard 
                key={row.level}
                title={row.level}
                time={row.time}
                details={[{ label: '담당', value: row.teacher }]}
                note={row.note}
              />
            ))}
          </div>
          
          <SubHeading>수요 클리닉</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {middleWedClinicData.map((row) => (
              <ClassCard 
                key={row.level}
                title={row.level}
                time={row.time}
                details={[{ label: '담당', value: row.teacher }]}
              />
            ))}
          </div>
          <InfoList items={middleSchoolInfo} />
          <InfoList items={middleSchoolCompletionInfo} title="완성 학습" />
        </section>
      </main>
    </>
  );
} 