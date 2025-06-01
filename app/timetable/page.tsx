import React from 'react';
import { CalendarDays, Sun, Award, Sparkles } from 'lucide-react';
import Head from 'next/head';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <CalendarDays className="w-10 h-10 md:w-12 md:h-12 mr-3 text-blue-600" /> 시간표
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            학생들의 학습 효과를 극대화하기 위한 최적의 시간표입니다.
          </p>
        </section>

        {/* 초등부 일반 시간표 */}
        <section className="mb-12 md:mb-16 p-6 bg-white rounded-lg shadow-lg">
          <SectionTitle title="초등부 시간표" icon={Sun} className="text-sky-600" />

          <SubHeading>월수금 클래스</SubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 font-medium text-gray-600">시간</TableHead>
                <TableHead className="font-medium text-gray-600">레벨</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elementaryMonWedFriData.map((row) => (
                <TableRow key={row.time}>
                  <TableCell className="font-medium text-gray-800">{row.time}</TableCell>
                  <TableCell className="text-gray-700">{row.level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <InfoList items={elementaryRegularInfo1} />

          <SubHeading>화목 클래스</SubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 font-medium text-gray-600">시간</TableHead>
                <TableHead className="font-medium text-gray-600">레벨</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elementaryTueThuData.map((row) => (
                <TableRow key={row.time}>
                  <TableCell className="font-medium text-gray-800">{row.time}</TableCell>
                  <TableCell className="text-gray-700">{row.level}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <InfoList items={elementaryRegularInfo2} />
        </section>

        {/* 초등 인텐시브 코스 */}
        <section className="mb-12 md:mb-16 p-6 bg-white rounded-lg shadow-lg">
          <SectionTitle title="초등 인텐시브 코스" icon={Sparkles} className="text-amber-600" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 font-medium text-gray-600">클래스</TableHead>
                <TableHead className="font-medium text-gray-600">시간</TableHead>
                <TableHead className="text-right font-medium text-gray-600">총 시간</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elementaryIntensiveData.map((row) => (
                <TableRow key={row.classType}>
                  <TableCell className="font-medium text-gray-800">{row.classType}</TableCell>
                  <TableCell className="text-gray-700">{row.time}</TableCell>
                  <TableCell className="text-right text-gray-700">{row.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <InfoList items={elementaryIntensiveInfo} />
        </section>

        {/* 중등부 시간표 */}
        <section className="mb-12 md:mb-16 p-6 bg-white rounded-lg shadow-lg">
          <SectionTitle title="중등부 시간표" icon={Award} className="text-indigo-600" />
          
          <SubHeading>월금 클래스</SubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-gray-600">레벨</TableHead>
                <TableHead className="font-medium text-gray-600">시간</TableHead>
                <TableHead className="font-medium text-gray-600">담당T</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {middleMonFriClassData.map((row) => (
                <TableRow key={row.level}>
                  <TableCell className="font-medium text-gray-800">{row.level}</TableCell>
                  <TableCell className="text-gray-700">{row.time} <span className="text-xs text-gray-500">{row.note}</span></TableCell>
                  <TableCell className="text-gray-700">{row.teacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <SubHeading>화목 클래스</SubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-gray-600">레벨</TableHead>
                <TableHead className="font-medium text-gray-600">시간</TableHead>
                <TableHead className="font-medium text-gray-600">담당T</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {middleTueThuClassData.map((row) => (
                <TableRow key={row.level}>
                  <TableCell className="font-medium text-gray-800">{row.level}</TableCell>
                  <TableCell className="text-gray-700">{row.time} <span className="text-xs text-gray-500">{row.note}</span></TableCell>
                  <TableCell className="text-gray-700">{row.teacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <SubHeading>수요 클리닉</SubHeading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-gray-600">레벨</TableHead>
                <TableHead className="font-medium text-gray-600">시간</TableHead>
                <TableHead className="font-medium text-gray-600">담당T</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {middleWedClinicData.map((row) => (
                <TableRow key={row.level}>
                  <TableCell className="font-medium text-gray-800">{row.level}</TableCell>
                  <TableCell className="text-gray-700">{row.time}</TableCell>
                  <TableCell className="text-gray-700">{row.teacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <InfoList items={middleSchoolInfo} />
          <InfoList items={middleSchoolCompletionInfo} title="완성 학습" />
        </section>
      </main>
    </>
  );
} 