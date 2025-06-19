"use client";

import React, { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { BookOpen, GraduationCap, Target, ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ElementarySection from '@/components/curriculum/ElementarySection';
import MiddleSchoolSection from '@/components/curriculum/MiddleSchoolSection';
import { BookOpenCheck } from 'lucide-react';

interface CurriculumCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  anchorId: string;
  onClick: () => void;
}

const curriculumData = [
  {
    title: "초등 정규 과정",
    description: "탄탄한 기본기와 자기주도 학습 습관을 형성하는 과정입니다.",
    icon: BookOpen,
    section: "elementary",
    tabValue: "regular",
  },
  {
    title: "초등 인텐시브 과정",
    description: "중등 영어 학습을 완벽하게 대비하는 초등 고학년 집중 과정입니다.",
    icon: Rocket,
    section: "elementary",
    tabValue: "intensive",
  },
  {
    title: "중등 정규 과정",
    description: "학교 내신과 수능을 대비하는 학습 과정입니다.",
    icon: GraduationCap,
    section: "middle",
    tabValue: "regular",
  },
  {
    title: "중등 내신 과정",
    description: "목일중, 목동중 내신을 전문적으로 대비하기 위한 과정입니다.",
    icon: Target,
    section: "middle",
    tabValue: "record",
  },
];

const getAnchorId = (title: string) => {
  switch (title) {
    case "초등 정규 과정": return "elementary-regular-details";
    case "초등 인텐시브 과정": return "elementary-intensive-details";
    case "중등 정규 과정": return "middle-regular-details";
    case "중등 내신 과정": return "middle-school-record-details";
    default: return "";
  }
};

const CurriculumCard: React.FC<CurriculumCardProps> = ({
  title,
  description,
  icon: Icon,
  anchorId,
  onClick,
}) => {
  const cardColors: { [key: string]: { bg: string, text: string, border: string } } = {
    "초등 정규 과정": { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    "초등 인텐시브 과정": { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    "중등 정규 과정": { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    "중등 내신 과정": { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  };
  const colors = cardColors[title] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };

  return (
    <div className={`rounded-2xl shadow-lg p-6 md:p-8 flex flex-col justify-between ${colors.bg} border ${colors.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full`}>
      <div>
        <Icon className={`w-12 h-12 mb-4 ${colors.text}`} />
        <h3 className={`text-2xl font-bold mb-3 ${colors.text}`}>{title}</h3>
        <p className="text-gray-600 text-base mb-6 min-h-[4.5rem]">{description}</p>
      </div>
      <Button 
        onClick={onClick} 
        variant="outline"
        className={`w-full mt-auto bg-white/60 ${colors.border} ${colors.text} hover:bg-white`}
      >
        과정 자세히 보기 <ArrowRight size={16} className="ml-2" /> 
      </Button>
    </div>
  );
};

interface LevelTitleProps {
    level: string;
    description: string;
}

const LevelTitle: React.FC<LevelTitleProps> = ({ level, description }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{level}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
    </div>
);

export const metadata = {
    title: "커리큘럼 | 데뷰 영어 학원",
    description: "데뷰 영어의 커리큘럼을 소개합니다. 초등부터 중등까지, 완성형 영어 교육을 만나보세요."
};

export default function CurriculumPage() {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                
                <AnimatedSection>
                    <SectionTitle
                        icon={BookOpenCheck}
                        title="커리큘럼"
                        subtitle="체계적인 학습 로드맵으로 완성되는 데뷰의 영어 교육"
                    />
                </AnimatedSection>
                
                <AnimatedSection>
                    <div id="elementary" className="mb-24">
                        <LevelTitle 
                            level="초등부"
                            description="미국 교과서와 체계적인 관리로 영어의 기초를 완성합니다."
                        />
                        <ElementarySection />
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div id="middle-school" className="mb-24">
                        <LevelTitle 
                            level="중등부"
                            description="내신 대비부터 수능 1등급까지, 입시 영어의 모든 것을 준비합니다."
                        />
                        <MiddleSchoolSection />
                    </div>
                </AnimatedSection>

            </div>
        </div>
    );
} 