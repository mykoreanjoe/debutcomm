import React from 'react';
// import Head from 'next/head';
// import AnimatedSection from '@/components/AnimatedSection';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

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
    <main className="flex flex-col min-h-screen bg-gray-50">
      <section id="reviews" className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-blue-700">생생한 데뷰후기</h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            데뷰 영어 학원은 주기적인 소통과 서비스 만족도 조사를 통해 학부모님께 최상의 교육 서비스를 제공합니다. 
            실제 학부모님들이 작성해주신 소중한 후기들을 확인해보세요.
          </p>

          {/* 만족도 조사 주요 항목 */}
          <div className="mb-16 md:mb-20 p-8 rounded-2xl shadow-xl bg-white border border-blue-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-600">데뷰 영어 학원 교육서비스 만족도 조사</h2>
            <p className="text-center text-gray-600 mb-8">학부모님의 목소리를 귀담아듣고 더 나은 교육 환경을 만들기 위해 노력합니다. 다음은 주요 설문 항목입니다.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              {surveyItems.map((item, index) => (
                <li key={index} className="pl-2 flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">&#10003;</span> {/* 체크 아이콘 */}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-8 text-center">* 위 항목들은 학부모님 의견을 적극 반영하기 위한 실제 설문 내용의 일부입니다.</p>
          </div>

          {/* 실제 후기 카드 목록 */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-600">학부모님 추천 후기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 flex flex-col hover:scale-[1.02] transition-all duration-300 ease-out">
                <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center text-xl font-semibold mr-4 shadow-sm">
                    {review.avatarFallback}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{review.author}</h3>
                    <div className="flex items-center mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({review.date} / {review.visit})</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-grow whitespace-pre-line line-clamp-[8]">
                  {review.content}
                </p>
                {review.tags && review.tags.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <h4 className="text-xs text-gray-500 mb-2.5 font-medium">이런 점이 좋았어요!</h4>
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-sky-50 text-sky-700 border border-sky-200 flex items-center shadow-sm">
                          {tag.includes('열정적') ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-red-400" /> :
                           tag.includes('체계적') ? <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-400" /> :
                           tag.includes('소통') ? <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> : 
                           <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-sky-400" />}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 레테 예약하기 버튼 */}
          <div className="mt-12 md:mt-16 text-center">
            <a
              href="https://booking.naver.com/booking/13/bizes/1068331"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              레벨테스트 예약하기
            </a>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ReviewsPage; 