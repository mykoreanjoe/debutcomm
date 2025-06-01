import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, Rocket, GraduationCap, Target, CalendarDays, BookCopy, Users, Zap, Brain, TrendingUp, LucideIcon } from 'lucide-react';
import ElementaryRoadmapTable from './elementary-roadmap-table';
import ElementaryLevelChart from './elementary-level-chart';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ElementaryRegularCourse from './elementary-regular-course';
import ElementaryIntensiveCourse from './elementary-intensive-course';
import MiddleSchoolRegularCourse from './middle-school-regular-course';
import MiddleSchoolLevelChart from './middle-school-level-chart';
import MiddleSchoolCourseDetailsTable from './middle-school-course-details-table';
import SchoolRecordProcess from './school-record-process';
import ReviewCycleDisplay from './review-cycle-display';
import TripleCareSystem from './triple-care-system';
import StudyBook from './study-book';

// Linter 상태 확인을 위한 임시 주석
interface CurriculumCardProps {
  title: string;
  description: string;
  icon?: LucideIcon | React.ElementType;
  bgColorClass?: string;
  textColorClass?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  anchorId?: string; // 상세 내용으로 이동하기 위한 ID
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
    // anchorId: "elementary-intensive-details", // 추후 추가 가능
  },
  {
    title: "중등 정규 과정",
    description: "체계적인 학습과 내신 대비를 통해 학업 성취도를 극대화하는 과정입니다.",
    bgColorClass: "bg-yellow-50",
    textColorClass: "text-yellow-700",
    buttonText: "중등 정규 과정 상담받기",
    icon: GraduationCap,
    // anchorId: "middle-regular-details", // 추후 추가 가능
  },
  {
    title: "중등 내신 과정",
    description: "학교별 맞춤 전략과 실전 훈련으로 내신 성적 향상을 목표하는 과정입니다.",
    bgColorClass: "bg-purple-50",
    textColorClass: "text-purple-700",
    buttonText: "중등 내신 과정 상담받기",
    icon: Target,
    // anchorId: "middle-intensive-details", // 추후 추가 가능
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

// 초등 정규 과정 데이터
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// 초등 인텐시브 과정 데이터
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

// 중등 정규 과정 데이터
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

export default function CurriculumPage() {
  // 임시 코드: ESLint no-unused-vars 오류 회피용
  if (process.env.NODE_ENV === 'development') {
    console.log(ElementaryRegularCourse);
    console.log(elementaryCourseData);
  }

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

      {/* 초등 과정 공통 테이블/차트 섹션 */}
      <section id="elementary-common-info" className="mb-16 space-y-12">
        <div>
          <ElementaryRoadmapTable />
        </div>
        <div>
          <ElementaryLevelChart />
        </div>
      </section>

      {/* 초등 정규 과정 상세 내용 섹션 */}
      <ElementaryRegularCourse {...elementaryCourseData} />
      
      {/* 초등 정규 과정 상세 내용 섹션 (ID로 연결된 기존 섹션) */}
      <section id="elementary-regular-details" className="pt-16 pb-12 bg-blue-50 rounded-xl shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">초등 정규 과정</h2>
            <p className="text-xl text-blue-600">🧑‍🎓 대상: 초등 1~5학년</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <CalendarDays size={24} className="mr-3" /> 시간표 &amp; 수업 구성
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-blue-800 uppercase bg-blue-100">
                    <tr>
                      <th scope="col" className="px-4 py-3">구분</th>
                      <th scope="col" className="px-4 py-3">요일</th>
                      <th scope="col" className="px-4 py-3">수업 시간</th>
                      <th scope="col" className="px-4 py-3">수업 회차</th>
                      <th scope="col" className="px-4 py-3">총 수업 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-blue-200">
                      <td rowSpan={3} className="px-4 py-3 font-medium text-gray-900 align-top border-r border-blue-200">주 3회 수업</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">월/수/금</td>
                      <td className="px-4 py-3">① 2:30 ~ 4:05</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">95분 × 3</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">285분 / 주</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-200">
                      <td className="px-4 py-3">② 4:10 ~ 5:45</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3">③ 6:00 ~ 7:35</td>
                    </tr>
                    <tr className="bg-blue-50 border-t border-blue-200">
                      <td rowSpan={2} className="px-4 py-3 font-medium text-gray-900 align-top border-r border-blue-200">주 2회 수업</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">화/목</td>
                      <td className="px-4 py-3">① 3:00 ~ 5:25</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">145분 × 2</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">290분 / 주</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3">② 6:00 ~ 8:25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><BookCopy size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>교재 구성:</strong> 자체 개발 교재 + 외부 전문 교재 혼합 운영</span></li>
                <li className="flex items-start"><CalendarDays size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>DEBUT DAY:</strong> 매월 1회 토요일 특별 수업 (이벤트 or 발표회 등)</span></li>
                <li className="flex items-start"><Users size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>완성학습:</strong> 스터디 매니저와 함께, 수업 <strong>앞 또는 뒤에 고정된 루틴</strong>으로 운영</span></li>
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                  <Zap size={24} className="mr-3" /> 통합형 수업 (Integrated Learning Approach)
                </h3>
                <p className="text-gray-700 mb-3">
                  DEBUT의 커리큘럼은 초1 파닉스부터 중3 수능까지 연계되는 시스템입니다.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 pl-4">
                  <li>어휘량의 축적</li>
                  <li>영역별 스킬의 통합 내재화 (리딩, 문법, 스피킹, 라이팅 등)</li>
                </ol>
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-600 italic">
                  영어가 어려운 이유는 &apos;영역별 공부법&apos;이 서로 다르고, 학생의 흥미·성취도도 영역마다 다르기 때문입니다.
                </blockquote>
                <p className="text-gray-700 mb-2">
                  단일 영역 중심 학습은 한계가 있으며, 통합형 수업을 통해 &apos;절름발이 영어&apos;를 예방하고 <strong>균형 잡힌 성장</strong>을 유도합니다.
                </p>
                <p className="text-gray-700">
                  대표 사례: 영어 도서관만 다녔던 학생들은 어휘력은 있지만 말하기, 쓰기, 문법에서 큰 격차가 드러납니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <Zap size={24} className="mr-3" /> 활동 &amp; 프로젝트 중심 수업
              </h3>
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-600 italic">
                &quot;그저 외우기만 하는 공부는 오래 가지 않습니다.&quot;
              </blockquote>
              <p className="text-gray-700 mb-2">
                특히 초등 저학년은 <strong>활동과 프로젝트를 통한 흥미 기반 수업</strong>이 핵심입니다.
              </p>
              <p className="text-gray-700 mb-2">
                데뷰는 &apos;컴프리헨시브 커리큘럼&apos;을 통해 주제별 리딩 스킬과 <strong>인 클래스 액티비티</strong>, <strong>프로젝트 중심 실습</strong>을 연계하여 실력 향상을 유도합니다.
              </p>
              <p className="text-gray-700">
                활동이 곧 학습이 되는 구조로, 집중력이 낮은 아이도 <strong>즐겁게 몰입</strong>할 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <Brain size={24} className="mr-3" /> Skill-Based Learning
              </h3>
              <p className="text-gray-700 mb-3">
                픽션/논픽션을 통해 리딩 사고력을 확장시키는 훈련 과정입니다.
              </p>
              <p className="text-gray-700 mb-2">
                단순 독해를 넘어서 <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">추론</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">순서 배열</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">목적 파악</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">문맥 유추</code> 등 <strong>수능형 사고 훈련</strong> 강화합니다.
              </p>
              <p className="text-gray-700 mb-2"><strong>핵심 개념:</strong></p>
              <ul className="list-disc list-outside space-y-1 text-gray-700 pl-5 mb-3">
                <li>동의어·반의어</li>
                <li>품사 구분</li>
                <li>문장 구조 패턴</li>
              </ul>
              <p className="text-gray-700">
                쉬운 개념부터 시작해 점진적으로 확장하며, <strong>활동 &amp; 프로젝트</strong>로 완전 내재화시킵니다.
              </p>
            </div>
          </div>

          {/* 초등부 레벨 차트 섹션 추가 시작 */}
          <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2 flex items-center">
              <TrendingUp size={24} className="mr-3" /> 초등부 레벨 차트
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              탄탄한 어학 기본기를 쌓으며, 다양한 프로젝트로 창의적인 학습역량을 마스터합니다.
            </p>

            <div className="flex text-xs text-center">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between pr-2 space-y-1 border-r border-gray-200 font-medium text-gray-500 min-w-[30px]">
                <span>G7*</span>
                <span>G7</span>
                <span>G6</span>
                <span>G5</span>
                <span>G4</span>
                <span>G3</span>
                <span>G2</span>
                <span>G1</span>
                <span>PK</span>
              </div>

              {/* Chart Area - Simplified Representation */}
              <div className="flex-1 grid grid-cols-5 gap-px pl-2 relative">
                {/* Background grid lines (5 columns for 5 years) */}
                {[...Array(4)].map((_, i) => (
                  <div key={`vline-${i}`} className="absolute h-full border-r border-dashed border-gray-200" style={{ left: `${(i + 1) * 20}%`, top: 0, bottom: 'calc(1.5rem + 4px)' /* Adjust to not overlap year labels */ }}></div>
                ))}
                
                {/* Level Blocks - Approximate placement and styling */}
                {/* Each child div here represents a column for a "1년 과정" */}
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* PK & G1 Column 1 */}
                  <div className="p-1 rounded text-white bg-yellow-400">DK <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-yellow-400">DK* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-gray-700 bg-lime-300 mt-8">D1 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-gray-700 bg-lime-300">D1* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G2 & G3 Column 2 */}
                  <div className="p-1 rounded text-white bg-orange-400 mt-[calc(2*1.5rem)]">D2 <span className="text-xxs">3m</span></div> {/* Adjust margin based on G1/PK height */} 
                  <div className="p-1 rounded text-white bg-orange-400">D2* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-orange-500 mt-8">D3 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-orange-500">D3* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G4 & G5 Column 3 */}
                  <div className="p-1 rounded text-white bg-red-400 mt-[calc(4*1.5rem)]">D4 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-400">D4* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-500 mt-8">D5 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-500">D5* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G6 & G7 Column 4 */}
                  <div className="p-1 rounded text-white bg-amber-600 mt-[calc(5*1.5rem)]">D6 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-600">D6* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-700 mt-8">D7 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-700">D7* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G7* Column 5 */}
                  <div className="p-1 rounded text-white bg-purple-600 mt-[calc(7*1.5rem)]">D Elite <span className="text-xxs">6m</span></div>
                  <div className="p-1 rounded text-white bg-purple-600">D Creator <span className="text-xxs">6m</span></div>
                </div>
              </div>
            </div>
            {/* Year Labels */}
            <div className="flex mt-1 pt-1 border-t border-gray-300">
              <div className="min-w-[30px] pr-2"></div> {/* Spacer for Y-axis alignment */}
              <div className="flex-1 grid grid-cols-5 text-center text-xs text-gray-500">
                {[...Array(5)].map((_, i) => (
                  <div key={`year-${i}`} className="pr-1">1년 과정</div>
                ))}
              </div>
            </div>
          </div>
          {/* 초등부 레벨 차트 섹션 추가 끝 */}
        </div>
      </section>

      {/* 초등 인텐시브 과정 섹션 */}
      <ElementaryIntensiveCourse {...elementaryIntensiveCourseData} />
      
      {/* 중등 과정 공통 테이블/차트 섹션 */}
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

      {/* 중등 정규 과정 섹션 */}
      <MiddleSchoolRegularCourse {...middleSchoolCourseData} />

      {/* 내신 과정 섹션 */}
      <section id="school-record-process" className="my-16">
         <SchoolRecordProcess />
      </section>

      {/* 복습 과정 섹션 */}
      <section id="review-process" className="mb-16">
        <ReviewCycleDisplay />
      </section>

      {/* 3중 관리 완성 학습 섹션 */}
      <section id="triple-care" className="mb-16">
        <TripleCareSystem />
      </section>

      {/* 스터디북 섹션 */}
      <section id="study-book-info" className="mb-16">
        <StudyBook />
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