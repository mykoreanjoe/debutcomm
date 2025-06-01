import React from 'react';
import Link from 'next/link';
import { Lightbulb, Zap, Rocket, BookOpen, Target, CheckCircle2 } from 'lucide-react';
// import ReviewCycleDisplay from "./review-cycle-display"; // 존재하지 않는 컴포넌트 import 주석 처리
import Head from 'next/head';

const learningStages = [
  {
    id: "discover",
    name: "DISCOVER",
    icon: Lightbulb,
    title: "호기심을 자극하는 발견의 시작",
    description: "학생 개개인의 잠재력과 흥미를 발견하고, 학습 목표를 설정하는 단계입니다.",
    bgColor: "bg-sky-100",
    textColor: "text-sky-700",
    borderColor: "border-sky-500",
    hoverBgColor: "hover:bg-sky-200",
  },
  {
    id: "engage",
    name: "ENGAGE",
    icon: Zap,
    title: "능동적으로 참여하는 몰입의 즐거움",
    description: "흥미로운 콘텐츠와 인터랙티브 활동을 통해 학습에 깊이 몰입하는 단계입니다.",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
    borderColor: "border-amber-500",
    hoverBgColor: "hover:bg-amber-200",
  },
  {
    id: "boost",
    name: "BOOST",
    icon: Rocket,
    title: "실력을 급상승시키는 집중 강화",
    description: "핵심 개념을 다지고, 심화 학습을 통해 실력을 빠르게 향상시키는 단계입니다.",
    bgColor: "bg-rose-100",
    textColor: "text-rose-700",
    borderColor: "border-rose-500",
    hoverBgColor: "hover:bg-rose-200",
  },
  {
    id: "unfold",
    name: "UNFOLD",
    icon: BookOpen,
    title: "지식을 펼치고 확장하는 응용력 향상",
    description: "배운 내용을 다양한 상황에 적용하고, 창의적으로 문제를 해결하는 능력을 키우는 단계입니다.",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-500",
    hoverBgColor: "hover:bg-emerald-200",
  },
  {
    id: "train",
    name: "TRAIN",
    icon: Target,
    title: "완벽을 향한 꾸준한 실력 단련",
    description: "지속적인 연습과 실전 훈련을 통해 학습 내용을 완전히 자기 것으로 만드는 단계입니다.",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-500",
    hoverBgColor: "hover:bg-indigo-200",
  },
];

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

/* // 사용되지 않는 변수 주석 처리
const engageComponents = [
  {
    title: "Lecture & Class",
    details: [
      "참여형 수업 구성",
      "질문, 발표, 퀴즈 등 상호작용 중심 활동 강화",
    ]
  },
  {
    title: "미션 시스템",
    details: [
      "매주 수업과 연계된 과제 제시",
      "미션 카드 제공으로 동기 부여",
    ]
  },
  {
    title: "과제 관리",
    details: [
      "'복습 루틴' 강조: 수업 → 스터디북, 교재 핵심 정리 → 과제 수행, 학습 습관 형성",
    ]
  },
  {
    title: "스터디북",
    details: [
      "학습 내용 정리 훈련",
    ]
  },
];

const boostActivities = [
  "미션(일일 과제) 수행",
  "스피킹 영상 포트폴리오 (반 밴드 활용)",
  "쓰기 복습 기록 관리 (스터디북)",
  "원아워 AI 프로그램으로 종합 복습 관리",
  "미션 카드와 데뷰 포인트로 학습 동기 부여",
];

const boostOutputs = [
  { item: "미션 수행 기록", format: "체크리스트 / 스티커 / 스탬프 카드", purpose: "학습 습관 형성" },
  { item: "스피킹 영상", format: "주간 영상 파일 + 반별 공유", purpose: "말하기 자신감 및 콘텐츠화" },
  { item: "쓰기 복습본", format: "스터디북에 누적된 문장 기록", purpose: "쓰기 실력 내재화" },
  { item: "월간 리포트", format: "개인별 성취도 분석 + 향후 제안", purpose: "학부모와의 연계 커뮤니케이션 도구" },
  { item: "데뷰 포인트 시스템", format: "누적 포인트 차트 + 보상 연계", purpose: "학습 지속성과 몰입도 관리" },
];

const unfoldTableData = [
  { item: "일일/월말 평가", description: "누적 학습 결과를 확인하는 정기 시험 운영" },
  { item: "원아워 월간 리포트", description: "AI 분석 기반 학습 리포트 제공" },
  { item: "스스보하 / 스내보하 챔피언", description: "우수한 성과를 보인 학생들을 챔피언으로 선정" },
  { item: "정기 외부 인증 시험", description: "TOSEL, TOEFL Junior 등 성취도 측정 평가 운영" },
  { item: "데뷰인 선정", description: "자율성과 성취의 상징, 모범 사례로 학생 동기 부여" },
];

const trainTableData = [
  { item: "완성학습 운영", description: "수업 전/후 추가 학습 시간 확보 → 부족 개념 보완 및 완성도 높이기" },
  { item: "동기 파악 및 루틴 조정", description: "학생의 심리적/환경적 요인 분석 후 → 학기 단위 루틴 재설계" },
];
*/

export default function LearningProcessPage() {
  return (
    <>
      <Head>
        <title>학습 과정 | 데뷰</title>
        <meta name="description" content="데뷰의 체계적인 학습 과정과 초등부, 중등부 프로그램을 안내합니다." />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            D.E.B.U.T 학습 과정
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            개념 이해부터 심화 학습, 초등부와 중등부를 위한 맞춤형 프로그램까지, 데뷰는 학생들의 성공적인 학습을 지원합니다.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {learningStages.map((stage, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${stage.bgColor}`}
            >
              <div className="flex justify-center mb-5">
                <stage.icon className={`w-20 h-20 p-3 rounded-full bg-white/70 shadow-md ${stage.textColor}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${stage.textColor}`}>{stage.name}</h3>
              <p className={`text-md font-medium ${stage.textColor === 'text-gray-600' || stage.textColor === 'text-gray-700' ? 'text-opacity-90' : stage.textColor} min-h-[3em]`}>
                {stage.title}
              </p>
            </div>
          ))}
        </section>

        <section id="elementary" className="mb-16 md:mb-20 p-6 md:p-8 rounded-xl shadow-xl bg-sky-50 border border-sky-200">
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

        <section id="middle" className="mb-16 md:mb-20 p-6 md:p-8 rounded-xl shadow-xl bg-indigo-50 border border-indigo-200">
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

        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            더 알아보기
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            데뷰의 다양한 프로그램과 교육 철학에 대해 더 자세히 알아보세요.
          </p>
          <Link href="/curriculum"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
            커리큘럼 보기
          </Link>
        </section>
        
        {/* 복습 과정 섹션 추가 - 존재하지 않는 컴포넌트이므로 주석 처리 */}
        {/* <ReviewCycleDisplay /> */}
      </main>
    </>
  );
} 