import React from 'react';
import Link from 'next/link';
import { Lightbulb, Zap, Rocket, BookOpen, Target, ExternalLink, UserCheck, BookHeart, NotebookText, BrainCircuit, Award, BookMarked, Users, Edit3, MessageSquare, Briefcase, FolderArchive, CheckSquare, Brain } from 'lucide-react';
import Image from 'next/image';
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

// ReviewCycleSection 및 관련 데이터 정의
interface ReviewStepProps {
  name: string;
  description: string;
  color: string;
  textColor?: string;
}
interface ReviewCycleSectionProps {
  title: string;
  description: string;
  steps: ReviewStepProps[];
  icon?: React.ElementType;
  titleColor?: string;
  sectionBgColor?: string;
}
const ReviewCycleSection: React.FC<ReviewCycleSectionProps> = ({
  title,
  description,
  steps,
  icon: Icon,
  titleColor = 'text-blue-700',
  sectionBgColor = 'bg-white',
}) => {
  return (
    <div className={`mb-16 p-6 md:p-8 rounded-lg shadow-xl ${sectionBgColor}`}>
      <h3 className={`text-2xl md:text-3xl font-bold text-center mb-3 ${titleColor} flex items-center justify-center`}>
        {Icon && <Icon className="w-8 h-8 mr-3" />} {title}
      </h3>
      <p className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-3xl mx-auto">
        {description}
      </p>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        {steps.map((step, index) => (
          <div key={index} className={`md:flex items-stretch ${index < steps.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div 
              className={`w-full md:w-1/4 p-4 flex items-center justify-center text-center font-semibold text-lg md:text-xl ${step.color} ${step.textColor || 'text-white'}`}
            >
              {step.name}
            </div>
            <div className="w-full md:w-3/4 p-4 bg-slate-50 flex items-center">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const elementaryReviewData: ReviewCycleSectionProps = {
  title: "초등부 4단계 복습과정",
  description: "초등부는 탄탄한 어학 기본기를 쌓으며, 다양한 활동으로 창의적인 학습 역량을 마스터하는 과정입니다. 다양한 방법으로 복습하여 지루함을 예방하고, 자연스럽게 복습합니다.",
  icon: Zap,
  titleColor: "text-sky-600",
  sectionBgColor: "bg-sky-50",
  steps: [
    { name: "단어", description: "수업과 연계된 자체제작 단어장으로 선노출 진행", color: "bg-yellow-300", textColor: "text-yellow-800" },
    { name: "수업", description: "선행된 단어 기반으로, 지문을 읽으며 직독직해", color: "bg-lime-300", textColor: "text-lime-800" },
    { name: "심화 활동", description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득", color: "bg-orange-400", textColor: "text-orange-800" },
    { name: "온라인 학습/미션", description: "온라인으로 어휘를 한번 더 복습하고, 가정에서 Speaking Writing 미션 복습", color: "bg-red-400", textColor: "text-red-800" },
  ],
};
const middleSchoolReviewData: ReviewCycleSectionProps = {
  title: "중등부 3단계 복습과정",
  description: "중등부는 시험에 강한 학습역량을 형성하여, 중등 수행/내신/수능을 조기마스터 하는 과정입니다. 기준점에 미달한 학생들은 전문학습 코칭과 관리로 완성도를 높입니다.",
  icon: Award,
  titleColor: "text-indigo-600",
  sectionBgColor: "bg-indigo-50",
  steps: [
    { name: "단어", description: "수업과 연계된 자체제작 단어장으로 선노출 진행", color: "bg-green-300", textColor: "text-green-800" },
    { name: "수업", description: "선행된 단어 기반으로, 지문을 읽으며 직독직해", color: "bg-emerald-300", textColor: "text-emerald-800" },
    { name: "심화 활동", description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득", color: "bg-teal-400", textColor: "text-teal-800" },
  ],
};

// StudyBookSection 및 관련 정의
const StudyBookSectionTitle: React.FC<{ icon?: React.ElementType; title: string; className?: string }> = ({ icon: Icon, title, className }) => (
  <div className={`flex items-center mb-4 ${className || ''}`}>
    {Icon && <Icon className="w-6 h-6 text-blue-600 mr-3" />}
    <h3 className="text-xl md:text-2xl font-semibold text-blue-700">{title}</h3>
  </div>
);
const StudyBookListItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <li className={`flex items-start text-gray-700 mb-2 ${className || ''}`}>
    <CheckSquare className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
    <span>{children}</span>
  </li>
);
const StudyBookSection = () => {
  const sampleImages = [
    { src: "/images/studybook_mission_checklist_sample.jpg", alt: "스터디북 샘플 - 미션 및 과제 관리표" }, 
    { src: "/images/studybook_sample_nouns_notes.jpg", alt: "스터디북 샘플 - 명사 수업 필기" }, 
    { src: "/images/studybook_sample_adj_adv_notes.jpg", alt: "스터디북 샘플 - 형용사 및 부사 수업 필기" }, 
    { src: "/images/studybook_cover_yellow_parkminji.jpg", alt: "데뷰어학원 스터디북 표지 예시 (박민지 학생)" },
  ];
  const naverBlogUrl = "https://blog.naver.com/ourdebut";
  return (
    <section id="study-book" className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <BookMarked className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            스터디북
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-600 mb-4">
            학습을 &apos;기록&apos;하고, 실력을 &apos;형상화&apos;하는 공간
          </p>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            스터디북은 단순한 노트가 아닙니다. 학생 개개인의 학습 여정을 따라가며, 그날의 미션과 과제를 기록하고, 수업 후 쓰기를 강화하여 <strong>포트폴리오화</strong>하는 핵심 도구입니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <StudyBookSectionTitle icon={Target} title="활용 목적" />
            <ul className="space-y-2">
              <StudyBookListItem>학습 태도 및 과제 수행 확인 (날짜별 기록)</StudyBookListItem>
              <StudyBookListItem>손글씨 작성을 통한 쓰기 훈련 {'->'} 내신 대비</StudyBookListItem>
              <StudyBookListItem>학습 결과물을 축적하여 포트폴리오화</StudyBookListItem>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <StudyBookSectionTitle icon={MessageSquare} title="관리 방식" />
            <ul className="space-y-2">
              <StudyBookListItem>학습 내용 및 과제를 날짜별로 기록</StudyBookListItem>
              <StudyBookListItem>수업 후 Writing 과제 직접 작성</StudyBookListItem>
              <StudyBookListItem>스터디 매니저가 주기적으로 확인 및 피드백</StudyBookListItem>
              <StudyBookListItem>학기 말/내신기 주요 포트폴리오로 활용</StudyBookListItem>
            </ul>
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <StudyBookSectionTitle icon={Users} title="대상별 활용" className="justify-center md:justify-start"/>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-sky-700 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" /> 초등부
                </h4>
                <ul className="space-y-1 pl-1">
                  <StudyBookListItem className="text-sm">과제 및 미션을 날짜별로 기록</StudyBookListItem>
                  <StudyBookListItem className="text-sm">주요 어휘 및 문장 직접 쓰기</StudyBookListItem>
                  <StudyBookListItem className="text-sm">수업 후 연계 Writing 과제 작성</StudyBookListItem>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-lime-700 mb-2 flex items-center">
                  <Brain className="w-5 h-5 mr-2" /> 중등부
                </h4>
                <ul className="space-y-1 pl-1">
                  <StudyBookListItem className="text-sm">수능 유형 문제 풀이 + 오답 분석</StudyBookListItem>
                  <StudyBookListItem className="text-sm">문법 정리, 틀린 어휘 누적 기록</StudyBookListItem>
                  <StudyBookListItem className="text-sm">내신 대비 핵심 정리 및 오답 노트</StudyBookListItem>
                  <StudyBookListItem className="text-sm">자기주도 학습 루틴 구축</StudyBookListItem>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-amber-700 mb-2 flex items-center">
                  <FolderArchive className="w-5 h-5 mr-2" /> 특목고 대비반
                </h4>
                <ul className="space-y-1 pl-1">
                  <StudyBookListItem className="text-sm">TED 강연 요약 및 의견 정리</StudyBookListItem>
                  <StudyBookListItem className="text-sm">NIE(신문활용교육) 내용 포트폴리오화</StudyBookListItem>
                  <StudyBookListItem className="text-sm">이슈 기반 Writing 훈련</StudyBookListItem>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <StudyBookSectionTitle icon={Briefcase} title="상담 및 진로 연계" />
            <ul className="space-y-2">
              <StudyBookListItem>학부모 상담 시 실제 학습 증거로 활용</StudyBookListItem>
              <StudyBookListItem>Writing 포트폴리오 = 특목고 자기소개서/면접 준비 기반</StudyBookListItem>
            </ul>
          </div>
        </div>
        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <StudyBookSectionTitle icon={Edit3} title="스터디북 샘플 보기" className="justify-center"/>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            학생들이 실제로 학습 내용을 기록하고 관리하는 스터디북의 예시입니다. 체계적인 기록을 통해 학습 과정을 한눈에 볼 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sampleImages.map((image, index) => (
              <div key={index} className="bg-white p-2 md:p-3 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 aspect-[3/4]">
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={600} 
                  height={800} 
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
           <p className="text-center text-xs text-gray-500 mt-6">
            샘플 이미지는 실제 스터디북 활용 모습을 보여주기 위한 예시입니다. 학생의 학습 수준과 과정에 따라 내용과 형식은 다를 수 있습니다.
          </p>
          <div className="mt-12 text-center">
            <a 
              href={naverBlogUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              다양한 스터디북 사례 보러 가기
            </a>
            <p className="mt-4 text-sm text-gray-600">
              데뷰 학생들의 생생한 스터디북 활용기를 네이버 블로그에서 만나보세요!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

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

        {/* 초등 인텐시브 클래스 주요 특징 섹션 */}
        <div className="mt-10 pt-8 border-t border-gray-200 mb-12 md:mb-16">
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

        {/* ReviewCycleDisplay 내용 삽입 */}
        <div className="py-8 md:py-12 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <ReviewCycleSection {...elementaryReviewData} />
            <ReviewCycleSection {...middleSchoolReviewData} />
          </div>
        </div>

        {/* StudyBookSection 내용 삽입 */}
        <StudyBookSection />

        <section className="text-center mt-12 md:mt-16 mb-12 md:mb-16">
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

      </main>
    </>
  );
} 