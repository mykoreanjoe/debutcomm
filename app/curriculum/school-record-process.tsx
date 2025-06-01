import React from 'react';
import { CalendarCheck, BookText, FileText, BookOpen, Target, Search, CheckSquare } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

interface ProcessStepProps {
  phase: string;
  phaseColor: string;
  items: Array<{
    title: string;
    description: string;
    icon?: React.ElementType;
  }>;
  phaseIcon?: React.ElementType;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ phase, phaseColor, items, phaseIcon: PhaseIcon }) => {
  return (
    <div className="md:flex mb-8">
      <div 
        className={`w-full md:w-1/4 p-4 rounded-l-lg flex flex-col items-center justify-center text-white shadow-md ${phaseColor}`}
      >
        {PhaseIcon && <PhaseIcon className="w-12 h-12 mb-2 opacity-80" />}
        <h3 className="text-xl md:text-2xl font-bold text-center">{phase}</h3>
      </div>
      <div className="w-full md:w-3/4 bg-white p-1 rounded-r-lg shadow-md">
        {items.map((item, index) => (
          <div key={index} className={`p-4 ${index < items.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <h4 className="font-semibold text-gray-700 text-md mb-1 flex items-center">
              {item.icon && <item.icon className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />} 
              {item.title}
            </h4>
            <p className="text-sm text-gray-600 pl-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface SchoolRecordProcessProps {
  id?: string;
}

const SchoolRecordProcess = (props: SchoolRecordProcessProps) => {
  const { id } = props;

  const processData: ProcessStepProps[] = [
    {
      phase: "내신 4주전",
      phaseColor: "bg-yellow-400", // 이미지의 연두색에 가까운 노란색 계열
      phaseIcon: CalendarCheck,
      items: [
        {
          title: "내신 최상위 시작",
          description: "준비된 오리엔테이션 시작으로 파일을 배부하며, 한 달의 학습을 미리 준비 / 내신 시험 대비 마인드셋 수립",
          icon: Target
        },
        {
          title: "교과서 암기",
          description: "중등하교 내신 시험 핵심인 교과서 본문암기 진행, 미통과 시 무한 반복 진행",
          icon: BookText
        },
        {
          title: "학교 프린트 제출",
          description: "담당 내신 강사가 제출된 프린트를 미리 분석하여 학습자료 준비",
          icon: FileText
        },
      ],
    },
    {
      phase: "내신수업",
      phaseColor: "bg-green-500", // 이미지의 녹색 계열
      phaseIcon: BookOpen,
      items: [
        {
          title: "학교별 내신수업 시작",
          description: "출판사 / 학교 별로 편성하여 내신 수업진행. 평균 1,000~1,500 문제를 풀이. 개별 오답율 파악 및 추가 문제 풀이 진행 (최상위 오답율 3% 내, 평균 4~10%, 최하위권 20% 이상)",
          icon: BookOpen
        },
        {
          title: "직전보강",
          description: "개별 학생 클리닉 및 문제 추가 풀이",
          icon: Search
        },
      ],
    },
    {
      phase: "시험 후",
      phaseColor: "bg-yellow-500", // 주황색에 가까운 노란색 계열
      phaseIcon: CheckSquare,
      items: [
        {
          title: "내신 마감",
          description: "내신 시험에 대한 메타 분석 실시 (학생 자가 평가). 자료를 기반으로 다음 시험 대비 학습 전략 수립",
          icon: CheckSquare
        },
      ],
    },
  ];

  const targetSchools = ["목일중", "목동중", "문래중"];

  return (
    <section id={id} className="py-12 md:py-16 bg-purple-50 rounded-lg shadow-lg mb-12 md:mb-16">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection delay={0}>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600">
              데뷰 내신 프렙 과정
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600">대상 학교: {targetSchools.join(', ')}</p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {processData.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolRecordProcess; 