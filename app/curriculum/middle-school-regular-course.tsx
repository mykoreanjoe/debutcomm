import React from 'react';
import { BookOpen, Lightbulb, BarChart2 } from 'lucide-react'; // 사용되는 아이콘만 남김
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonTableRow {
  item: string;
  middleSchool: string;
  highSchool: string;
}

interface TimeTableClassRow {
  level: string;
  time: string;
  teacher: string;
}

interface TimeTableData {
  title: string;
  monFriClass: {
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
  };
  tueThuClass: {
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
  };
  additionalInfo: string[];
  wednesdayClinic: { // 수요 클리닉 정보 추가
    title: string;
    columns: string[];
    rows: TimeTableClassRow[];
    recommendation: string;
  };
}

export interface MiddleSchoolCourseData {
  title: string;
  introduction: string;
  timeTable?: TimeTableData; // 타입 수정 -> timeTable?: TimeTableData;
  id?: string; // id prop 추가
}

const MiddleSchoolRegularCourse = (props: MiddleSchoolCourseData) => {
  const { title, introduction, /* comparisonTable, */ /*timeTable,*/ id } = props;

  // const scrollRef = useRef<HTMLDivElement>(null); // scrollRef 주석 처리

  return (
    <section id={id} className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg shadow-xl p-6 md:p-10 my-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
          <BookOpen className="w-10 h-10 mr-3 text-gray-700" /> {title}
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-start text-gray-700 mb-3">
            <Lightbulb className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-yellow-500" />
            <p className="text-base leading-relaxed">
              {introduction}
            </p>
          </div>
        </div>

        {/* 시간표 관련 div 시작 - 이 부분을 삭제합니다. */}

      </div>
    </section>
  );
};

export default MiddleSchoolRegularCourse;

// 주석 처리된 timeTable 변수 전체를 삭제합니다. (아래 라인들)
// const timeTable = [
//   {
//     grade: "중1 정규반",
//     classTime: "주 2회 / 각 1시간 50분 수업 (주 220분)",
//     details: [
//       "중등부 과정에서 내신 대비반 시작으로 가장 기본이 되는 반",
//       "중학교 교과과정에 기초하여 체계적인 학습 진행",
//       "학교 시험에 완벽 대비할 수 있도록 기초 다지기"
//     ]
//   },
//   {
//     grade: "중2 정규반",
//     classTime: "주 2회 / 각 1시간 50분 수업 (주 220분)",
//     details: [
//       "본격적인 내신 관리가 시작되는 시기",
//       "학교별 출제 경향 분석을 통한 맞춤 학습 전략 제공",
//       "서술형 문제 대비 및 심화 학습 병행"
//     ]
//   },
//   {
//     grade: "중3 정규반",
//     classTime: "주 2회 / 각 1시간 50분 수업 (주 220분)",
//     details: [
//       "고등 과정 연계를 위한 중요 개념 정리 및 심화 학습",
//       "특목고 및 자사고 진학 희망 학생을 위한 맞춤형 로드맵 제공",
//       "최종 내신 점검 및 실전 감각 향상 훈련"
//     ]
//   }
// ]; 