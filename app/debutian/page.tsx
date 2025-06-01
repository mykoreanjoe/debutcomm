import React from 'react';
import { Medal, BookOpen, MessageCircle, Sparkles, BookText, Target, Trophy, Star, UserCircle, CheckCircle2, MessageSquareText } from 'lucide-react'; // 아이콘 추가
import Image from 'next/image';

const DebutianPage = () => {
  // 각 항목을 위한 데이터 구조 (추후 이미지 경로 등 추가 가능)
  const suzohabohaItems = [
    { name: '스터디북', icon: <BookOpen size={48} className="text-blue-500 mb-2" />, description: '초등 스터디북' },
    { name: '스피킹', icon: <MessageCircle size={48} className="text-green-500 mb-2" />, description: '초등 스피킹' },
    { name: '보 카', icon: <Sparkles size={48} className="text-yellow-500 mb-2" />, description: '초등 보카' },
    { name: '하브루타 문법', icon: <BookText size={48} className="text-purple-500 mb-2" />, description: '초등 하브루타 문법' },
  ];

  const sunebohaItems = [
    { name: '스터디북', icon: <BookOpen size={48} className="text-blue-500 mb-2" />, description: '중등 스터디북' },
    { name: '내신100점', icon: <Target size={48} className="text-red-500 mb-2" />, description: '중등 내신 100점' },
    { name: '보 카', icon: <Sparkles size={48} className="text-yellow-500 mb-2" />, description: '중등 보카' },
    { name: '하브루타 문법', icon: <BookText size={48} className="text-purple-500 mb-2" />, description: '중등 하브루타 문법' },
  ];

  const sampleReviews = [
    {
      id: 1,
      author: 'uni****',
      avatarFallback: 'U', // 실제 프로필 이미지 없을 시 이니셜
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
      visit: '영수증 인증', // '1번째 방문' 대신 다른 태그 예시
      tags: ['맞춤 지도를 잘해줘요', '선생님이 열정적이에요', '수업이 체계적이에요', '시설이 깔끔해요', '면학 분위기가 좋아요'],
      content: '대형 학원 보내고 마음에 안들어서 원장님과 상담 후에 데뷰 영어에서 다시 해보기로 마음먹고 아이들 맡겼어요,, 소수 정예라 너무 좋고 아이 학습부터 관리까지 다 맘에 듭니다. 무엇보다 학원 숙제를 모두 학원에서 다 끝내고 오니 엄마 일이 줄어 더 좋구요,, 앞으로 선생님들 믿고 더 보내볼 생각입니다.'
    },
  ];

  const surveyItems = [
    '학습 기간이 어떻게 될까요? (기간을 선택해주세요.)',
    '강사진에 대해서 어떻게 생각하시나요?',
    '교재에 대해 어떻게 생각하시나요?',
    '학습 트레이닝 관리 프로그램에 대해 어떻게 생각하시나요?',
    '온라인 프로그램 (리딩앤, 원아워)에 대해 어떻게 생각하시나요?',
    '학원비에 대해 어떻게 생각하시나요?',
    '방학특강 (여름, 겨울)에 대해 어떻게 생각하시나요?',
    '차량 서비스에 대해 어떻게 생각하시나요?',
    '데뷰데이 (토요 프로그램)에 대해 어떻게 생각하시나요?',
    '행정 및 CS 응대에 대해 어떻게 생각하시나요?',
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* 데뷰후기 섹션 */}
      <section id="reviews" className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-600">생생한 데뷰후기</h2>
          <p className="text-md md:text-lg text-gray-600 text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            데뷰 영어 학원은 주기적은 소통과 서비스 만족도 조사를 통해 학부모님께 최상의 교육 서비를 제공합니다.
          </p>

          {/* 만족도 조사 주요 항목 (이미지 대신 텍스트로) */}
          <div className="mb-12 md:mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-sky-50 border border-sky-200">
            <h3 className="text-2xl font-semibold text-center mb-6 text-blue-500">데뷰 영어 학원 교육서비스 만족도 조사 주요 항목</h3>
            <ul className="space-y-3 list-inside list-disc text-gray-700 marker:text-sky-400">
              {surveyItems.map((item, index) => (
                <li key={index} className="pl-2">
                  {item}
                  {/* 간단한 만족도 척도 예시 (실제 기능은 없음) */}
                  <div className="flex space-x-2 mt-1.5 ml-2 opacity-75">
                    {[1,2,3,4,5].map(num => 
                      <span key={num} className="text-xs px-1.5 py-0.5 border border-gray-300 rounded-sm cursor-default">{num}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 text-center">* 위 항목들은 학부모님 의견을 적극 반영하기 위한 설문 내용의 일부입니다.</p>
          </div>

          {/* 실제 후기 카드 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold mr-3">
                    {/* review.profileImage ? <Image src={review.profileImage} alt={review.author} width={48} height={48} className="rounded-full" /> : review.avatarFallback */}
                    {review.avatarFallback} {/* 프로필 이미지 대신 fallback 텍스트 사용 */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{review.author}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({review.date} / {review.visit})</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow whitespace-pre-line line-clamp-6">
                  {review.content}
                </p>
                {review.tags && review.tags.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <h5 className="text-xs text-gray-500 mb-2 font-medium">이런 점이 좋았어요!</h5>
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-700 border border-sky-200 flex items-center">
                          {tag.includes('열정적') ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-red-500" /> :
                           tag.includes('체계적') ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-500" /> :
                           tag.includes('소통') ? <MessageSquareText className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> : 
                           <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-sky-500" />}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상단 데뷰인 소개 섹션 */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-b from-sky-300 to-sky-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            데뷰인
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white/90 mb-2">
            최고의 노력과 성과!
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-10">
            데뷰 학부모 선생님 학생들의 인정 받은 1인
          </p>
          
          {/* TODO: 트로피 이미지를 public/images/trophy.png 와 같이 준비해주세요. */}
          {/* <Image src="/images/trophy.png" alt="데뷰인 트로피" width={200} height={200} className="mx-auto mb-8" /> */}
          <Trophy className="w-32 h-32 md:w-40 md:h-40 text-yellow-400 mx-auto mb-8 drop-shadow-lg" />

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              10000만 포인트, 상장, 데뷰인 등극
            </h2>
            <div className="bg-white/50 p-6 rounded-lg shadow-xl backdrop-blur-sm">
              <p className="text-md md:text-lg text-gray-700 leading-relaxed text-left">
                영어를 익히는 것이 쉬웠다면, 누구나 뛰어난 실력을 가졌을 것입니다. 
                하지만 탁월한 영어 실력은 꾸준한 노력과 체계적인 관리가 뒷받침될 때 가능합니다. 
                학습 과정이 결코 쉽진 않지만, 더 높은 목표를 정해 쉼 없이 노력하여 뛰어난 성취를 이룩한 이들을 
                <span className="font-semibold text-blue-600">'데뷰인'</span>이라 부릅니다. 
                우리는 데뷰인들을 존경하고 기억 할 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 챔피언 섹션들을 포함할 컨테이너 */}
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-16 flex-grow">
        {/* 아카데믹 챔피언 섹션 (하단으로 이동 및 간소화) */}
        <section id="academic-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-orange-500 mb-1 text-left">
            아카데믹 챔피언
          </h3>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-24"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center md:w-1/4">
              <Medal className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mb-3" />
              <p className="text-lg font-semibold text-gray-700">아카데믹</p>
              <p className="text-sm text-gray-500">(월말 1위)</p>
            </div>
            <div className="md:w-3/4">
              <p className="text-xl md:text-2xl font-semibold text-gray-800" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
                Champions are not afraid of failure. They take calculated risks.
              </p>
              <blockquote className="mt-4 p-4 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg">
                <p className="text-md text-gray-600 italic leading-relaxed">
                  &quot;챔피언들은 실패를 두려워 하지 않습니다. <br />
                  그들은 위험과 어려움이 따른다는것을 알면서도, <br />
                  끝까지 최선을 다해 노력합니다.&quot;
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 스스로보하 챔피언 (초등) 섹션 (하단으로 이동) */}
        <section id="suzohaboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <div className="flex items-center mb-1">
            <span className="bg-green-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">초등</span>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-500">
              스스로보하 챔피언
            </h3>
          </div>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {suzohabohaItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {item.icon}
                <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 스스로내하 챔피언 (중등) 섹션 (하단으로 이동) */}
        <section id="suneboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-gray-200">
          <div className="flex items-center mb-1">
            <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">중등</span>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-500">
              스스로내하 챔피언
            </h3>
          </div>
          <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {sunebohaItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {item.icon}
                <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* 데뷰인 보러가기 버튼 섹션 */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://blog.naver.com/ourdebut"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
          >
            더 많은 데뷰인 보러 가기 (네이버 블로그)
          </a>
        </div>
      </section>

      {/* 하단 로고 섹션 */}
      <footer className="py-8 bg-blue-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
          <Image src="/images/debut_language_school_logo.png" alt="데뷰영어학원 로고" width={50} height={50} className="mr-3 mb-4 md:mb-0" />
          <div>
            <p className="font-semibold text-lg text-center md:text-left">DEBUT LANGUAGE SCHOOL</p>
            <p className="text-md text-center md:text-left">데뷰영어학원</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default DebutianPage; 