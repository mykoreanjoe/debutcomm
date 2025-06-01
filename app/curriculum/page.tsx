"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, Rocket, GraduationCap, Target, LucideIcon, CheckCircle2 } from 'lucide-react';
import ElementaryRoadmapTable from './elementary-roadmap-table';
import ElementaryLevelChart from './elementary-level-chart';
import ElementaryRegularCourse from './elementary-regular-course';
import ElementaryIntensiveCourse from './elementary-intensive-course';
import MiddleSchoolRegularCourse from './middle-school-regular-course';
import MiddleSchoolLevelChart from './middle-school-level-chart';
import MiddleSchoolCourseDetailsTable from './middle-school-course-details-table';
import SchoolRecordProcess from './school-record-process';
import ReviewCycleDisplay from './review-cycle-display';
import TripleCareSystem from './triple-care-system';
import StudyBook from './study-book';

interface CurriculumCardProps {
  title: string;
  description: string;
  icon?: LucideIcon | React.ElementType;
  bgColorClass?: string;
  textColorClass?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  anchorId?: string;
}

const curriculumData: CurriculumCardProps[] = [
  {
    title: "초등 정규 과정",
    description: "탄탄한 기본기와 자기주도 학습 습관을 형성하는 과정입니다.",
    bgColorClass: "bg-blue-50",
    textColorClass: "text-blue-700",
    buttonText: "초등 정규 과정 상담받기",
    icon: BookOpen,
    anchorId: "elementary-regular-details",
  },
  {
    title: "초등 인텐시브 과정",
    description: "심화 학습과 다양한 액티비티를 통해 영어 실력을 한 단계 높이는 집중 과정입니다.",
    bgColorClass: "bg-green-50",
    textColorClass: "text-green-700",
    buttonText: "초등 인텐시브 과정 상담받기",
    icon: Rocket,
    anchorId: "elementary-intensive-details",
  },
  {
    title: "중등 정규 과정",
    description: "체계적인 학습과 내신 대비를 통해 학업 성취도를 극대화하는 과정입니다.",
    bgColorClass: "bg-yellow-50",
    textColorClass: "text-yellow-700",
    buttonText: "중등 정규 과정 상담받기",
    icon: GraduationCap,
    anchorId: "middle-regular-details",
  },
  {
    title: "중등 내신 과정",
    description: "학교별 맞춤 전략과 실전 훈련으로 내신 성적 향상을 목표하는 과정입니다.",
    bgColorClass: "bg-purple-50",
    textColorClass: "text-purple-700",
    buttonText: "중등 내신 과정 상담받기",
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
  buttonText = "상담받기",
  onButtonClick,
  anchorId,
}) => {
  const handleButtonClickInternal = () => {
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
        className="w-full mt-auto bg-slate-700 hover:bg-slate-800 text-white"
      >
        <MessageSquare size={18} className="mr-2" /> 
        {buttonText}
      </Button>
    </div>
  );

  if (anchorId) {
    return <a href={`#${anchorId}`} className="block h-full">{cardContent}</a>;
  }

  return cardContent;
};

const elementaryCourseData = {
  title: '4.1 D 초등 정규 과정',
  targetAudience: '초등 1~5학년',
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
  monWedFriClass: {
    title: "월수금 클래스",
    columns: ["시간", "레벨"],
    rows: [
      { level: "DK ~ D4", time: "2:30 ~ 4:05", teacher: "" },
      { level: "D3 ~ D6", time: "4:10 ~ 5:45", teacher: "" },
      { level: "초등 인텐시브 코스", time: "6:00 ~ 7:35", teacher: "" },
    ],
    recommendation: "추천대상: 주3회 수업으로 학습 노출을 여러번 해야 하는 학생에게 적합",
  },
  tueThuClass: {
    title: "화목 클래스",
    columns: ["시간", "레벨"],
    rows: [
      { level: "D3 ~ D7", time: "화목 3:00 ~ 5:25", teacher: "" },
      { level: "초등 인텐시브", time: "화목 600 ~ 8:30", teacher: "" },
    ],
    recommendation: "추천대상: 주2회 수업으로 학습 노출을 여러번 해야 하는 학생에게 적합",
    completionStudyPoints: [
      "학생생의 특성에 따라 학원 스케줄은 앞 또는 뒤에 고정하여 루틴 진행",
      "시간: 30분 or 1시간 진행",
      "완성도에 따라 좀더 빨리 끝날수 있습니다"
    ],
  },
  debutDay: '데뷰 데이: 월 1회 토요일 (이벤트 행사로 진행)',
  integratedLearning: {
    description: '데뷰 영어학원의 초등 프로그램은 파닉스부터 시작해 중3 수능 대비까지 연결됩니다.',
    coreCompetencies: ['어휘량의 확장', '각 영역별 영어 스킬 내재화'],
    emphasis: '영역별 특성과 학습 방식, 흥미도·성취도가 다르기 때문에 통합형 수업이 중요합니다. 단일 영역 학습은 언어 균형을 해치며, 실력 편차를 만들 수 있습니다.',
    caseStudy: {
      title: '실제 사례',
      content: '유명 영어 도서관 프로그램에서 리딩 위주 학습만 한 학생들은 어휘량은 많지만, Speaking, Writing, 문법 영역의 약점으로 인해 어학원 출신과 큰 격차를 보이곤 합니다.',
    },
  },
  activitiesAndProjects: {
    title: '활동과 프로젝트 (Fun Activities and Projects)',
    points: [
      '암기만으로 실력이 느는 것은 맞지만, 흥미가 없다면 정체기 발생',
      '초등 저학년일수록 수업과 활동/프로젝트의 연계가 매우 중요함',
      '컴프리헨시브 커리큘럼 기반 수업 진행',
      '주제별 리딩 스킬 + 연계 인클래스 액티비티 + 프로젝트 학습',
      '집중력이 낮은 학생들도 즐기며 실력 향상 가능',
    ],
  },
  skillBasedLearning: {
    title: '스킬 베이스 러닝 (Skill-Based Learning)',
    methods: [
      '픽션/논픽션 학습 방식',
      '직독직해 + 의역 → 문제 풀이 접근',
      '사고력을 요구하는 문항 대비',
      '추론, 순서 배열, 목적 찾기 등',
      '수능 킬러 문항 유형 기반 구성',
    ],
    exampleTopics: [
        '동의어·반의어 개념',
        '품사 개념 정리',
        '3S QR 등 리딩 스킬 습득',
    ],
    summary: '쉬운 개념부터 점진적으로 난이도를 높이며, 활동과 프로젝트를 통해 사고력 + 어휘력 동시 강화를 실현합니다.',
  },
};

const elementaryIntensiveCourseData = {
  title: '4.2 DI 초등 인텐시브',
  description: '초등 고학년 (5~6학년) 시기는 중학교 영어 학습을 대비하는 데 매우 중요한 시기입니다. 이 단계에서 영어의 기초가 제대로 다져지지 않으면 중학교에서 겪을 어려움이 커질 수 있습니다.',
  targetAudience: '초5~6',
  mainSubjects: ['리딩 & 스피킹', '문법 & 하브루타'],
  schedule: [
    { type: "월수금 주3회", time: "6:00 ~ 7:35", duration: "(95분)" },
    { type: "화목 주2회", time: "6:00 ~ 8:25", duration: "(285분)" },
  ],
  tuition: '수강료: 월 32만원 + 온라인비 1만원 > 총 33만원',
  textbookInfo: '교재: 자체/외부 교재 구성',
  debutDay: '데뷰 데이: 월 1회 토요일 (이벤트 행사로 진행)',
  completionStudy: '완성학습: 학생마다 과제를 수행해야할시, 학원 스케줄은 앞 또는 뒤에 고정하여 루틴으로 진행합니다.',
};

const middleSchoolCourseData = {
  title: "중등 정규 과정",
  introduction: "중학교는 영어 학습에서 결정적인 전환점이 되는 시기입니다. 단순히 더 어려운 문법과 단어를 배우는 시기를 넘어서, 학생의 영어에 대한 태도와 정체성, 그리고 장기적인 실력의 기반이 형성되는 시기이기 때문입니다. 중학교 영어는 단순히 '중간 단계'가 아니라, 성패를 가르는 결정적 시기임이 분명 합니다.",
  comparisonTable: {
    title: "중학교 vs 고등학교 영어 비교표",
    columns: ["항목", "중학교 영어", "고등학교 영어"],
    rows: [
      {
        item: "학습 목적",
        middleSchool: "기초 문법·어휘 습득, 영어의 흥미 유지",
        highSchool: "수능·내신 대비 중심, 실전 문제 해결 능력 강화",
      },
      {
        item: "교과서 난이도",
        middleSchool: "일상 대화와 기본적인 설명 중심",
        highSchool: "추상적 주제, 학문적 어휘 포함 (ex. 철학, 과학, 사회 등)",
      },
      {
        item: "어휘 수준",
        middleSchool: "초등 연계 + 기초 중등어휘 (~3,000단어 수준)",
        highSchool: "고급 어휘 + 수능 어휘 (~6,000단어 이상)",
      },
      {
        item: "문법 범위",
        middleSchool: "시제, 조동사, 접속사, 관계대명사 등 기초 문법",
        highSchool: "가정법, 도치, 강조, 준동사 등 심화 문법",
      },
      {
        item: "평가 유형",
        middleSchool: "객관식 + 서술형 중심, 기본 독해·듣기 포함",
        highSchool: "복합 사고, 비판, 순서 배열, 간접쓰기 등 고난도 유형",
      },
      {
        item: "지문 길이 및 난이도",
        middleSchool: "짧고 생활문 정보 중심 (150~250단어 내외)",
        highSchool: "장문, 다층적 구조 (400~700단어 이상)",
      },
      {
        item: "듣기 평가",
        middleSchool: "일상·어휘 사용 듣기, 난이도 낮음",
        highSchool: "수능 스타일의 심층 듣기, 고난이도 의사소통 상황",
      },
      {
        item: "쓰기/말하기 활동",
        middleSchool: "수행평가 중심, 짧은 문장 표현",
        highSchool: "수행평가 또는 에세이에 기반, 구조화된 논리적 글쓰기",
      },
      {
        item: "학습 전략",
        middleSchool: "반복·암기 기반 학습 + 흥미 유도 활동",
        highSchool: "유형 분석 + 시간 관리 + 집중 독해 및 문법 전략",
      },
      {
        item: "수업 방식",
        middleSchool: "게임, 활동, 조별 수업 등 참여형 수업",
        highSchool: "문제 풀이 중심, 수능 대비식 수업 비중 ↑",
      },
      {
        item: "자기주도학습 필요성",
        middleSchool: "낮은 편 (학원·학교 주도)",
        highSchool: "매우 높음 (자기 학습·오답 관리 필수)",
      },
      {
        item: "성적 변별력",
        middleSchool: "상대적으로 낮음",
        highSchool: "매우 높음 - 수시·정시 모두 영어에 반영",
      },
    ],
  },
  timeTable: {
    title: "시간표",
    monFriClass: {
      title: "월금 클래스",
      columns: ["레벨", "시간", "담당T"],
      rows: [
        { level: "중등 Master", time: "5:00 ~ 8:00 (수업후 30분 완성학습 의무)", teacher: "원장 직강" },
        { level: "고등 Inter", time: "7:00 ~ 10:00 (수업전 30분 완성학습 의무)", teacher: "원장 직강" },
      ],
    },
    tueThuClass: {
      title: "화목 클래스",
      columns: ["레벨", "시간", "담당T"],
      rows: [
        { level: "중등 Master", time: "5:00 - 8:00 (수업후 30분 완성학습 의무)", teacher: "원장 직강" },
        { level: "고등 Master", time: "7:00 ~ 10:00 (수업전 30분 완성학습 의무)", teacher: "원장 직강" },
      ],
    },
    additionalInfo: [
      "수업 프로세스: 어휘시험 → Lecture → 1:1 검사 발표 → 밴드 과제",
      "완성학습: 스터디 매니저와 수업 전 or 후로 선택하여 30분 or 1시간 진행",
      "수요 클리닉: 실력 부족의 학생들은 수요일 의무 참석 (시간은 학생에 따라 다름)",
    ],
    wednesdayClinic: {
      title: "수요 클리닉",
      columns: ["레벨", "시간", "담당T"],
      rows: [
        { level: "무레벨제", time: "5:00 ~ 10:00", teacher: "원장 직강" },
      ],
      recommendation: "추천 대상: 주2회 수업으로 학습 노출을 여러번 해야 하는 학생에게 적합/부족한 학생들은 수요일 or 다른 요일에 필수 참여",
    },
  },
};

const elementaryLearningItems = [
  "매월 스피킹 발표",
  "학습 리워드",
  "영상 포트폴리오",
  "온라인 AI 학습 레포트",
  "데뷰카드",
  "참여형 클래스",
  "문법학습과 하브루타",
];

const middleSchoolLearningItems = [
  "수능 대비 어휘 학습",
  "배경지식 학습",
  "수행평가 대비",
  "천일문 학습 등",
];

export default function CurriculumPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          데뷰 영어 커리큘럼
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          가장 완성도 높은 커리큘럼이 세심한 강사, 가장 정확한 온라인 AI, 꼼꼼한 스터디 매니저와 함께, <br className="hidden md:inline" />우리 학생에게 꼭 필요한 학습을 만들어 갑니다.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">과정 안내</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {curriculumData.map((curriculum) => (
            <CurriculumCard
              key={curriculum.title}
              {...curriculum}
            />
          ))}
        </div>
      </section>

      <section id="elementary-common-info" className="mb-16 space-y-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 pt-8 border-t border-gray-200">
          초등부 공통 안내
        </h2>
        <div>
          <ElementaryRoadmapTable />
        </div>
        <div>
          <ElementaryLevelChart />
        </div>
      </section>

      <section id="elementary-regular-details" className="mb-16">
        <ElementaryRegularCourse {...elementaryCourseData} />
      </section>
      
      <section id="elementary-intensive-details" className="mb-16">
        <ElementaryIntensiveCourse {...elementaryIntensiveCourseData} />
      </section>
      
      <section id="middleschool-common-info" className="my-16 space-y-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 pt-8 border-t border-gray-200">
          중등부 공통 안내
        </h2>
        <div>
          <MiddleSchoolLevelChart />
        </div>
        <div>
          <MiddleSchoolCourseDetailsTable />
        </div>
      </section>

      <section id="middle-regular-details" className="mb-16">
        <MiddleSchoolRegularCourse {...middleSchoolCourseData} />
      </section>

      <section id="middle-school-record-details" className="my-16">
         <SchoolRecordProcess />
      </section>

      <section id="review-process" className="mb-16">
        <ReviewCycleDisplay />
      </section>

      <section id="triple-care" className="mb-16">
        <TripleCareSystem />
      </section>

      <section id="study-book-info" className="mb-16">
        <StudyBook />
      </section>

      <section id="elementary-program" className="my-16 md:my-20 p-6 md:p-8 rounded-xl shadow-xl bg-sky-50 border border-sky-200">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-3 text-center">초등부 집중 프로그램</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          흥미와 실력을 동시에! 데뷰 초등부는 창의적이고 활동적인 학습 환경을 통해 영어의 기초를 단단히 다지고, 자신감을 키워줍니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {elementaryLearningItems.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start">
              <CheckCircle2 className="h-6 w-6 text-sky-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-md">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="middle-school-program" className="my-16 md:my-20 p-6 md:p-8 rounded-xl shadow-xl bg-indigo-50 border border-indigo-200">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-3 text-center">중등부 심화 프로그램</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          내신부터 수능까지, 흔들림 없는 실력! 데뷰 중등부는 체계적인 학습 관리와 심도 있는 프로그램으로 학업 성취도를 극대화합니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {middleSchoolLearningItems.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start">
              <CheckCircle2 className="h-6 w-6 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-md">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center mt-12">
        <p className="text-gray-600">
          💬 각 과정 하단에는 &quot;이 과정 상담받기&quot; 버튼이 제공될 예정이며, 카카오 상담톡으로 연동됩니다.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          (현재 &quot;초등 정규 과정&quot; 및 &quot;초등 인텐시브 과정&quot;에 예시 버튼이 적용되어 있습니다.)
        </p>
      </footer>
    </main>
  );
} 