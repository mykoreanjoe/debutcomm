'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionTitle from '@/components/SectionTitle';
import { BookOpen, Newspaper, Puzzle, CheckSquare, Users2, GraduationCap, BookMarked, AlertTriangle, Lightbulb, Calendar } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ElementaryRoadmapTableDKtoD3 from '@/app/curriculum/ElementaryRoadmapTableDKtoD3';
import ElementaryRoadmapTableD4toDCreator from '@/app/curriculum/ElementaryRoadmapTableD4toDCreator';
import ElementaryLevelChart from '@/app/curriculum/elementary-level-chart';


interface ElementarySectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

// Reusable InfoCard component
const InfoCard = ({ icon: Icon, title, children, className = '' }: { icon: React.ElementType, title: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full ${className}`}>
    <div className="flex items-center mb-4">
      <Icon className="w-7 h-7 mr-3 text-cyan-600" />
      <h4 className="text-xl font-bold text-gray-700">{title}</h4>
    </div>
    <div className="text-gray-600 space-y-2 text-sm md:text-base">
      {children}
    </div>
  </div>
);

// Data for Elementary Regular Course
const regularCourseData = {
  title: '초등 정규 과정',
  target: '초등 1~5학년',
  overview: [
    { label: "수업", description: "단어시험/과제검사 → Lecture → Activity" },
    { label: "어휘", description: "자체 단어장, 외부" },
    { label: "컨텐츠", description: "교재 + 서플리먼트" },
    { label: "온라인", description: "AI 학습 플랫폼 사용" },
    { label: "스터디매니저", description: "학생 개별 미션 케어" },
    { label: "완성학습", description: "스터디 매니저과 함께 30분~1시간 진행" },
  ],
  integratedLearning: {
    description: '데뷰 영어의 초등 프로그램은 파닉스부터 시작해 중3 수능 대비까지 연결됩니다. 영역별 특성과 학습 방식, 흥미도·성취도가 다르기 때문에 통합형 수업이 중요합니다.',
    coreCompetencies: ['어휘량의 확장', '각 영역별 영어 스킬 내재화'],
    caseStudy: '유명 영어 도서관 출신 학생들이 리딩 외 영역에서 큰 격차를 보이는 사례가 많습니다. 이는 통합 교육의 중요성을 보여줍니다.',
  },
  skillBasedLearning: {
    methods: [
      '픽션/논픽션 학습 방식',
      '직독직해 + 의역 → 문제 풀이 접근',
      '사고력을 요구하는 문항 대비 (추론, 순서 배열 등)',
      '수능 킬러 문항 유형 기반 구성',
    ],
    summary: '쉬운 개념부터 점진적으로 난이도를 높여 사고력과 어휘력을 동시에 강화합니다.',
  }
};

// Data for Elementary Intensive Course
const intensiveCourseData = {
  title: '초등 인텐시브 과정',
  target: '초등 5~6학년',
  description: '초등 고학년은 중등 영어를 대비하는 매우 중요한 시기입니다. 이 단계에서 기초가 제대로 다져지지 않으면 중학교에서 큰 어려움을 겪을 수 있습니다.',
  mainSubjects: ['리딩 & 스피킹', '문법 & 하브루타', '보카 (VOCA)'],
  additionalInfo: [
    { label: '교재', value: '자체/외부 교재 구성' },
    { label: '데뷰 데이', value: '월 1회 토요일 (이벤트 행사로 진행)' },
    { label: '완성학습', value: '과제 수행 필요 시, 학원 스케줄 앞/뒤에 고정하여 루틴으로 진행' },
  ],
  comparison: [
    { category: "학습 목표", elementary: "흥미와 기본 의사소통", middle: "문법 정확성, 논리적 독해" },
    { category: "어휘 수준", elementary: "기초 생활 어휘 (1-2천)", middle: "학습 중심 어휘 (3-5천)" },
    { category: "문장 구조", elementary: "단순 문장 (S+V+O)", middle: "복잡한 문장 (관계사, 분사 등)" },
    { category: "문법 난이도", elementary: "기본 시제, 품사", middle: "12시제, 수동태, 가정법 등" },
    { category: "평가 방식", elementary: "객관식, 듣기/말하기", middle: "서술형, 심층 독해, 작문" },
  ],
  learningSystems: {
    readingSpeaking: {
      preClass: ['모르는 단어 스터디북 기록', '본문 해석 직접 작성'],
      inClass: ['구문 직독직해', '문제 풀이 및 오답 분석', '문장 Keyword 쓰기'],
      postClass: ['온라인 학습', '밴드 미션 진행']
    },
    grammarHavruta: {
      quote: "문법 용어와 규칙을 쉽고 정확히 익히고, 문제에 적용하여 스스로 설명할 수 있도록 지도합니다.",
      methods: ['학생 이해 속도에 맞춘 수업', '핵심 용어/규칙 스터디북 기록 및 하브루타 설명', '오답 노트 작성 및 검사']
    }
  }
};

// Elementary Regular Course Details Component
const ElementaryRegularCourseDetails = () => (
    <>
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 mb-16">
            <div className="grid md:grid-cols-2 gap-8">
                <InfoCard icon={Newspaper} title="클래스 개요">
                    <ul className="space-y-3">
                    {regularCourseData.overview.map(item => (
                        <li key={item.label} className="flex">
                        <span className="font-semibold text-gray-800 w-28 flex-shrink-0">{item.label}</span>
                        <span>{item.description}</span>
                        </li>
                    ))}
                    </ul>
                </InfoCard>

                <InfoCard icon={BookOpen} title="통합형 학습의 중요성">
                    <p>{regularCourseData.integratedLearning.description}</p>
                    <div className="my-3 space-y-2">
                    {regularCourseData.integratedLearning.coreCompetencies.map(c => (
                        <div key={c} className="flex items-center">
                        <CheckSquare className="w-4 h-4 mr-2 text-cyan-500 flex-shrink-0" />
                        <span>{c}</span>
                        </div>
                    ))}
                    </div>
                    <div className="mt-4 p-3 bg-cyan-50/70 rounded-md text-sm italic">
                    <strong>실제 사례:</strong> {regularCourseData.integratedLearning.caseStudy}
                    </div>
                </InfoCard>

                <InfoCard icon={Puzzle} title="Skill-Based Learning" className="md:col-span-2">
                    <p className="mb-3">주요 학습 방식은 다음과 같습니다:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
                    {regularCourseData.skillBasedLearning.methods.map(m => <li key={m}>{m}</li>)}
                    </ul>
                    <p className="font-semibold border-t border-gray-200 pt-3 mt-3">{regularCourseData.skillBasedLearning.summary}</p>
                </InfoCard>
            </div>
            <div className="text-center pt-12">
                <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#f2da00] text-gray-800 shadow-lg transition-transform transform hover:scale-105">
                    <Link href="http://pf.kakao.com/_pGxkPn/chat" target="_blank" rel="noopener noreferrer">
                    <Users2 className="mr-2 h-5 w-5" /> 초등 정규 과정 상담
                    </Link>
                </Button>
            </div>
        </div>
        
        <div>
            <h3 className="text-3xl font-bold text-cyan-700 text-center mb-8">초등 정규 과정 로드맵 및 레벨 구성</h3>
            <div className="space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">초등부 레벨 구성</h4>
                    <p className="mb-4 text-sm text-gray-600">데뷰의 초등부 레벨은 학생의 성장 단계에 맞춰 체계적으로 구성되어 있습니다.</p>
                    <ElementaryLevelChart />
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">DK ~ D3 로드맵</h4>
                    <ElementaryRoadmapTableDKtoD3 />
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">D4 ~ Creator 로드맵</h4>
                    <ElementaryRoadmapTableD4toDCreator />
                </div>
            </div>
        </div>

        <div className="text-center pt-12">
            <Button asChild size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700">
                <Link href="/timetable#elementary">
                    <Calendar className="mr-2 h-5 w-5" /> 초등부 시간표 바로가기
                </Link>
            </Button>
        </div>
    </>
);

// Elementary Intensive Course Details Component
const ElementaryIntensiveCourseDetails = () => (
  <div className="space-y-12">
    <div className="text-center">
      <p className="text-lg text-gray-600 mb-4">{intensiveCourseData.target}</p>
      <div className="max-w-3xl mx-auto bg-purple-50 p-4 rounded-lg shadow-inner">
        <p className="flex items-center justify-center text-purple-800">
          <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
          {intensiveCourseData.description}
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <InfoCard icon={GraduationCap} title="코스 정보" className="border-purple-200">
        <h5 className="font-bold text-gray-800 mb-2">주요 학습 내용</h5>
        <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
          {intensiveCourseData.mainSubjects.map(s => <li key={s}>{s}</li>)}
        </ul>
        <h5 className="font-bold text-gray-800 mt-4 mb-2 border-t pt-4">추가 정보</h5>
        <ul className="space-y-2">
          {intensiveCourseData.additionalInfo.map(item => (
            <li key={item.label} className="flex">
              <span className="font-semibold text-gray-800 w-24 flex-shrink-0">{item.label}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard icon={BookMarked} title="초등 vs 중등 영어, 무엇이 다른가?" className="border-purple-200">
        <p className="mb-4">초등 고학년 때 중등 영어를 미리 대비해야 하는 이유를 비교를 통해 알아보세요.</p>
        <Accordion type="single" collapsible className="w-full">
          {intensiveCourseData.comparison.map(item => (
            <AccordionItem value={item.category} key={item.category}>
              <AccordionTrigger className="font-semibold">{item.category}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h6 className="font-bold text-sm text-gray-500 mb-1">초등</h6>
                    <p>{item.elementary}</p>
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-gray-500 mb-1">중등</h6>
                    <p>{item.middle}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </InfoCard>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-purple-700 text-center mb-6">체계적인 학습 시스템</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <InfoCard icon={BookOpen} title="리딩 & 스피킹" className="bg-sky-50/50 border-sky-200">
          <p><strong>수업 전:</strong> {intensiveCourseData.learningSystems.readingSpeaking.preClass.join(', ')}</p>
          <p><strong>수업 중:</strong> {intensiveCourseData.learningSystems.readingSpeaking.inClass.join(', ')}</p>
          <p><strong>수업 후:</strong> {intensiveCourseData.learningSystems.readingSpeaking.postClass.join(', ')}</p>
        </InfoCard>
        <InfoCard icon={Lightbulb} title="문법 & 하브루타" className="bg-indigo-50/50 border-indigo-200">
          <p className="italic mb-3">&quot;{intensiveCourseData.learningSystems.grammarHavruta.quote}&quot;</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {intensiveCourseData.learningSystems.grammarHavruta.methods.map(m => <li key={m}>{m}</li>)}
          </ul>
        </InfoCard>
      </div>
    </div>

    <div className="text-center pt-8">
      <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#f2da00] text-gray-800 shadow-lg transition-transform transform hover:scale-105">
        <Link href="http://pf.kakao.com/_pGxkPn/chat" target="_blank" rel="noopener noreferrer">
          <Users2 className="mr-2 h-5 w-5" /> 초등 인텐시브 과정 상담
        </Link>
      </Button>
    </div>
  </div>
);

const ElementarySection: React.FC<ElementarySectionProps> = ({ activeTab, setActiveTab }) => {
  return (
    <AnimatedSection>
      <section id="elementary-section" className="py-16 md:py-20">
        <SectionTitle
          icon={BookOpen}
          title="초등부 과정"
          subtitle="탄탄한 기본기, 올바른 학습 습관, 그리고 영어에 대한 자신감을 키웁니다."
          iconColor="text-cyan-500"
          titleColor="text-cyan-700"
        />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-cyan-50 h-12 rounded-lg">
            <TabsTrigger value="regular" className="text-base font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-white">초등 정규 과정</TabsTrigger>
            <TabsTrigger value="intensive" className="text-base font-semibold data-[state=active]:bg-purple-500 data-[state=active]:text-white">초등 인텐시브 과정</TabsTrigger>
          </TabsList>
          <TabsContent value="regular" id="elementary-regular-details" className="mt-8">
             <ElementaryRegularCourseDetails />
          </TabsContent>
          <TabsContent value="intensive" id="elementary-intensive-details" className="mt-8 p-6 md:p-10 bg-gray-50/50 rounded-lg shadow-inner border border-gray-200">
             <ElementaryIntensiveCourseDetails />
          </TabsContent>
        </Tabs>
      </section>
    </AnimatedSection>
  );
};

export default ElementarySection; 