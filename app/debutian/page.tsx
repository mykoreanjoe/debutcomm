"use client";

import React from 'react';
import { Medal, BookOpen, MessageCircle, Sparkles, BookText, Target, Trophy, Award, Star, ExternalLink } from 'lucide-react';
// import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: '데뷰인 | 데뷰 영어 학원',
//   description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다. 아카데믹 챔피언, 스스로학습 챔피언 등 다양한 성과를 확인하세요.',
//   openGraph: {
//     title: '데뷰인 | 데뷰 영어 학원',
//     description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다.',
//     images: [
//       {
//         url: "/images/og-debutian.png", // 데뷰인 페이지 전용 OG 이미지 (가정)
//         width: 1200,
//         height: 630,
//         alt: "데뷰인 페이지 OG 이미지",
//       },
//     ],
//   },
// };

const suzohabohaItems = [
    { name: '스터디북', icon: BookOpen },
    { name: '스피킹', icon: MessageCircle },
    { name: '보카', icon: Sparkles },
    { name: '하브루타 문법', icon: BookText },
];

const sunebohaItems = [
    { name: '스터디북', icon: BookOpen },
    { name: '내신 100점', icon: Target },
    { name: '보카', icon: Sparkles },
    { name: '하브루타 문법', icon: BookText },
];

const debutCards = [
    {
        icon: Trophy,
        title: "DEBUT CHAMPION",
        subtitle: "챔피언에게 수여",
        quote: "Champions are not afraid of failure. They take calculated risks.",
        description: "챔피언이란 경기나 일련의 대회에서 모든 상대를 이겨낸 사람 또는 열정적으로 어떤 사람, 믿음, 권리, 또는 원칙을 지지하고, 경쟁하는 사람을 말합니다.",
        color: "yellow"
    },
    {
        icon: Award,
        title: "DEBUT MASTER",
        subtitle: "아카데믹 챔피언에게 수여",
        quote: "Talents are never enough. Masters always do best in small things.",
        description: "마스터란 해당 분야에서 전문가 수준의 지식과 기술을 보유하고 있으며, 그 분야에서 최고의 성과를 이루어낸 사람을 의미합니다.",
        color: "purple"
    },
    {
        icon: Star,
        title: "DEBUT MISSION",
        subtitle: "매번의 학습 노력을 기울인 학생에게 수여",
        quote: "Challenge yourself, but keep it realistic.",
        description: "미션은 조직 개인이 달성하고자 하는 구체적인 목표나 목적을 의미합니다. 미션은 방향성과 목적을 제공하며, 우선순위를 결정하고 의사 결정을 지도하는 데 중요합니다.",
        color: "green"
    }
];

const ChampionSection = ({ title, badge, items }: { title: string; badge: string; items: { name: string; icon: React.ElementType }[] }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-3 ${badge === '초등' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{badge}</span>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {items.map((item) => (
                <div key={item.name} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg transition-transform hover:scale-105">
                    <item.icon className="w-10 h-10 mb-3 text-gray-500" />
                    <p className="text-md font-semibold text-gray-700">{item.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const DebutianPage = () => {
  const cardColorClasses = {
    yellow: "border-yellow-400 text-yellow-600",
    purple: "border-purple-400 text-purple-600",
    green: "border-green-400 text-green-600",
  };

  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection>
                <SectionTitle
                    icon={Medal}
                    title="데뷰인 (DEBUTIAN)"
                    subtitle="끊임없는 노력으로 뛰어난 성취를 이룬 데뷰의 자랑스러운 학생들을 소개합니다."
                    iconColor="text-yellow-500"
                />
            </AnimatedSection>
            
            <AnimatedSection>
                 <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-100 mb-16 md:mb-20 text-center max-w-4xl mx-auto">
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-lg" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">데뷰인이란?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        영어를 익히는 과정은 결코 순탄하지 않습니다. 탁월한 영어 실력은 꾸준한 노력과 체계적인 관리가 뒷받침될 때 비로소 가능합니다. 
                        데뷰는 이러한 어려움 속에서도 더 높은 목표를 향해 쉼 없이 나아가 뛰어난 성취를 이룬 학생들을 <span className="font-semibold text-blue-600">데뷰인</span>이라 부르며, 그들의 노력을 존경하고 기억합니다.
                    </p>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <section className="mb-16 md:mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">데뷰인 선정 기준</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">초등 데뷰인 (6개월)</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>3관왕 (스스보하+아), 성취도 평가 레벨 내 상위 3% 달성</li>
                                <li>참고 자료: 3~8월, 9월~2월</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">중등 데뷰인 (6개월)</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>3관왕 (스피킹, 아카데믹, 스터디북)</li>
                                <li>내신 100점, 고1/2/3 각 90점대 이상 성취도 평가 결과</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection>
                <section className="mb-16 md:mb-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">동기부여 시스템: 데뷰 카드</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {debutCards.map((card) => (
                            <div key={card.title} className={`bg-white p-6 rounded-lg shadow-lg border-t-4 ${cardColorClasses[card.color as keyof typeof cardColorClasses]} flex flex-col`}>
                                <div className="flex items-center mb-4">
                                    <card.icon className={`w-12 h-12 mr-4 ${cardColorClasses[card.color as keyof typeof cardColorClasses]}`} />
                                    <div>
                                        <h3 className={`text-xl font-bold ${cardColorClasses[card.color as keyof typeof cardColorClasses]}`}>{card.title}</h3>
                                        <p className="font-semibold text-gray-600">{card.subtitle}</p>
                                    </div>
                                </div>
                                <blockquote className="text-sm text-gray-600 mt-auto">
                                    <p className="font-bold mb-2">&quot;{card.quote}&quot;</p>
                                    <p>{card.description}</p>
                                </blockquote>
                            </div>
                        ))}
                    </div>
                </section>
            </AnimatedSection>
            
            <AnimatedSection>
                <ChampionSection title="스스로 학습 챔피언" badge="초등" items={suzohabohaItems} />
            </AnimatedSection>

             <AnimatedSection>
                <div className="mt-8">
                    <ChampionSection title="스스로 학습 챔피언" badge="중등" items={sunebohaItems} />
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <div className="mt-20 text-center">
                    <Button asChild size="lg">
                        <Link href="https://blog.naver.com/ourdebut" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            더 많은 데뷰인 보러 가기 (네이버 블로그)
                        </Link>
                    </Button>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <div className="mt-16 text-center">
                    <div className="inline-block">
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
                            학생들의 첫 시작, 그 <strong className="text-indigo-600 font-semibold">처음</strong>을 함께 고민하고,
                            <br />
                            가장 빛나는 <strong className="text-indigo-600 font-semibold">DEBUT</strong>의 순간을 만들어갑니다.
                        </p>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <div className="mt-16 text-center">
                    <div className="inline-block">
                        <p className="text-gray-600 mb-6 flex-grow max-w-2xl mx-auto">
                        체계적인 학습 로드맵과 1:1 맞춤 관리로 학생의 <strong className="text-indigo-600 font-semibold">처음</strong>부터 <strong className="text-indigo-600 font-semibold">끝</strong>까지 책임집니다. 
                        영어 실력 향상은 물론, 올바른 학습 습관 형성으로 자기주도학습 능력을 완성합니다.
                        </p>
                    </div>
                </div>
            </AnimatedSection>

        </div>
    </div>
  );
};

export default DebutianPage; 