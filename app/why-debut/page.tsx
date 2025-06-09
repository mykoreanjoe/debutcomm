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
  mainDescription: "데뷰만의 체계적인 4단계 복습 시스템으로 학습 효과를 극대화합니다. 각 단계별 맞춤 복습 전략을 확인해보세요.",
  subSections: [
    {
      title: "데뷰 4단계 복습과정",
      icon: BookHeart,
      titleColor: "text-emerald-600",
      sectionBgColor: "bg-emerald-50",
      description: "데뷰의 모든 학생들은 다음 4단계 복습 과정을 통해 학습 내용을 완벽하게 자기 것으로 만듭니다. 이 과정을 통해 어휘력 향상, 수업 내용 이해도 증진, 자기주도 학습 능력 배양, 그리고 꾸준한 온라인 학습 습관 형성을 목표로 합니다.",
      steps: [
        { name: "단어", description: "수업과 연계된 단어 학습 및 암기를 통해 어휘 기반을 다집니다. 자체 단어장 및 다양한 어휘 활동을 활용합니다.", color: "#34D399", textColor: "#065F46" },
        { name: "수업", description: "핵심 개념 이해와 적용에 중점을 둔 수업에 참여하여, 배운 내용을 명확히 이해합니다. 적극적인 질의응답과 토론을 장려합니다.", color: "#6EE7B7", textColor: "#047857" },
        { name: "미션&과제", description: "수업 내용을 바탕으로 한 다양한 미션과 과제를 수행하며 학습한 내용을 능동적으로 적용하고 심화합니다.", color: "#A7F3D0", textColor: "#064E3B" },
        { name: "온라인 학습", description: "온라인 학습 플랫폼을 통해 언제 어디서든 학습 내용을 복습하고, 추가적인 학습 자료 및 AI 기반 피드백을 제공받습니다.", color: "#D1FAE5", textColor: "#065F46" },
      ],
    },
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
    <AnimatedSection className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
            <BookHeart className="w-10 h-10 mr-3 text-amber-500" /> 데뷰 스터디북
          </h3>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            단순 필기 노트가 아닌, 자기주도 학습 습관을 형성하는 메타인지 도구입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
          <div>
            <StudyBookSectionTitle icon={Edit3} title="스터디북 주요 기능" />
            <ul className="space-y-3 text-gray-700 text-sm md:text-base list-disc list-inside pl-2">
              <li><strong>개인 맞춤형 학습 계획:</strong> 학생 스스로 학습 목표와 계획을 세우고 점검합니다.</li>
              <li><strong>수업 내용 정리:</strong> 배운 내용을 자신의 언어로 재구성하며 이해도를 높입니다.</li>
              <li><strong>과제 및 복습 관리:</strong> 체계적인 복습과 과제 수행을 통해 학습 내용을 완전히 자기 것으로 만듭니다.</li>
              <li><strong>성장 과정 기록:</strong> 학습 여정을 기록하며 성취감을 느끼고 학습 동기를 부여받습니다.</li>
              <li><strong>학습 성찰:</strong> 학습 과정에서의 어려움과 해결 과정을 기록하며 메타인지 능력을 향상시킵니다.</li>
            </ul>
          </div>
        </div>

        <div className="mb-10 md:mb-12">
          <StudyBookSectionTitle icon={FolderArchive} title="스터디북 샘플 이미지" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleImages.map((image, index) => (
              <div key={index} className="relative w-full h-40 md:h-56 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" className="transform group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-xs p-2">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-center text-gray-600 mb-6">
            더 많은 스터디북 활용 예시와 데뷰의 교육 철학은 공식 블로그에서 확인하실 수 있습니다.
          </p>
          <Link 
            href={naverBlogUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            데뷰 공식 블로그 바로가기
          </Link>
        </div>

      </div>
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
    description: "토셀, 토플, 수능형 시험으로 학생의 성취도를 평가 하고 피드백을 드립니다.",
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
                학습 과정이 완성의 과정이 되도록! D.E.B.U.T 학습 과정을 소개 합니다.
                <br />
                <span className="text-indigo-200">단순한 지식 전달을 넘어, 학생 스스로 성장하는 힘을 기르는 데뷰만의 입체적 학습 로드맵입니다.</span>
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