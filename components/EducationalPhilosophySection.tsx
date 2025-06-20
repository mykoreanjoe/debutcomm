import { Target, TrendingUp, GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';
import AnimatedSection from './AnimatedSection';

const philosophies = [
  {
    icon: <Target className="h-12 w-12 text-blue-500" />,
    title: '학습 방법의 부재',
    description: '부적절한 교재 선정, 잘못된 학습 방법, 영역별 교수법 부재로 인한 혼란',
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
    title: '동기 부여의 어려움',
    description: '흥미를 고려하지 않은 무작정한 반복 학습과 명확한 목표 설정 부재',
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-blue-500" />,
    title: '성과 확인의 불확실성',
    description: '단기간에 결과를 보기 어렵고, 평가의 정확성과 신뢰성 확보의 어려움',
  },
];

const EducationalPhilosophySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <AnimatedSection>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              데뷰는 알고 있습니다
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              데뷰는 학생들이 겪는 영어 학습의 본질적인 어려움을 이해하고, 이를 해결하기 위해 존재합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {philosophies.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center transition-transform transform hover:scale-105"
              >
                <div className="flex justify-center items-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default EducationalPhilosophySection; 