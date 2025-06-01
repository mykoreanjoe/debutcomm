'use client';

import React from 'react';
import { BookMarked, Target, Users, Edit3, MessageSquare, Briefcase, Lightbulb, FolderArchive, CheckSquare, Brain, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const SectionTitle: React.FC<{ icon?: React.ElementType; title: string; className?: string }> = ({ icon: Icon, title, className }) => (
  <div className={`flex items-center mb-4 ${className || ''}`}>
    {Icon && <Icon className="w-6 h-6 text-blue-600 mr-3" />}
    <h3 className="text-xl md:text-2xl font-semibold text-blue-700">{title}</h3>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <li className={`flex items-start text-gray-700 mb-2 ${className || ''}`}>
    <CheckSquare className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const StudyBook = () => {
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
            4.6 스터디북
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
            <SectionTitle icon={Target} title="활용 목적" />
            <ul className="space-y-2">
              <ListItem>학습 태도 및 과제 수행 확인 (날짜별 기록)</ListItem>
              <ListItem>손글씨 작성을 통한 쓰기 훈련 {'->'} 내신 대비</ListItem>
              <ListItem>학습 결과물을 축적하여 포트폴리오화</ListItem>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <SectionTitle icon={MessageSquare} title="관리 방식" />
            <ul className="space-y-2">
              <ListItem>학습 내용 및 과제를 날짜별로 기록</ListItem>
              <ListItem>수업 후 Writing 과제 직접 작성</ListItem>
              <ListItem>스터디 매니저가 주기적으로 확인 및 피드백</ListItem>
              <ListItem>학기 말/내신기 주요 포트폴리오로 활용</ListItem>
            </ul>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <SectionTitle icon={Users} title="대상별 활용" className="justify-center md:justify-start"/>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-sky-700 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" /> 초등부
                </h4>
                <ul className="space-y-1 pl-1">
                  <ListItem className="text-sm">과제 및 미션을 날짜별로 기록</ListItem>
                  <ListItem className="text-sm">주요 어휘 및 문장 직접 쓰기</ListItem>
                  <ListItem className="text-sm">수업 후 연계 Writing 과제 작성</ListItem>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-lime-700 mb-2 flex items-center">
                  <Brain className="w-5 h-5 mr-2" /> 중등부
                </h4>
                <ul className="space-y-1 pl-1">
                  <ListItem className="text-sm">수능 유형 문제 풀이 + 오답 분석</ListItem>
                  <ListItem className="text-sm">문법 정리, 틀린 어휘 누적 기록</ListItem>
                  <ListItem className="text-sm">내신 대비 핵심 정리 및 오답 노트</ListItem>
                  <ListItem className="text-sm">자기주도 학습 루틴 구축</ListItem>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-amber-700 mb-2 flex items-center">
                  <FolderArchive className="w-5 h-5 mr-2" /> 특목고 대비반
                </h4>
                <ul className="space-y-1 pl-1">
                  <ListItem className="text-sm">TED 강연 요약 및 의견 정리</ListItem>
                  <ListItem className="text-sm">NIE(신문활용교육) 내용 포트폴리오화</ListItem>
                  <ListItem className="text-sm">이슈 기반 Writing 훈련</ListItem>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <SectionTitle icon={Briefcase} title="상담 및 진로 연계" />
            <ul className="space-y-2">
              <ListItem>학부모 상담 시 실제 학습 증거로 활용</ListItem>
              <ListItem>Writing 포트폴리오 = 특목고 자기소개서/면접 준비 기반</ListItem>
            </ul>
          </div>

        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
          <SectionTitle icon={Edit3} title="스터디북 샘플 보기" className="justify-center"/>
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

export default StudyBook; 