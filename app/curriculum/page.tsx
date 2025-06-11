"use client";

import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { BookOpen, GraduationCap, Target, MessageSquare, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ElementaryRoadmapTableDKtoD3 from './ElementaryRoadmapTableDKtoD3';
import ElementaryRoadmapTableD4toDCreator from './ElementaryRoadmapTableD4toDCreator';
import MiddleSchoolCourseDetailsTable from './middle-school-course-details-table';
import ElementaryLevelChart from './elementary-level-chart';
import MiddleSchoolLevelChart from './middle-school-level-chart';
import SchoolRecordProcess from './school-record-process';
import TripleCareSystem from './triple-care-system';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ElementaryRegularCourse from './elementary-regular-course';
import ElementaryIntensiveCourse from './elementary-intensive-course';
import MiddleSchoolRegularCourse from './middle-school-regular-course';

interface CurriculumCardProps {
  title: string;
  description: string;
  bgColorClass: string;
  textColorClass: string;
  buttonText: string;
  icon: React.ElementType;
  anchorId: string;
  onButtonClick?: () => void;
}

const curriculumData: CurriculumCardProps[] = [
  {
    title: "초등 정규 과정",
    description: "탄탄한 기본기와 자기주도 학습 습관을 형성하는 과정입니다.",
    bgColorClass: "bg-blue-50",
    textColorClass: "text-blue-700",
    buttonText: "과정 알아보기",
    icon: BookOpen,
    anchorId: "elementary-regular-details",
  },
  {
    title: "초등 인텐시브 과정",
    description: "중등 영어 학습을 완벽하게 대비하는 초등 고학년 집중 과정입니다. 문법, 독해, 어휘력을 균형있게 강화합니다.",
    bgColorClass: "bg-purple-50",
    textColorClass: "text-purple-700",
    buttonText: "과정 알아보기",
    icon: Rocket,
    anchorId: "elementary-intensive-details",
  },
  {
    title: "중등 정규 과정",
    description: "학교 내신과 수능을 대비하는 학습 과정입니다.",
    bgColorClass: "bg-yellow-50",
    textColorClass: "text-yellow-700",
    buttonText: "과정 알아보기",
    icon: GraduationCap,
    anchorId: "middle-regular-details",
  },
  {
    title: "중등 내신 과정",
    description: "목일중, 목동중 내신을 전문적으로 대비하기 위한 과정입니다.",
    bgColorClass: "bg-purple-50",
    textColorClass: "text-purple-700",
    buttonText: "과정 알아보기",
    icon: Target,
    anchorId: "middle-school-record-details", 
  },
];

const CurriculumCard: React.FC<CurriculumCardProps> = ({
  title,
  description,
  icon: Icon,
  bgColorClass = "bg-gray-50",
  textColorClass = "text-gray-700",
  buttonText = "알아보기",
  onButtonClick,
  anchorId,
}) => {
  const handleButtonClickInternal = () => {
    if (anchorId) {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    console.log(`${title} 상담 버튼 클릭`);
    if (onButtonClick) {
      onButtonClick();
    }
    // window.open('YOUR_KAKAO_TALK_CHANNEL_LINK', '_blank');
  };

  const cardContent = (
    <div className={`rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-between ${bgColorClass} border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full`}>
      <div>
        {Icon && (
          <div className="mb-4">
            <Icon className={`w-12 h-12 ${textColorClass}`} />
          </div>
        )}
        <h3 className={`text-2xl font-bold mb-3 ${textColorClass}`}>{title}</h3>
        <p className="text-gray-600 text-base mb-6 min-h-[4.5rem]">{description}</p>
      </div>
      <Button 
        onClick={handleButtonClickInternal} 
        className="w-full mt-auto bg-slate-700 hover:bg-slate-800 text-white btn-apple-style"
      >
        <MessageSquare size={18} className="mr-2" /> 
        {buttonText}
      </Button>
    </div>
  );

  return cardContent;
};

const elementaryCourseData = {
  title: '초등 정규 과정',
  targetAudience: '대상: 초등 1~5학년',
  classOverview: {
    items: [
      { label: "수업", description: "단어시험/과제검사 → Lecture → Activity" },
      { label: "어휘", description: "자체 단어장, 외부" },
      { label: "컨텐츠", description: "교재 + 서플리먼트" },
      { label: "온라인", description: "AI 학습 플랫폼 사용" },
      { label: "스터디매니저", description: "학생 개별 미션 케어" },
      { label: "완성학습", description: "스터디 매니저와 수업 전 or 후로 선택하여 30분 or 1시간 진행" },
    ],
  },
  debutDay: '데뷰 데이: 월 1회 토요일 (이벤트 행사로 진행)',
  integratedLearning: {
    description: '데뷰 영어의 초등 프로그램은 파닉스부터 시작해 중3 수능 대비까지 연결됩니다.',
    coreCompetencies: ['어휘량의 확장', '각 영역별 영어 스킬 내재화'],
    emphasis: '영역별 특성과 학습 방식, 흥미도·성취도가 다르기 때문에 통합형 수업이 중요합니다. 단일 영역 학습은 언어 균형을 해치며, 실력 편차를 만들 수 있습니다.',
    caseStudy: {
      title: '실제 사례',
      content: '유명 영어 도서관 프로그램에서 리딩 위주 학습만 한 학생들은 어휘량은 많지만, Speaking, Writing, 문법 영역의 약점으로 인해 어학원 출신과 큰 격차를 보이곤 합니다.',
    },
  },
  skillBasedLearning: {
    title: '스킬 베이스 러닝 (Skill-Based Learning)',
    methods: [
      '픽션/논픽션 학습 방식',
      '직독직해 + 의역 → 문제 풀이 접근',
      '사고력을 요구하는 문항 대비',
      '추론, 순서 배열, 목적 찾기 등',
      '수능 킬러 문항 유형 기반 구성',
      '문법학습과 하브루타',
    ],
    exampleTopics: [
        '동의어·반의어 개념',
        '품사 개념 정리',
        '3S QR 등 리딩 스킬 습득',
    ],
    summary: '쉬운 개념부터 점진적으로 난이도를 높이며, 사고력과 어휘력 동시 강화를 실현합니다.',
  },
};

const elementaryIntensiveCourseData = {
  title: '초등 인텐시브',
  description: '초등 고학년 (5~6학년) 시기는 중학교 영어 학습을 대비하는 데 매우 중요한 시기입니다. 이 단계에서 영어의 기초가 제대로 다져지지 않으면 중학교에서 겪을 어려움이 커질 수 있습니다.',
  targetAudience: '대상: 초5 ~ 초6',
  mainSubjects: ['리딩 & 스피킹', '문법 & 하브루타'],
  textbookInfo: '교재: 자체/외부 교재 구성',
  debutDay: '데뷰 데이: 월 1회 토요일 (이벤트 행사로 진행)',
  completionStudy: '완성학습: 학생마다 과제를 수행해야할시, 학원 스케줄은 앞 또는 뒤에 고정하여 루틴으로 진행합니다.',
  additionalFeatures: [
    '심화 문법 학습 및 적용 훈련',
    '고학년 수준의 어휘 확장 및 활용',
    '참여형 수업 및 토론 활동 강화',
    '학습 리워드 시스템 적용',
    '온라인 AI 학습 레포트를 통한 심층 분석',
  ],
};

const middleSchoolCourseData = {
  title: "중등 정규 과정",
  introduction: "중학교는 영어 학습에서 결정적인 전환점이 되는 시기입니다. 단순히 더 어려운 문법과 단어를 배우는 시기를 넘어서, 학생의 영어에 대한 태도와 정체성, 그리고 장기적인 실력의 기반이 형성되는 시기이기 때문입니다. 중학교 영어는 단순히 '중간 단계'가 아니라, 성패를 가르는 결정적 시기임이 분명 합니다.",
  learningFocusPoints: [
    "수능 대비 어휘 학습 (고교 수준 선행)",
    "다양한 주제의 배경지식 학습 (독해력 향상)",
    "학교별 수행평가 완벽 대비 (쓰기, 말하기 중심)",
    "체계적인 문법 학습 (천일문 등 활용)",
    "정기적인 모의고사를 통한 실전 감각 배양",
  ]
};

export default function CurriculumPage() {
  const handleConsultationRequest = (courseTitle: string) => {
    console.log(`${courseTitle} 과정 상담 요청`);
    // 예: router.push('/consult'); 또는 모달 열기
  };

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              데뷰 영어 <span className="text-blue-600">커리큘럼</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              초등부터 중등까지, 개인의 성장과 목표에 맞춘 데뷰만의 체계적인 학습 로드맵을 확인하세요. 함께하면 영어 실력, 완성할 수 있습니다!
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {curriculumData.map((card, index) => (
            <AnimatedSection delay={0} key={index}>
              <CurriculumCard {...card} onButtonClick={() => handleConsultationRequest(card.title)} />
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection delay={0}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-12 md:mb-16">초등부 과정</h2>
        </AnimatedSection>
        
        <AnimatedSection delay={0.1}><ElementaryRoadmapTableDKtoD3 /></AnimatedSection>
        <AnimatedSection delay={0.1}><ElementaryRoadmapTableD4toDCreator /></AnimatedSection>
        <AnimatedSection delay={0.1}><ElementaryLevelChart /></AnimatedSection>

        <AnimatedSection delay={0.2}><ElementaryRegularCourse {...elementaryCourseData} id="elementary-regular-details" /></AnimatedSection>
        <AnimatedSection delay={0.2}><ElementaryIntensiveCourse {...elementaryIntensiveCourseData} id="elementary-intensive-details" /></AnimatedSection>

        <AnimatedSection delay={0}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-600 mt-16 md:mt-24 mb-12 md:mb-16">중등부 과정</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}><MiddleSchoolRegularCourse {...middleSchoolCourseData} id="middle-regular-details" /></AnimatedSection>
        <AnimatedSection delay={0.1}><MiddleSchoolLevelChart /></AnimatedSection>
        <AnimatedSection delay={0.1}><MiddleSchoolCourseDetailsTable /></AnimatedSection>

        <AnimatedSection delay={0.2}><SchoolRecordProcess id="middle-school-record-details" /></AnimatedSection>
        
        <AnimatedSection delay={0}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-600 mt-16 md:mt-24 mb-12 md:mb-16">학습 관리 시스템</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}><TripleCareSystem /></AnimatedSection>

      </div>
      <ScrollToTopButton />
    </div>
  );
} 