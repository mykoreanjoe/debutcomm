"use client";

import React from 'react';
import Image from 'next/image';
import { BookOpen, Target, GraduationCap, TrendingUp, Users, MessageCircle, Award } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';

const learningDifficulties = [
  { icon: Target, title: "학습 방법의 부재", description: "부적절한 교재 선정, 잘못된 학습 방법, 영역별 교수법 부재로 인한 혼란" },
  { icon: TrendingUp, title: "동기 부여의 어려움", description: "흥미를 고려하지 않은 무작정한 반복 학습과 명확한 목표 설정 부재" },
  { icon: GraduationCap, title: "성과 확인의 불확실성", description: "단기간에 결과를 보기 어렵고, 평가의 정확성과 신뢰성 확보의 어려움" },
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

const debutValues = [
  { icon: MessageCircle, title: "소통", description: "학부모, 학생, 동료와 명확하고 따뜻하게 소통하며 신뢰를 쌓습니다." },
  { icon: Users, title: "협력", description: "함께 목표를 이루기 위해 서로 협력하고, 공동의 성취를 추구합니다." },
  { icon: TrendingUp, title: "성장", description: "지속적인 자기계발과 도전을 통해 개인과 조직이 함께 성장합니다." },
];

export default function StoryPageClient() {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <AnimatedSection>
            <SectionTitle
                icon={BookOpen}
                title="원장 메시지"
                subtitle="쉽지 않은 영어 완성의 여정, 데뷰가 '같이'의 가치로 함께합니다."
                iconColor="text-indigo-600"
            />
        </AnimatedSection>
        
        <AnimatedSection>
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-100 mb-16 md:mb-20">
                                  <p className="text-gray-700 leading-relaxed md:text-lg text-center max-w-3xl mx-auto">
                    지난 15년간 5,000명 이상의 학생들을 만나며 깨달은 것이 있습니다. 모두가 같은 목표를 향하지만, 그 과정은 모두 다르다는 것입니다. 하지만 &apos;함께&apos;라면 어떤 어려움 속에서도 자신의 잠재력을 최대한 발휘할 수 있습니다. 학생들의 마음이 흔들릴 때마다, 데뷰의 모든 선생님과 스터디 매니저는 &apos;같이 완성&apos;이라는 약속을 지키기 위해 노력합니다.
                </p>
            </div>
        </AnimatedSection>

        {/* --- Director's Profile Section --- */}
        <AnimatedSection>
          <section className="mb-16 md:mb-20">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="lg:w-1/3 text-center flex-shrink-0">
                <div className="relative w-52 h-52 mx-auto shadow-lg rounded-full overflow-hidden ring-4 ring-indigo-100">
                  <Image src="/images/joseph_choi.jpg" alt="Joseph Choi 원장 프로필 사진" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mt-6 text-gray-800">Joseph Choi</h3>
                <p className="text-indigo-600 font-semibold">데뷰 영어 원장</p>
              </div>

              <div className="lg:w-2/3">
                <blockquote className="text-center lg:text-left mb-8 border-l-4 border-indigo-500 pl-6">
                  <p className="text-4xl font-bold text-gray-800 tracking-tight">&quot;같이 완성&quot;</p>
                  <p className="text-lg text-gray-500 mt-1">In Unitate Perfectio</p>
                </blockquote>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><Award className="w-4 h-4 mr-2 text-indigo-500" /> 경력</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                      {directorExperience.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-indigo-500" /> 학력</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                      {directorEducation.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-indigo-500" /> 주요 이력</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2">
                      {directorCareerHighlights.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* --- Philosophy Section --- */}
        <AnimatedSection>
            <section className="mb-16 md:mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">데뷰의 교육 철학</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">데뷰는 학생들이 겪는 영어 학습의 본질적인 어려움을 이해하고, 이를 해결하기 위해 존재합니다.</p>
                <div className="grid md:grid-cols-3 gap-6">
                {learningDifficulties.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
                        <item.icon className="w-12 h-12 text-indigo-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{item.description}</p>
                    </div>
                ))}
                </div>
            </section>
        </AnimatedSection>
        
        {/* --- Culture Section --- */}
        <AnimatedSection>
            <section>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">데뷰가 추구하는 가치</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">&apos;같이 완성&apos;이라는 핵심 가치 아래, 데뷰는 다음과 같은 인재상을 추구하며 함께 성장합니다.</p>
                <div className="grid md:grid-cols-3 gap-6">
                {debutValues.map((value, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center">
                    <value.icon className="w-12 h-12 text-indigo-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                ))}
                </div>
            </section>
        </AnimatedSection>
        
      </div>
    </div>
  );
} 