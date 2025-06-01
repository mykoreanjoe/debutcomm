'use client';

import React from 'react';
import { /* Users, */ BookOpen, /* Zap, */ /* TrendingUp, */ /* Target, */ /* BrainCircuit, */ CheckSquare, Clock, CalendarDays, Info, /* List, */ Newspaper, Activity, Puzzle, Users2, /* ClipboardList, */ /* CheckCircle */ } from 'lucide-react'; // 사용하지 않는 아이콘 주석 처리
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 새로운 데이터 구조에 맞춘 타입 정의
interface ClassOverviewItem {
  label: string;
  description: string;
}

interface ClassTimeTableRow {
  level: string;
  time: string;
  teacher?: string; // teacher는 이제 선택적이며 사용되지 않을 수 있음
}

interface ClassSchedule {
  title: string;
  columns: string[];
  rows: ClassTimeTableRow[];
  recommendation?: string;
  trainingInfo?: string; // 유지 (page.tsx에서 제거되었지만, 호환성을 위해 남겨둘 수 있음 또는 제거)
  completionStudyPoints?: string[]; // 추가
}

export interface CourseInfoProps {
  title: string;
  targetAudience: string;
  classOverview?: { items: ClassOverviewItem[] }; // Optional로 변경하고 타입 수정
  monWedFriClass?: ClassSchedule; // Optional로 변경하고 타입 수정
  tueThuClass?: ClassSchedule; // Optional로 변경하고 타입 수정
  debutDay?: string; // Optional로 변경
  // completionStudyDescription?: string; // 제거
  
  // 기존 필드들은 유지되지만, 새로운 정보에 따라 일부는 사용되지 않을 수 있음
  // scheduleAndFee?: { type: string; details: string[] }[]; // 사용 안 함
  // textbookComposition?: string; // classOverview로 대체
  completionStudy?: string; // classOverview로 대체 또는 다른 방식으로 표현
  
  // 기존 유지되는 복잡한 객체 타입들
  integratedLearning: {
    description: string;
    coreCompetencies: string[];
    emphasis: string;
    caseStudy: {
      title: string;
      content: string;
    };
  };
  activitiesAndProjects: {
    title: string;
    points: string[];
  };
  skillBasedLearning: {
    title: string;
    methods: string[];
    exampleTopics: string[];
    summary: string;
  };
  id?: string; // id prop 추가
}

const ElementaryRegularCourse = (props: CourseInfoProps) => { // props 전체를 받도록 수정 가능성 고려
  // props에서 id를 추출하여 사용
  const { title, targetAudience, classOverview, monWedFriClass, tueThuClass, debutDay, integratedLearning, activitiesAndProjects, skillBasedLearning, id } = props;

  return (
    <section id={id} className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg shadow-xl p-6 md:p-10 mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-4 flex items-center justify-center">
          <Newspaper className="w-10 h-10 mr-3" /> {title}
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">{targetAudience}</p>

        {/* 초등 정규 클래스 개요 정보 */}
        {classOverview && classOverview.items && (
          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-sky-600 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" /> 클래스 개요
            </h3>
            <ul className="space-y-3 text-sm">
              {classOverview.items.map((item, index) => (
                <li key={index} className="flex">
                  <span className="font-semibold text-gray-700 w-32 flex-shrink-0">{item.label}:</span> {/* 너비 조정 */}
                  <span className="text-gray-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 시간표 정보 */}
        {(monWedFriClass || tueThuClass) && (
          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-sky-600 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2" /> 시간표
            </h3>
            {monWedFriClass && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-sky-700 mb-3">{monWedFriClass.title}</h4>
                <Table className="min-w-full border">
                  <TableHeader className="bg-sky-50">
                    <TableRow>
                      {monWedFriClass.columns.map((col, i) => <TableHead key={i} className="py-2 px-3 font-semibold text-sky-700 text-xs uppercase tracking-wider">{col}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monWedFriClass.rows.map((row, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-sky-50/50'}>
                        <TableCell className="py-2 px-3 text-sm text-gray-700">{row.time}</TableCell>
                        <TableCell className="py-2 px-3 text-sm text-gray-700">{row.level}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {monWedFriClass.recommendation && <p className="text-xs text-sky-600 mt-2 pl-1">{monWedFriClass.recommendation}</p>}
              </div>
            )}
            {tueThuClass && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-sky-700 mb-3">{tueThuClass.title}</h4>
                <Table className="min-w-full border">
                  <TableHeader className="bg-sky-50">
                    <TableRow>
                      {tueThuClass.columns.map((col, i) => <TableHead key={i} className="py-2 px-3 font-semibold text-sky-700 text-xs uppercase tracking-wider">{col}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tueThuClass.rows.map((row, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-sky-50/50'}>
                        <TableCell className="py-2 px-3 text-sm text-gray-700">{row.time}</TableCell>
                        <TableCell className="py-2 px-3 text-sm text-gray-700">{row.level}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {tueThuClass.recommendation && <p className="text-xs text-sky-600 mt-2 pl-1">{tueThuClass.recommendation}</p>}
                {tueThuClass.completionStudyPoints && tueThuClass.completionStudyPoints.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-sky-100">
                    <h5 className="text-sm font-semibold text-sky-700 mb-2">완성학습:</h5>
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 pl-2">
                      {tueThuClass.completionStudyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {debutDay && (
              <p className="text-sm text-sky-700 bg-sky-100 p-3 rounded-md flex items-center mb-4">
                <CalendarDays className="w-5 h-5 mr-2 flex-shrink-0" /> {debutDay}
              </p>
            )}
          </div>
        )}

        {/* 통합형 학습 (기존 내용 유지) */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-sky-600 mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-2" /> 통합형 학습의 중요성</h3>
          <p className="text-gray-600 mb-3 text-sm">{integratedLearning.description}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
            {integratedLearning.coreCompetencies.map((comp, i) => (
              <div key={i} className="bg-sky-50 p-3 rounded flex items-center">
                <CheckSquare className="w-4 h-4 mr-2 text-sky-500 flex-shrink-0" /> {comp}
              </div>
            ))}
          </div>
          <p className="text-gray-600 mb-3 text-sm italic">{integratedLearning.emphasis}</p>
          <div className="bg-sky-100 p-3 rounded-md text-sm">
            <h4 className="font-semibold text-sky-700 mb-1">{integratedLearning.caseStudy.title}:</h4>
            <p className="text-gray-700">{integratedLearning.caseStudy.content}</p>
          </div>
        </div>

        {/* 활동과 프로젝트 (기존 내용 유지) */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-sky-600 mb-4 flex items-center"><Activity className="w-6 h-6 mr-2" /> {activitiesAndProjects.title}</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 text-sm">
            {activitiesAndProjects.points.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>

        {/* 스킬 베이스 러닝 (기존 내용 유지) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-sky-600 mb-4 flex items-center"><Puzzle className="w-6 h-6 mr-2" /> {skillBasedLearning.title}</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-sky-700 mb-2">주요 학습 방식:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                {skillBasedLearning.methods.map((method, i) => <li key={i}>{method}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sky-700 mb-2">학습 예시:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                {skillBasedLearning.exampleTopics.map((topic, i) => <li key={i}>{topic}</li>)}
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mt-4 pt-3 border-t border-sky-200 text-sm font-medium">{skillBasedLearning.summary}</p>
        </div>
        
        {/* 상담 버튼 */}
        <div className="text-center mt-12">
            <button className="bg-[#FEE500] text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors text-lg shadow-md flex items-center justify-center mx-auto">
                <Users2 className="w-6 h-6 mr-2" /> 초등 정규 과정 상담받기
            </button>
            <p className="text-sm text-gray-500 mt-2">(카카오톡 채널로 연결됩니다)</p>
        </div>

      </div>
    </section>
  );
};

export default ElementaryRegularCourse; 