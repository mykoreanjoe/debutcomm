import React from 'react';
import Image from 'next/image';
import { MessagesSquare, ClipboardCheck, Award } from 'lucide-react';

const learningDifficulties = [
  { 
    title: '학습 방법 혼란', 
    tags: ['#교재', '#방법', '#영역별 초점'] 
  },
  { 
    title: '동기 부여 문제', 
    tags: ['#흥미', '#반복', '#목표 설정 밸런스'] 
  },
  { 
    title: '학습 성과 가시성의 부족', 
    tags: ['#단시간 결과 불가능', '#평가 정확성', '#평가 신뢰성'] 
  },
  { 
    title: '적절한 환경 조성의 어려움', 
    tags: ['#인풋 노출', '#부모 영어 실력'] 
  },
  { 
    title: '학습 지속성과 장기 목표 설정의 어려움', 
    tags: ['#사춘기', '#단기', '#장기 로드맵'] 
  },
];

const academyPhilosophyPoints = [
  '세심하게 설계된 단계별 커리큘럼과 피드백 시스템의 정교함',
  '아이의 감정, 성향, 학습 리듬까지 배려하는 따뜻함',
  '결과보다 과정을 중시하는 신뢰할 수 있는 운영',
  '\'함께 완성해간다\'는 공동체적 철학',
];

const directorExperience = [
  "(전) 프라미스어학원 원장, 강서 캠퍼스",
  "(전) 프라미스어학원 신정&목동 최상위반 담당",
  "(현) 현재 어학원 서초 본원 토플, 텝스, 수능 최상위반 한인/원어팀장",
  "(전) 파고다 어학원 강남, Writing 수업",
  "(전) 2ID KATUSA 민사관 통역병 제대",
];

const directorEducation = [
  "Harding University, M. Div. (Memphis, TN)",
  "Ohio Valley University, B.A. Summa Cum Laude (최우수 졸업)",
];

const directorCareerHighlights = [
  "TEST 인원 누적 5000명 이상",
  "ETS Criterion Writing Certified",
  "진로진학 전문가 2급",
  "훈장마을 Paragraph Writing 강사 교육",
  "청심국제중 입시 합격 및 교육 대비 2명",
  "명덕외고, 이화외고 입시 프렙 합격 및 대비 다수",
];

const debutTalents = [
  {
    icon: MessagesSquare,
    title: "Communication",
    description: "학부모, 학생, 동료와 명확하고 따뜻하게 소통하며 관계를 신뢰로 이끈다",
  },
  {
    icon: ClipboardCheck,
    title: "Readiness",
    description: "수업/과제/운영 이슈에 대한 선제적 계획과 대응을 통해 매끄러운 학습 경험을 만든다",
  },
  {
    icon: Award,
    title: "Ownership",
    description: "자기 수업/업무에 주인의식을 갖고 피드백을 성장의 도구로 삼는다",
  },
];

const logoMeanings = [
  {
    element: "동그라미",
    meaning: "완전함과 만남을 의미합니다."
  },
  {
    element: "IN UNITATE PERFECTIO",
    meaning: "\'같이 완성\'의 라틴 어원으로, 함께 함으로써 완벽함, 또는 완전한 성취에 도달함을 의미합니다."
  },
  {
    element: "중간 D B 로고",
    meaning: "Debut English의 \'D\'와 학생(Beloved Student) 또는 함께하는 우리(Buddy)의 \'B\'의 결합으로, 데뷰 영어와 학생의 만남, 그리고 함께 성장함을 상징합니다."
  }
];

export default function StoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section id="director-message" className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#13588f]">
          원장 메시지
        </h1>
        <div className="bg-slate-50 p-6 md:p-8 rounded-lg shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            쉽지 않은 영어 완성도의 여정을 같이 합니다.
          </p>
          <p className="text-gray-600 leading-loose mb-6">
            지난 15년간 중대형 원장을 경험하며, 5000명 이상의 학생을 보았습니다. 원하는 지점은 모두 같았지만, 모든 학생들이 목표에 도달 하지는 못했습니다. 하지만, 같이 노력한다면 자신이 도달할수 있는 최대한을 끌어 낼수 있다고 믿습니다. 학생들의 마음이 흔들릴 때 마다, 데뷰 선생님들과 스터디 매니저는 같이 완성하려고 노력 합니다.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold text-[#13588f] mt-8 mb-4">
            🤝 데뷰는 영어 학습 고충을 알고 있습니다.
          </h2>
          <ul className="space-y-4 mb-8">
            {learningDifficulties.map((item, index) => (
              <li key={index} className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-700">{index + 1}. {item.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#7fa6c3] text-white px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            {academyPhilosophyPoints.map((point, index) => (
              <p key={index} className="text-gray-600 flex items-start">
                <span className="text-[#13588f] mr-2">✔</span> 
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="director-greeting" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#13588f]">
          원장인사 및 운영철학
        </h2>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="md:w-1/3 text-center flex-shrink-0">
            <div className="relative w-60 h-80 md:w-72 md:h-96 mx-auto shadow-lg rounded-lg overflow-hidden">
              <Image 
                src="/joseph_choi.png"
                alt="Joseph Choi 원장"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-bold mt-6 text-gray-800">JOSEPH CHOI</h3>
            <p className="text-md text-[#13588f] font-semibold">데뷰 영어 학원 원장</p>
          </div>

          <div className="md:w-2/3">
            <blockquote className="text-center md:text-left mb-8">
              <p className="text-3xl md:text-4xl font-bold text-[#13588f]">&quot;YOU REAP WHAT YOU SOW!&quot;</p>
              <p className="text-xl md:text-2xl text-gray-600 mt-1">뿌린대로 거둡니다.</p>
            </blockquote>

            <div className="space-y-6 text-sm md:text-base">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">경력</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
                  {directorExperience.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">학력</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
                  {directorEducation.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">주요 경력</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
                  {directorCareerHighlights.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="academy-culture" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#13588f]">
          학원 문화
        </h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          <span className="font-semibold text-[#13588f]">같이 완성</span>이라는 중점 가치 아래, 데뷰는 다음과 같은 인재상을 추구합니다.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {debutTalents.map((talent, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <talent.icon className="w-16 h-16 text-[#13588f] mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{talent.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{talent.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="academy-logo-intro" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#13588f]">
          학원 마크 소개
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-slate-50 p-6 md:p-10 rounded-lg shadow-sm">
          <div className="w-48 h-48 md:w-60 md:h-60 relative flex-shrink-0">
            <Image 
              src="/debut_language_school_logo.png"
              alt="데뷰 영어 학원 마크"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="md:max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">로고의 의미</h3>
            <ul className="space-y-3">
              {logoMeanings.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-xl text-[#13588f] mr-3 font-semibold">•</span>
                  <div>
                    <h4 className="font-medium text-gray-700">{item.element}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.meaning}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 