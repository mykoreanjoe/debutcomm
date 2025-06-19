"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { Target, BookCopy, Users2, CheckSquare } from 'lucide-react';

interface MiddleSchoolSectionProps {
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

// --- Reusable Components ---
const InfoCard = ({ icon: Icon, title, children, className = '' }: { icon: React.ElementType, title: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full ${className}`}>
    <div className="flex items-center mb-4">
      <Icon className="w-7 h-7 mr-3 text-purple-600" />
      <h4 className="text-xl font-bold text-gray-700">{title}</h4>
    </div>
    <div className="text-gray-600 space-y-2 text-sm md:text-base">
      {children}
    </div>
  </div>
);

// --- Data for Middle School Courses ---
const middleSchoolRegularData = {
  introduction: "중학교는 영어 학습에서 결정적인 전환점입니다. 단순히 어려운 문법과 단어를 넘어, 영어에 대한 태도와 장기적인 실력의 기반이 형성되는 시기이기에, 데뷰는 체계적인 로드맵으로 학생들을 지도합니다.",
  schedule: {
    monWedFri: "주 3회, 각 90분 수업 (예: 5:00-6:30, 6:30-8:00)",
    tueThu: "주 2회, 각 120분 수업 (예: 5:30-7:30, 7:30-9:30)",
    note: "정확한 시간은 학년 및 레벨에 따라 상이하므로 상담 시 문의 바랍니다."
  },
  roadmap: [
    { level: "중등 INTER/INTER⁺", duration: "각 3개월", target: "중3 모의 3~2등급", details: "중2~3 수준의 독해, 중1~고1 수준의 듣기, 중등 전과정 문법 개념과 문제 풀이" },
    { level: "중등 MASTER/MASTER⁺", duration: "각 3개월", target: "중3 모의 1등급 / 고1 모의 4~3등급", details: "중등 과정 심화, 고등 과정 맛보기" },
    { level: "고등 INTER/INTER⁺", duration: "각 6개월", target: "고1 모의 3~2등급", details: "고1~2 수준의 독해, 고2~3 수준의 듣기, 고등 핵심 문법" },
    { level: "고등 MASTER/MASTER⁺", duration: "각 6개월", target: "고2 모의 2등급 이상", details: "고등 과정 심화 및 수능 실전 대비" },
    { level: "수능 ONE", duration: "최소 6개월", target: "고3 모의 2등급 이상", details: "수능 독해 및 문법 완성" },
  ],
};

const middleSchoolRecordData = {
    title: "데뷰 내신 프렙 과정",
    targetSchools: ["목일중", "목동중", "문래중"],
    process: [
        { 
            phase: "내신 4주 전", 
            icon: CheckSquare,
            color: "bg-yellow-400",
            tasks: [
                { title: "내신 최상위 시작", description: "오리엔테이션 및 파일 배부를 통해 한 달간의 학습 계획 및 마인드셋 수립" },
                { title: "교과서 암기", description: "내신 핵심인 교과서 본문 암기 진행 (미통과 시 무한 반복)" },
                { title: "학교 프린트 분석", description: "학생이 제출한 학교 프린트를 강사가 미리 분석하여 학습 자료 준비" },
            ]
        },
        { 
            phase: "내신 수업 기간", 
            icon: BookCopy,
            color: "bg-green-500",
            tasks: [
                { title: "학교별 내신 수업", description: "출판사/학교별 편성 수업. 평균 1,000~1,500 문제 풀이 및 개별 오답률 관리" },
                { title: "직전 보강", description: "시험 직전, 개별 학생 클리닉 및 추가 문제 풀이 진행" },
            ]
        },
        { 
            phase: "시험 후", 
            icon: CheckSquare,
            color: "bg-blue-500",
            tasks: [
                { title: "내신 마감 및 분석", description: "학생 자가 평가 기반 메타 분석 실시, 다음 시험 대비 전략 수립" },
            ]
        },
    ]
};

// --- Details Components ---
const MiddleSchoolRegularDetails = () => (
    <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
            <InfoCard icon={BookCopy} title="중등 정규 과정 소개" className="border-purple-200 md:col-span-1">
                <p>{middleSchoolRegularData.introduction}</p>
            </InfoCard>
            <InfoCard icon={CheckSquare} title="수업 시간" className="border-purple-200 md:col-span-1">
                <div className="space-y-2">
                    <p><strong>월수금 클래스:</strong> {middleSchoolRegularData.schedule.monWedFri}</p>
                    <p><strong>화목 클래스:</strong> {middleSchoolRegularData.schedule.tueThu}</p>
                </div>
                <p className="text-xs text-gray-500 mt-4 italic">{middleSchoolRegularData.schedule.note}</p>
            </InfoCard>
        </div>
        
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-purple-700 text-center mb-6">중등부 학습 로드맵</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {middleSchoolRegularData.roadmap.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 h-full flex flex-col">
                        <div className="flex items-center space-x-4 mb-3">
                            <h4 className="text-xl font-semibold text-purple-600">{item.level}</h4>
                            <span className="text-sm text-gray-500 pt-1">({item.duration})</span>
                        </div>
                        <div className="pl-2 space-y-2 text-gray-700 flex-grow">
                            <p><strong>성취 목표:</strong> {item.target}</p>
                            <p><strong>상세 학습:</strong> {item.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="text-center pt-8">
            <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#f2da00] text-gray-800 shadow-lg">
                <Link href="http://pf.kakao.com/_pGxkPn/chat" target="_blank" rel="noopener noreferrer">
                    <Users2 className="mr-2 h-5 w-5" /> 중등 정규 과정 상담
                </Link>
            </Button>
        </div>
    </div>
);

const MiddleSchoolRecordDetails = () => (
    <div className="space-y-12">
        <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-700">{middleSchoolRecordData.title}</h3>
            <p className="text-gray-600 mt-2">대상 학교: {middleSchoolRecordData.targetSchools.join(', ')}</p>
        </div>
        
        <div className="relative pl-8">
            {/* Timeline Line */}
            <div className="absolute left-12 top-0 h-full w-0.5 bg-gray-300" />

            {middleSchoolRecordData.process.map((step, index) => (
                <div key={index} className="relative mb-12">
                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white`}>
                        <step.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-16">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{step.phase}</h4>
                        <div className="space-y-4">
                            {step.tasks.map(task => (
                                <div key={task.title} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                                    <h5 className="font-semibold text-gray-700">{task.title}</h5>
                                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center pt-8">
            <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#f2da00] text-gray-800 shadow-lg">
                <Link href="http://pf.kakao.com/_pGxkPn/chat" target="_blank" rel="noopener noreferrer">
                    <Users2 className="mr-2 h-5 w-5" /> 중등 내신 과정 상담
                </Link>
            </Button>
        </div>
    </div>
);


// --- Main Component ---
const MiddleSchoolSection: React.FC<MiddleSchoolSectionProps> = ({ activeTab = 'regular', setActiveTab }) => {
  const handleTabChange = (value: string) => {
    if (setActiveTab) {
      setActiveTab(value);
    }
  };

  const renderContent = (title: string, items: string[]) => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
        <h4 className="font-bold text-lg mb-3 text-purple-700">{title}</h4>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
  );

  return (
    <AnimatedSection>
      <section id="middle-school-section" className="py-16 md:py-20">
        <SectionTitle
          icon={Target}
          title="중등부 과정"
          subtitle="내신 완벽 대비부터 수능 1등급까지, 흔들림 없는 실력을 완성합니다."
          iconColor="text-purple-500"
          titleColor="text-purple-700"
        />
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-purple-50 h-12 rounded-lg">
            <TabsTrigger value="regular" className="text-base font-semibold data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BookCopy className="w-5 h-5 mr-2" /> 중등 정규 과정
            </TabsTrigger>
            <TabsTrigger value="record" className="text-base font-semibold data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <Target className="w-5 h-5 mr-2" /> 중등 내신 과정
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regular" id="middle-regular-details" className="mt-8 p-6 md:p-10 bg-gray-50/50 rounded-lg shadow-inner border border-gray-200">
            <MiddleSchoolRegularDetails />
          </TabsContent>
          <TabsContent value="record" id="middle-school-record-details" className="mt-8 p-6 md:p-10 bg-gray-50/50 rounded-lg shadow-inner border border-gray-200">
            <MiddleSchoolRecordDetails />
          </TabsContent>
        </Tabs>
        
        <div className="text-center pt-12">
            <Button asChild size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700">
                <Link href="/timetable#middle">
                    <Calendar className="mr-2 h-5 w-5" /> 중등부 시간표 바로가기
                </Link>
            </Button>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default MiddleSchoolSection; 