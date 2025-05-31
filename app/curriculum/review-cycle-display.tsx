import React from 'react';
import { Zap, Award } from 'lucide-react'; // 아이콘 추가

interface ReviewStepProps {
  name: string;
  description: string;
  color: string; // Tailwind CSS background-color class
  textColor?: string; // Tailwind CSS text-color class
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

const ReviewCycleDisplay = () => {
  const elementaryData: ReviewCycleSectionProps = {
    title: "초등부 4단계 복습과정",
    description: "초등부는 탄탄한 어학 기본기를 쌓으며, 다양한 활동으로 창의적인 학습 역량을 마스터하는 과정입니다. 다양한 방법으로 복습하여 지루함을 예방하고, 자연스럽게 복습합니다.", // "프로젝트"를 "활동"으로 수정
    icon: Zap,
    titleColor: "text-sky-600",
    sectionBgColor: "bg-sky-50",
    steps: [
      {
        name: "단어",
        description: "수업과 연계된 자체제작 단어장으로 선노출 진행",
        color: "bg-yellow-300", 
        textColor: "text-yellow-800",
      },
      {
        name: "수업",
        description: "선행된 단어 기반으로, 지문을 읽으며 직독직해",
        color: "bg-lime-300",
        textColor: "text-lime-800",
      },
      {
        name: "심화 활동", // "프로젝트"를 "심화 활동"으로 수정
        description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득",
        color: "bg-orange-400",
        textColor: "text-orange-800",
      },
      {
        name: "온라인 학습/미션",
        description: "온라인으로 어휘를 한번 더 복습하고, 가정에서 Speaking Writing 미션 복습",
        color: "bg-red-400",
        textColor: "text-red-800",
      },
    ],
  };

  const middleSchoolData: ReviewCycleSectionProps = {
    title: "중등부 3단계 복습과정",
    description: "중등부는 시험에 강한 학습역량을 형성하여, 중등 수행/내신/수능을 조기마스터 하는 과정입니다. 기준점에 미달한 학생들은 전문학습 코칭과 관리로 완성도를 높입니다.",
    icon: Award,
    titleColor: "text-indigo-600",
    sectionBgColor: "bg-indigo-50",
    steps: [
      {
        name: "단어",
        description: "수업과 연계된 자체제작 단어장으로 선노출 진행",
        color: "bg-green-300",
        textColor: "text-green-800",
      },
      {
        name: "수업",
        description: "선행된 단어 기반으로, 지문을 읽으며 직독직해",
        color: "bg-emerald-300",
        textColor: "text-emerald-800",
      },
      {
        name: "심화 활동", // "프로젝트"를 "심화 활동"으로 수정
        description: "학습된 어휘와 지식을 다양한 활동으로 한 번 더 체득",
        color: "bg-teal-400", // 이미지의 청록색 계열에 맞춤
        textColor: "text-teal-800",
      },
    ],
  };

  return (
    <div className="py-8 md:py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <ReviewCycleSection {...elementaryData} />
        <ReviewCycleSection {...middleSchoolData} />
      </div>
    </div>
  );
};

export default ReviewCycleDisplay; 