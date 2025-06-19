"use client";

import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { CalendarDays, Users, Gamepad2, Compass, Trophy, Mic2, BookOpen, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Reusable FeatureCard component (moved from details section)
const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string; iconColor?: string }> = 
  ({ icon: Icon, title, description, iconColor = "text-amber-500" }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full border border-gray-100">
    <div className={`mb-4 p-3 rounded-full bg-gradient-to-br from-amber-50 to-amber-100`}>
      <Icon className={`w-10 h-10 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// Page data (moved from details section)
const highlightImages = [
  { src: "/images/debut_day/debut_day_highlight_01.jpg", alt: "ChatGPT 스피킹 컨테스트 포스터", caption: "ChatGPT 스피킹 컨테스트" },
  { src: "/images/debut_day/debut_day_highlight_02.jpg", alt: "할로윈 데이 장식", caption: "할로윈 데이 이벤트" },
  { src: "/images/debut_day/debut_day_highlight_03.jpg", alt: "학습 전략 특강", caption: "학습 전략 특강" },
  { src: "/images/debut_day/debut_day_highlight_04.jpg", alt: "데뷰 영어학원 간식", caption: "즐거운 간식 시간" },
  { src: "/images/debut_day/debut_day_highlight_05.jpg", alt: "공부법 특강 후기", caption: "특강 참여 후기" },
  { src: "/images/debut_day/debut_day_highlight_06.jpg", alt: "데뷰데이 환영 보드", caption: "웰컴 데뷰데이!" },
];

const timelineData = [
    { month: "1월", activity: "교재 마스터 챌린지", theme: "준비 / 새출발" },
    { month: "2월", activity: "중등 내신 암기 세미나, 오픈 클래스", theme: "전략적 실전 학습" },
    { month: "3월", activity: "디즈니 데이, 스터디 위드미", theme: "친구와 함께 / 학습 습관" },
    { month: "4월", activity: "스터디 프로젝트", theme: "습관 형성 및 루틴" },
    { month: "5월", activity: "로드맵 상담", theme: "성장 점검 및 감성" },
    { month: "6월", activity: "Speaking Day, 내신 스터디", theme: "발표력 및 자신감" },
    { month: "7월", activity: "CHAT-GPT 스피킹 컨테스트", theme: "자기 표현력 및 창의성" },
    { month: "8월", activity: "데뷰 디즈니 데이", theme: "복습 및 실력 강화" },
    { month: "9월", activity: "대개강 이벤트", theme: "동기 부여 및 새출발" },
    { month: "10월", activity: "공포의 영어방탈출", theme: "재미있는 학습 체험" },
    { month: "11월", activity: "로드맵 상담", theme: "학습 완성도 평가" },
    { month: "12월", activity: "의대생 공부법 특강", theme: "멘토링 및 미래 대비" },
];

const naverBlogUrl = "https://blog.naver.com/ourdebut";


export default function DebutDayPage() {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle
          as="h1"
          icon={CalendarDays}
          title="DEBUT DAY"
          subtitle="정규 수업 외에, 학생들의 시기에 맞춘 특별한 행사들로 함께하는 하루를 채워나갑니다."
          iconColor="text-amber-600"
          titleColor="text-gray-800"
        />

        {/* --- Features Section --- */}
        <AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon={Compass} title="진로 탐색 & 멘토링" description="다양한 분야의 전문가 특강과 1:1 진로 상담을 통해 미래를 설계합니다." iconColor="text-sky-500" />
            <FeatureCard icon={Gamepad2} title="즐거움 가득! 이벤트" description="게임, 퀴즈, 만들기 등 다채로운 체험 활동으로 스트레스를 해소하고 즐거움을 나눕니다." iconColor="text-rose-500" />
            <FeatureCard icon={Trophy} title="도전! 챌린지 & 컨테스트" description="영어 스피치, 글쓰기 대회 등 선의의 경쟁을 통해 성취감을 맛보고 실력을 뽐냅니다." iconColor="text-green-500" />
            <FeatureCard icon={Mic2} title="특별 초청 강연" description="유명 강사 및 교육 전문가를 초빙하여 유익한 학습 정보와 동기 부여 메시지를 전달합니다." iconColor="text-purple-500" />
            <FeatureCard icon={Users} title="학부모 소통의 장" description="자녀 학습 현황 공유 및 교육 정보 교류를 위한 정기적인 학부모 간담회를 개최합니다." iconColor="text-teal-500" />
            <FeatureCard icon={BookOpen} title="토요 클리닉 & 보충" description="정규 수업 외 부족한 부분을 보충하고, 심화 학습을 원하는 학생들을 위한 특별 클리닉을 운영합니다." iconColor="text-orange-500" />
          </div>
        </AnimatedSection>

        {/* --- Highlights Section --- */}
        <AnimatedSection>
          <section className="mt-20 md:mt-28">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 mr-3 text-amber-500" />
              활동 하이라이트
            </h2>
            <p className="text-center text-gray-600 mb-12">매달 새롭고 즐거운 데뷰 데이의 순간들</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {highlightImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {image.caption && <p className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">{image.caption}</p>}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-[#03C75A] text-white hover:bg-[#03C75A]/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                <Link href={naverBlogUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  더 많은 데뷰데이 이야기 (네이버 블로그)
                </Link>
              </Button>
            </div>
          </section>
        </AnimatedSection>
        
        {/* --- Timeline Section --- */}
        <AnimatedSection>
          <section className="mt-20 md:mt-28">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 flex items-center justify-center">
              <CalendarDays className="w-8 h-8 mr-3 text-amber-500" />
              연간 타임라인
            </h2>
            <p className="text-center text-gray-600 mb-12">데뷰데이의 연간 활동 계획을 미리 만나보세요.</p>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-amber-100 text-amber-800 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-tl-lg">월</th>
                    <th scope="col" className="px-6 py-3">주요 활동</th>
                    <th scope="col" className="px-6 py-3 rounded-tr-lg">핵심 테마</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineData.map((item, index) => (
                    <tr key={index} className={`border-b border-amber-100 ${index % 2 === 0 ? 'bg-amber-50' : 'bg-white'} hover:bg-amber-100 transition-colors duration-150`}>
                      <td className="px-6 py-4 font-medium text-amber-900 whitespace-nowrap">{item.month}</td>
                      <td className="px-6 py-4">{item.activity}</td>
                      <td className="px-6 py-4">{item.theme}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-600 text-center">* 위 내용은 사정에 따라 변경될 수 있습니다.</p>
          </section>
        </AnimatedSection>

      </div>
      <ScrollToTopButton />
    </div>
  );
} 