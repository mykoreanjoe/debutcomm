import React from 'react';
// import Head from 'next/head';
// import AnimatedSection from '@/components/AnimatedSection';
import { Star, CheckCircle, Award } from 'lucide-react';
import type { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '데뷰 수강생 리얼 후기 | 데뷰 영어 학원',
  openGraph: {
    title: '데뷰 후기 | 데뷰 영어 학원',
    description: '데뷰 영어 학원 학생 및 학부모님들의 생생한 후기를 확인하세요.',
    images: [
      {
        url: "/images/og-reviews.png", // 데뷰 후기 페이지 전용 OG 이미지 (가정)
        width: 1200,
        height: 630,
        alt: "데뷰 후기 페이지 OG 이미지",
      },
    ],
  },
};

const sampleReviews = [
  {
    id: 1,
    author: 'uni****',
    avatarFallback: 'U',
    rating: 5,
    date: '24.3.29',
    visit: '1번째 방문',
    tags: ['맞춤 지도를 잘해줘요', '선생님이 열정적이에요', '수업이 체계적이에요', '학생과 소통을 잘해요', '시설이 깔끔해요'],
    content: '대형 학원 몇년째 다니다가 아이가 수업에 흥미를 잃어 중단 중 아무 정보 없이 집 가까이 새로 생긴 학원이라 보내게 되었습니다. 그래도 선생님들께서 많은 경험이 있으신 분들이라 믿고 8개월째 다니는데 아직 공부보다 노는것을 너무 좋아하고 학습 습관도 제대로 잡히지 않아 힘드셨을텐데도 포기하지 않고 소통하면서 성의 있게 끌어주려 하신다는 느낌을 많이 받았습니다. 아이 개별의 특성도 파악하고 계셨고 거기에 맞춰 세심하게 이해시키면서 진행되는것도 좋았습니다. 큰규모는 아니지만 시설도 깔끔하고 학습환경도 쾌적합니다. 영어에 흥미가 없고 공부를 정말 안했던지라 걱정했는데 덕분에 전혀 기대하지 않았던 첫 중간고사 100점을 받을 수 있었던 것 같습니다. 앞으로도 지금처럼 잘 부탁드립니다. ^^'
  },
  {
    id: 2,
    author: '민트142',
    avatarFallback: '민',
    rating: 5,
    date: '24.2.28',
    visit: '1번째 방문',
    tags: ['맞춤 지도를 잘해줘요', '선생님이 열정적이에요', '학생과 소통을 잘해요', '시설이 깔끔해요', '학생 관리가 철저해요'],
    content: '지난 1~2월 방학동안 아이를 데뷰영어학원에 보내 본 결과 저는 넘 만족합니다. 작년말 아이 영어를 어디에 보내야하나 고민하다가 가게 되었는데요. 기존에 다니던 대형학원들은 예습 위주의 숙제가 많아 엄마인 제가 도와줄 부분이 많았고 수업시간에 단체로 하느라 시간을 많이 뺏기고 하더라고요. 이곳은 우선 아이 맞춤형으로 수업해주셔서 아이가 스트레스 없이 재밌게 다니고 있습니다. 복습 위주의 숙제라 아이 혼자서도 할 수 있습니다. 선생님이 열정적으로 가르쳐주시고 아무래도 새로 생긴만큼 열심히 관리해주십니다. 워낙 부끄럼이 많아 틀릴까봐 선생님이 질문하는 걸 싫어하는데 이곳 선생님은 틀려도 괜찮다고 격려해주셔서 아이가 틀려도 대답한다고 하더라고요. 좋은 학원을 만나게 되어 넘 다행입니다. 다른분들께도 추천드려요~'
  },
  {
    id: 3,
    author: 'soo1003',
    avatarFallback: 'S',
    rating: 5,
    date: '24.1.3',
    visit: '영수증 인증',
    tags: ['맞춤 지도를 잘해줘요', '선생님이 열정적이에요', '수업이 체계적이에요', '시설이 깔끔해요', '면학 분위기가 좋아요'],
    content: '대형 학원 보내고 마음에 안들어서 원장님과 상담 후에 데뷰 영어에서 다시 해보기로 마음먹고 아이들 맡겼어요,, 소수 정예라 너무 좋고 아이 학습부터 관리까지 다 맘에 듭니다. 무엇보다 학원 숙제를 모두 학원에서 다 끝내고 오니 엄마 일이 줄어 더 좋구요,, 앞으로 선생님들 믿고 더 보내볼 생각입니다.'
  },
];

const surveyItems = [
  '학습 기간이 어떻게 될까요?',
  '강사진에 대해서 어떻게 생각하시나요?',
  '교재에 대해 어떻게 생각하시나요?',
  '관리 프로그램에 대해 어떻게 생각하시나요?',
  '온라인 프로그램에 대해 어떻게 생각하시나요?',
  '학원비에 대해 어떻게 생각하시나요?',
  '방학특강 (여름, 겨울)에 대해 어떻게 생각하시나요?',
  '차량 서비스에 대해 어떻게 생각하시나요?',
  '데뷰데이에 대해 어떻게 생각하시나요?',
  '행정 및 CS 응대에 대해 어떻게 생각하시나요?',
];

const ReviewsPage = () => {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AnimatedSection>
            <SectionTitle
                as="h1"
                icon={Award}
                title="수강생 리얼 후기"
                subtitle="실제 학부모님들이 작성해주신 소중한 후기들을 통해 데뷰의 진가를 확인해보세요."
                iconColor="text-blue-600"
            />
        </AnimatedSection>
        
        {/* 실제 후기 카드 목록 */}
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Main Review Column --- */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-8">
              {sampleReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xl font-bold mr-4">
                      {review.avatarFallback}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{review.author}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="flex items-center mr-3">
                           {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                          ))}
                        </span>
                        <span>{review.date}</span>
                        <span className="mx-2">|</span>
                        <span>{review.visit}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-5 flex-grow whitespace-pre-line">
                    {review.content}
                  </p>
                  {review.tags && review.tags.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {review.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* --- Sidebar (Survey Items) --- */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="p-8 rounded-xl shadow-md bg-white border border-gray-100">
                  <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">교육 만족도 설문</h2>
                  <p className="text-center text-sm text-gray-600 mb-6">학부모님의 목소리를 귀담아듣고 더 나은 교육 환경을 만들기 위해 아래와 같은 항목으로 주기적인 만족도 조사를 진행합니다.</p>
                  <ul className="space-y-3">
                    {surveyItems.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                    <Button asChild className="w-full text-lg py-6 bg-[#03C75A] hover:bg-[#03B352] text-white" size="lg">
                        <Link href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
                            레벨테스트 예약하기
                        </Link>
                    </Button>
                </div>
              </div>
            </aside>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ReviewsPage; 