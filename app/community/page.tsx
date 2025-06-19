"use client"
import React from 'react';
import { Lock, MessageSquare, Users, Sparkles } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
  { text: 'Q&A: 궁금한 점을 질문하고 답변을 받아보세요.', icon: MessageSquare },
  { text: '고민 상담: 학습 및 진로에 대한 고민을 나누고 조언을 얻을 수 있습니다.', icon: Users },
  { text: '자료 공유: 유용한 학습 자료 및 정보를 얻고 공유할 수 있습니다.', icon: Sparkles },
];

const CommunityPage = () => {
  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection>
                <SectionTitle
                    icon={Users}
                    title="같이완성 커뮤니티"
                    subtitle="학습 정보 공유, 질문과 답변 등 자유롭게 소통하며 함께 성장하는 공간입니다."
                    iconColor="text-teal-500"
                />
            </AnimatedSection>
            
            <AnimatedSection>
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto">
                    {/* Coming Soon Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">커뮤니티 오픈 준비 중입니다!</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            더 나은 소통 환경을 위해 열심히 준비하고 있습니다. <br/>
                            곧 유용한 기능들과 함께 찾아뵙겠습니다. 많은 기대 부탁드립니다!
                        </p>
                    </div>

                    {/* Benefits Section */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">미리보는 커뮤니티 혜택</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-slate-50 p-6 rounded-lg border border-gray-200 text-center flex flex-col items-center transform transition-transform hover:scale-105">
                                    <benefit.icon className="w-10 h-10 text-teal-500 mb-4" />
                                    <p className="text-gray-700 font-medium">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Member Only Section */}
                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
                        <Lock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <h3 className="text-xl font-semibold text-amber-700 mb-2">회원 전용 커뮤니티</h3>
                        <p className="text-amber-600 mb-6">
                            커뮤니티의 모든 게시판과 자료는 데뷰 학생들만 이용 가능합니다. <br/>
                            추후 인증 방식에 대해 안내해 드릴 예정입니다.
                        </p>
                        <Button asChild variant="outline">
                            <Link href="/sign-in">
                                로그인
                            </Link>
                        </Button>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
};

export default CommunityPage; 