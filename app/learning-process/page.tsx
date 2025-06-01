import React from 'react';
import Link from 'next/link';
import { Lightbulb, Zap, Rocket, BookOpen, Target, ExternalLink, UserCheck, BookHeart, NotebookText, BrainCircuit } from 'lucide-react';
// import ReviewCycleDisplay from "./review-cycle-display"; // 존재하지 않는 컴포넌트 import 주석 처리
import Head from 'next/head';

const learningStages = [
  {
    id: "discover",
    name: "DISCOVER",
    mainTitle: "DISCOVER 발견하다",
    icon: Lightbulb,
    subtitle: "새로운 환경에 적응하며 아이의 강점과 약점을 발견하는 시간",
    details: (
      <ul className="space-y-2 text-left text-xs text-gray-700">
        <li><strong className="font-semibold">Orientation Week:</strong> 첫 수업 주간에 아이의 학습 스타일, 반응을 관찰</li>
        <li><strong className="font-semibold">해피콜 상담:</strong> 학부모와의 초기 전화 또는 면담 상담 (방향성 공유, 니즈 파악, 기대 조율)</li>
        <li><strong className="font-semibold">학생과의 라포 형성:</strong> 학습 설계 이전, 신뢰 관계부터 우선 구축</li>
      </ul>
    ),
    bgColor: "bg-sky-100",
    textColor: "text-sky-700",
  },
  {
    id: "engage",
    name: "ENGAGE",
    mainTitle: "ENGAGE 참여하다",
    icon: Zap,
    subtitle: "본격적으로 수업에 몰입하며 기초 실력을 다지는 시기",
    details: (
      <div className="space-y-3 text-left text-xs text-gray-700">
        <div>
          <h4 className="font-semibold mb-1 text-sm">주요 구성 요소:</h4>
          <ul className="space-y-1 pl-2">
            <li><strong>Lecture & Class:</strong> 적극적인 참여 중심 수업 진행</li>
            <li><strong>미션 시스템:</strong> 수업 연계 도전 과제를 통한 자기주도성 강화</li>
            <li><strong>과제 관리:</strong> 매 수업 과제 제출, 복습 루틴 형성</li>
            <li><strong>스터디북 작성 시작:</strong> 내가 무엇을 배우고 있는지 스스로 기록하는 훈련</li>
          </ul>
        </div>
        <div className="mt-2 pt-2 border-t border-amber-300">
          <p className="text-xs font-semibold mb-1">&quot;같이 완성&quot;의 핵심인 몰입을 설명합니다.</p>
          <p className="text-xs mb-1 font-medium">분기 구조:</p>
          <ul className="space-y-1 pl-2">
            <li><Link href="/debut-class#elementary" className="hover:underline text-amber-800 flex items-center text-xs">초등 정규 과정 <ExternalLink size={12} className="ml-1" /></Link></li>
            <li><Link href="/debut-class#intensive" className="hover:underline text-amber-800 flex items-center text-xs">초등 인텐시브 과정 <ExternalLink size={12} className="ml-1" /></Link></li>
            <li><Link href="/debut-class#middle" className="hover:underline text-amber-800 flex items-center text-xs">중등 정규 과정 <ExternalLink size={12} className="ml-1" /></Link></li>
          </ul>
        </div>
      </div>
    ),
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
  },
  {
    id: "boost",
    name: "BOOST",
    mainTitle: "BOOST 신장시키다",
    icon: Rocket,
    subtitle: "학습 내용을 자기 것으로 다지는 과정",
    details: (
      <div className="space-y-3 text-left text-xs text-gray-700">
        <ul className="space-y-1">
          <li>미션(일일 과제) 수행</li>
          <li>스피킹 영상 포트폴리오 (반 밴드 활용)</li>
          <li>쓰기 복습 기록 관리 (스터디북)</li>
          <li>원아워 AI 프로그램으로 종합 복습 관리</li>
          <li>미션 카드와 데뷰 포인트로 학습 동기 부여</li>
        </ul>
        <div className="mt-2 pt-2 border-t border-rose-300">
          <h4 className="font-semibold text-sm mb-1">✅ 학습 결과물:</h4>
          <div className="space-y-1">
            <p><strong>미션 수행 기록:</strong> 체크리스트/스티커/스탬프 카드 (학습 습관 형성)</p>
            <p><strong>스피킹 영상:</strong> 주간 영상 파일 + 반별 공유 (말하기 자신감 및 콘텐츠화)</p>
            <p><strong>쓰기 복습본:</strong> 스터디북에 누적된 문장 기록 (쓰기 실력 내재화)</p>
            <p><strong>월간 리포트:</strong> 개인별 성취도 분석 + 향후 제안 (학부모 연계)</p>
            <p><strong>데뷰 포인트 시스템:</strong> 누적 포인트 차트 + 보상 연계 (지속성과 몰입도 관리)</p>
          </div>
        </div>
      </div>
    ),
    bgColor: "bg-rose-100",
    textColor: "text-rose-700",
  },
  {
    id: "unfold",
    name: "UNFOLD",
    mainTitle: "UNFOLD 펼치다",
    icon: BookOpen,
    subtitle: "읽기, 쓰기, 말하기 등 통합 학습을 통해 자신의 실력을 펼치는 과정",
    details: (
       <div className="space-y-3 text-left text-xs text-gray-700">
        <ul className="space-y-1">
          <li><strong>데뷰 미션:</strong> 배운 내용을 자기 언어로 표현하는 과제</li>
          <li><strong>카드 시스템:</strong> 수행한 미션을 보상 받을 수 있도록 학습 동기 관리</li>
          <li><strong>네이버 밴드:</strong> Speaking과 Writing 점검</li>
        </ul>
        <div className="mt-2 pt-2 border-t border-emerald-300">
          <h4 className="font-semibold text-sm mb-1">주요 활동:</h4>
          <ul className="space-y-1">
            <li>일일 학습 결과 공유 (사진 예시 포함)</li>
            <li>원아워 AI 리포트 (이미지 포함)</li>
            <li>반밴드 미션 영상</li>
            <li>스터디북 체크 + 리워드</li>
            <li>월말 챔피언 시상 (아카데믹/보카/스피킹 등)</li>
          </ul>
        </div>
      </div>
    ),
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  {
    id: "train",
    name: "TRAIN",
    mainTitle: "TRAIN 훈련하다",
    icon: Target,
    subtitle: "시험, 실전 문제풀이, 결과 점검을 통해 학습을 완성하는 마무리 단계",
    details: (
      <div className="space-y-3 text-left text-xs text-gray-700">
        <div>
          <h4 className="font-semibold text-sm mb-1">주요 구성 요소:</h4>
          <ul className="space-y-1 pl-2">
            <li><strong>완성수업:</strong> 전체 학습 내용을 실전처럼 정리 및 점검</li>
          </ul>
        </div>
        <div className="mt-2 pt-2 border-t border-indigo-300">
          <h4 className="font-semibold text-sm mb-1">세부 운영:</h4>
           <ul className="space-y-1">
            <li>학생 집중력/이해도/학습속도 고려</li>
            <li>수업 전후 루틴 조정 + 시간대 최적화</li>
            <li>월간 상담 & 트레이닝 재설계</li>
          </ul>
        </div>
      </div>
    ),
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
];

// const elementaryLearningItems = [
//   "매월 스피킹 발표",
//   "학습 리워드",
//   "영상 포트폴리오",
//   "온라인 AI 학습 레포트",
//   "데뷰카드",
//   "참여형 클래스",
//   "문법학습과 하브루타",
// ];

// const middleSchoolLearningItems = [
//   "수능 대비 어휘 학습",
//   "배경지식 학습",
//   "수행평가 대비",
//   "천일문 학습 등",
// ];

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
        <title>D.E.B.U.T 학습 과정 | 데뷰 영어 학원</title>
        <meta name="description" content="데뷰 영어 학원의 D.E.B.U.T (Discover, Engage, Boost, Unfold, Train) 5단계 학습 과정을 자세히 안내합니다." />
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

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {learningStages.map((stage) => (
            <div
              key={stage.id}
              className={`p-4 md:p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col ${stage.bgColor} border ${stage.textColor.replace('text-', 'border-')}/30`}
            >
              <div className="flex items-center mb-3 md:mb-4">
                <stage.icon className={`w-10 h-10 md:w-12 md:h-12 p-2 rounded-full bg-white/80 shadow-md ${stage.textColor} mr-3 flex-shrink-0`} />
                <div>
                  <h3 className={`text-xl md:text-2xl font-bold ${stage.textColor}`}>{stage.mainTitle || stage.name}</h3>
                  {stage.subtitle && <p className={`text-xs md:text-sm font-medium ${stage.textColor === 'text-gray-600' || stage.textColor === 'text-gray-700' ? 'text-opacity-90' : stage.textColor}`}>{stage.subtitle}</p>}
                </div>
              </div>
              <div className={`mt-2 pt-3 border-t ${stage.textColor.replace('text-', 'border-')}/20 text-xs md:text-sm flex-grow`}>
                {stage.details}
              </div>
            </div>
          ))}
        </section>

        {/* <section id="elementary" className="mb-16 md:mb-20 p-6 md:p-8 rounded-xl shadow-xl bg-sky-50 border border-sky-200">
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
        </section> */}

        <section className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            더 알아보기
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            데뷰 영어 학원의 커리큘럼과 클래스들을 더 자세히 알아 보세요.
          </p>
          <Link href="/curriculum"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
            커리큘럼 바로 가기
          </Link>
        </section>
        
        {/* 복습 과정 섹션 추가 - 존재하지 않는 컴포넌트이므로 주석 처리 */}
        {/* <ReviewCycleDisplay /> */}

        {/* 초등 인텐시브 클래스 주요 특징 섹션 추가 */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-semibold text-[#ff8f00] mb-6 text-center flex items-center justify-center">
            <Zap className="w-7 h-7 mr-2" /> 초등 인텐시브 클래스 주요 특징 
          </h3>
          <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-5 text-center">
            {[
              { icon: UserCheck, label: '1인 담임제' },
              { icon: BookHeart, label: '스터디매니저' },
              { icon: NotebookText, label: '스터디북' },
              { icon: Target, label: '완성학습' },
              { icon: BrainCircuit, label: '온라인AI' },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-amber-50 rounded-lg shadow-sm">
                <feature.icon className="w-10 h-10 text-[#ff8f00] mb-3" />
                <p className="font-semibold text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 