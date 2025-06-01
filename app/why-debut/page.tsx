import React from 'react';
import Link from 'next/link';
import { Lightbulb, Zap, Rocket, Target, ExternalLink, UserCheck, BookHeart, Edit3, Briefcase, FolderArchive, Brain, Sparkles, Users2, FileText, BookOpen, CheckSquare } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import AnimatedSection from '@/components/AnimatedSection';

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
            <li><strong>Lecture & Activity:</strong> 적극적인 참여 중심 수업 진행</li>
            <li><strong>미션 시스템:</strong> 수업 연계 도전 과제를 통한 자기주도성 강화</li>
            <li><strong>스터디북:</strong> 내가 무엇을 배우고 있는지 스스로 기록하는 훈련</li>
          </ul>
        </div>
        <div className="mt-2 pt-2 border-t border-amber-300">
          <p className="text-xs font-semibold mb-1">“같이 완성”의 핵심인 몰입을 위한 과정별 상세 내용은 아래 링크를 참고해주세요.</p>
          <ul className="space-y-1 pl-2 mt-2">
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
          <li><strong>포인트/카드 적립:</strong> 미션 수행 및 학습 활동을 통해 데뷰 포인트 및 미션 카드 적립</li>
        </ul>
        <div className="mt-2 pt-2 border-t border-rose-300">
          <h4 className="font-semibold text-sm mb-1">✅ 학습 결과물:</h4>
          <div className="space-y-1">
            <p><strong>스피킹 영상:</strong> 주간 영상 파일 + 반별 공유 (말하기 자신감 및 콘텐츠화)</p>
            <p><strong>쓰기 복습본:</strong> 스터디북에 누적된 문장 기록 (쓰기 실력 내재화)</p>
            <p><strong>월간 리포트:</strong> 개인별 성취도 분석 + 향후 제안 (학부모 연계)</p>
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
          <li><strong>데뷰 미션:</strong> 배운 내용을 자기 언어로 표현하는 심화 과제 수행</li>
          <li><strong>리워드 실행:</strong> 적립된 포인트/카드를 사용하여 실제 보상 교환 및 성취 목표 달성</li>
          <li><strong>학습 공유 플랫폼:</strong> 네이버 밴드를 통해 Speaking, Writing 등 학습 결과물 공유 및 피드백</li>
        </ul>
        <div className="mt-2 pt-2 border-t border-emerald-300">
          <h4 className="font-semibold text-sm mb-1">✅ 주요 활동 결과물:</h4>
          <ul className="space-y-1">
            <li><strong>학습 과정 공유:</strong> 일일 학습 결과, 원아워 AI 리포트 등을 네이버 밴드에 공유</li>
            <li><strong>스터디북 점검:</strong> 스터디북 작성 내용 확인 및 피드백, 리워드 연계</li>
            <li><strong>월말 시상:</strong> 아카데믹/보카/스피킹 등 분야별 우수자 선정 및 시상</li>
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
            <li><strong>완성수업:</strong> 학습 내용 최종 정리 및 학생 성취도 기반 추가 학습 지도</li>
            <li><strong>월말고사:</strong> 정기적인 종합 평가를 통한 실력 점검</li>
            <li><strong>성취도 평가:</strong> 영역별 학습 목표 달성도 심층 분석 및 피드백</li>
          </ul>
        </div>
        <div className="mt-2 pt-2 border-t border-indigo-300">
          <h4 className="font-semibold text-sm mb-1">세부 운영:</h4>
           <ul className="space-y-1">
            <li>학생 집중력/이해도/학습속도 고려</li>
            <li>수업 전후 루틴 조정 및 시간대 최적화</li>
            <li>월간 상담 및 학습루틴 재설계</li>
          </ul>
        </div>
      </div>
    ),
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
];

interface ReviewStepProps {
  name: string;
  description: string;
  color: string;
  textColor?: string;
}

interface ReviewCycleSubSectionProps {
  title: string;
  icon: React.ElementType;
  steps: ReviewStepProps[];
  titleColor?: string;
  sectionBgColor?: string;
  description: string;
}

interface ReviewSystemProps {
  mainTitle: string;
  mainIcon: React.ElementType;
  mainDescription: string;
  subSections: ReviewCycleSubSectionProps[];
}

const reviewSystemData: ReviewSystemProps = {
  mainTitle: "데뷰 복습 시스템",
  mainIcon: Sparkles,
  mainDescription: "초등부부터 중등부까지 이어지는 데뷰만의 체계적인 복습 시스템으로 학습 효과를 극대화합니다. 각 단계별 맞춤 복습 전략을 확인해보세요.",
  subSections: [
    {
      title: "초등부 4단계 복습과정",
      icon: Zap,
      titleColor: "text-sky-600",
      sectionBgColor: "bg-sky-50",
      description: "초등부는 탄탄한 어학 기본기를 쌓으며, 다양한 활동으로 창의적인 학습 역량을 마스터하는 과정입니다. 다양한 복습 방법을 통해 지루함을 덜고, 자연스러운 학습 효과를 유도합니다.",
      steps: [
        { name: "단어", description: "수업과 연계된 자체제작 단어장으로 선노출 진행", color: "#FBBF24", textColor: "#78350F" },
        { name: "수업", description: "선행된 단어 기반으로, 지문을 읽으며 직독직해", color: "#A3E635", textColor: "#3F6212" },
        { name: "미션&과제", description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득", color: "#FB923C", textColor: "#FFFFFF" },
        { name: "온라인 학습/미션", description: "온라인으로 어휘를 한번 더 복습하고, 가정에서 Speaking Writing 미션 복습", color: "#F87171", textColor: "#FFFFFF" },
      ],
    },
    {
      title: "중등부 3단계 복습과정",
      icon: Users2,
      titleColor: "text-purple-600",
      sectionBgColor: "bg-purple-50",
      description: "중등부는 시험에 강한 학습역량을 형성하여, 중등 수행평가, 내신, 더 나아가 수능까지 대비할 수 있는 실력을 완성합니다. 기존점에 미달한 학생들은 전문학습 코칭과 관리로 완성도를 높입니다.",
      steps: [
        { name: "단어", description: "수업과 연계된 자체제작 단어장으로 선노출 진행", color: "#6EE7B7", textColor: "#047857" },
        { name: "수업", description: "선행된 단어 기반으로, 지문을 읽으며 직독직해", color: "#5EEAD4", textColor: "#0F766E" },
        { name: "미션&과제", description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득", color: "#22D3EE", textColor: "#164E63" },
      ],
    }
  ]
};

const ReviewCycleSectionDisplay: React.FC<ReviewCycleSubSectionProps> = ({
  title,
  description,
  steps,
  icon: IconComponent,
  titleColor = 'text-blue-700',
  sectionBgColor = 'bg-white',
}) => {
  return (
    <div className={`mb-10 p-6 md:p-8 rounded-lg shadow-xl ${sectionBgColor}`}>
      <h4 className={`text-xl md:text-2xl font-bold text-center mb-3 ${titleColor} flex items-center justify-center`}>
        {IconComponent && <IconComponent className="w-7 h-7 mr-2.5" />} {title}
      </h4>
      <p className="text-center text-gray-600 mb-8 text-sm md:text-base max-w-2xl mx-auto">
        {description}
      </p>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        {steps.map((step, index) => (
          <div key={index} className={`md:flex items-stretch ${index < steps.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div 
              style={{ backgroundColor: step.color, color: step.textColor || 'white' }}
              className={`w-full md:w-1/4 p-3 flex items-center justify-center text-center font-semibold text-base md:text-lg`}
            >
              {step.name}
            </div>
            <div className="w-full md:w-3/4 p-3 bg-slate-100 flex items-center">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface StudyBookSectionTitleProps {
  icon?: React.ElementType;
  title: string;
  className?: string;
}

const StudyBookSectionTitle: React.FC<StudyBookSectionTitleProps> = ({ icon: IconComponent, title, className }) => (
  <h4 className={`text-xl font-semibold text-gray-700 mb-3 flex items-center ${className}`}>
    {IconComponent && <IconComponent className="w-6 h-6 mr-2 text-blue-600" />} {title}
  </h4>
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
    <AnimatedSection delay={0}>
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <BookHeart className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700">
              나만의 학습 로드맵, 스터디북
            </h2>
            <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">
              스터디북은 스스로 학습을 설계하고 완성하는 메타인지 도구로, 자기주도 학습 능력을 키웁니다.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-green-200 mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              스터디북은 학생 스스로 학습을 계획하고, 배운 내용을 자신의 언어로 <strong className="text-green-600 font-semibold">기록(Record)</strong>하며, 
              이를 바탕으로 과제를 수행하고 꾸준히 <strong className="text-green-600 font-semibold">복습(Practice)</strong>하여 지식을 내재화합니다. 
              또한, 학습 과정을 주기적으로 <strong className="text-green-600 font-semibold">성찰하고 피드백(Reflect & Feedback)</strong>을 통해 학습 전략을 개선하며 메타인지 능력을 향상시킵니다. 
              이러한 과정을 통해 개인별 맞춤 학습, 자기 주도 학습 습관 형성, 학습 성과 시각화 등 다양한 효과를 얻을 수 있습니다.
            </p>
          </div>

          <div className="pt-12 border-t border-gray-200">
            <StudyBookSectionTitle icon={Edit3} title="스터디북 샘플 보기" className="justify-center text-green-700 !text-2xl md:!text-3xl" />
            <p className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-xl mx-auto">
              학생들의 실제 스터디북 예시입니다. 체계적인 기록으로 학습 과정을 한눈에 살펴보세요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
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
            <p className="text-center text-xs text-gray-500 mt-6 mb-10">
              샘플 이미지는 실제 스터디북 활용 모습 예시이며, 학생의 학습 수준과 과정에 따라 다를 수 있습니다.
            </p>
            <div className="text-center">
              <Link href={naverBlogUrl} legacyBehavior>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:-translate-y-0.5 btn-apple-style"
                >
                  <ExternalLink className="w-5 h-5 mr-2.5" />
                  더 많은 스터디북 사례 보러가기
                </a>
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                데뷰 학생들의 생생한 스터디북 활용기를 네이버 블로그에서 확인하세요!
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

const debutEducationalServices = [
  {
    title: "1인 담임 관리",
    description: "학생 맞춤형 학습 계획 수립부터 성적 관리, 정서적 지원까지 전담 담임 선생님이 밀착 관리합니다.",
    icon: UserCheck,
  },
  {
    title: "스터디북",
    description: "자기주도 학습 능력 향상을 위한 개인별 학습 기록 및 관리 시스템입니다. 메타인지 학습을 돕습니다.",
    icon: BookHeart,
  },
  {
    title: "월말고사",
    description: "매월 학습 성과를 점검하고, 다음 학습 목표 설정의 기초 자료로 활용되는 정기 평가입니다.",
    icon: FileText,
  },
  {
    title: "성취도 평가",
    description: "단원별, 영역별 학습 이해도를 정밀하게 진단하고, 취약점 보완을 위한 피드백을 제공합니다.",
    icon: CheckSquare,
  },
  {
    title: "온라인 학습 AI",
    description: "AI 기반 맞춤형 학습 콘텐츠와 피드백을 통해 시간과 장소에 구애받지 않는 학습 환경을 제공합니다.",
    icon: Brain,
  },
  {
    title: "스터디 매니저",
    description: "학생들의 학습 습관 형성, 과제 관리, 학습 동기 부여 등 학습 전반을 지원하는 전문 관리자입니다.",
    icon: Users2,
  },
  {
    title: "개별 포트폴리오",
    description: "학생의 학습 과정과 성과를 체계적으로 기록하고 시각화하여, 성장 과정을 한눈에 파악할 수 있도록 합니다.",
    icon: FolderArchive,
  },
];

const MissionSystemSection = () => {
  return (
    <AnimatedSection delay={0.1}>
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Briefcase className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-4" /> 
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700">
              데뷰 교육 서비스
            </h2>
            <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">
              데뷰는 학생 중심의 체계적인 교육 서비스를 통해 잠재력을 최대한 발휘하고 학습 목표를 달성할 수 있도록 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {debutEducationalServices.map((service, index) => (
              <div key={index} className="bg-sky-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-sky-200 flex flex-col text-center items-center">
                <div className="mb-4">
                  {service.icon && <service.icon className="w-10 h-10 md:w-12 md:h-12 text-sky-500 mx-auto mb-3" />}
                  <h3 className="text-lg md:text-xl font-semibold text-sky-700">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default function LearningProcessPage() {
  return (
    <>
      <Head>
        <title>데뷰 5단계 학습 과정 | 데뷰 영어 학원</title>
        <meta name="description" content="데뷰만의 체계적인 5단계 학습 과정을 통해 영어 실력 향상을 경험하세요. 발견, 참여, 신장, 펼침, 훈련의 각 단계를 알아보고 학습 목표를 설정하세요." />
        <meta property="og:title" content="데뷰 5단계 학습 과정" />
        <meta property="og:description" content="데뷰만의 체계적인 5단계 학습 과정을 통해 영어 실력 향상을 경험하세요." />
        {/* <meta property="og:image" content="/images/og-why-debut.png" /> */}
      </Head>
      <main className="flex flex-col min-h-screen bg-gray-50">
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedSection delay={0}>
              <Brain className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                데뷰 <span className="bg-yellow-400 text-indigo-800 px-2 rounded-md">5단계</span> 학습 과정
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto">
                단순한 지식 전달을 넘어, 학생 스스로 성장하는 힘을 기르는 데뷰만의 입체적 학습 로드맵입니다.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
              {learningStages.map((stage, index) => (
                <AnimatedSection delay={index * 0.05} key={stage.id}>
                  <div className={`p-4 rounded-xl shadow-2xl flex flex-col h-full ${stage.bgColor} border border-gray-200 hover:shadow-blue-200/50 transition-all duration-300`}>
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        <stage.icon className={`w-8 h-8 md:w-10 md:h-10 mr-3 ${stage.textColor}`} />
                        <h2 className={`text-2xl md:text-3xl font-bold ${stage.textColor}`}>{stage.name}</h2>
                      </div>
                      <h3 className={`text-sm font-semibold mb-1 ${stage.textColor}`}>{stage.mainTitle}</h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed min-h-[3.5rem]">{stage.subtitle}</p>
                    </div>
                    <div className="text-xs text-gray-500 border-t border-gray-300 pt-2 mt-auto">
                      {stage.details}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <AnimatedSection delay={0}>
          <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-slate-100 to-purple-100">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12 md:mb-16">
                {reviewSystemData.mainIcon && <reviewSystemData.mainIcon className="w-12 h-12 md:w-16 md:h-16 text-purple-600 mx-auto mb-4" />}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-700">
                  {reviewSystemData.mainTitle}
                </h2>
                <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  {reviewSystemData.mainDescription}
                </p>
              </div>
              {
                reviewSystemData.subSections.map((subSection, index) => (
                  <ReviewCycleSectionDisplay key={index} {...subSection} />
                ))
              }
            </div>
          </section>
        </AnimatedSection>

        <StudyBookSection />
        <MissionSystemSection />
        
      </main>
    </>
  );
} 