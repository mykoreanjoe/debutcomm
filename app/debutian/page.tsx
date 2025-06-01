import React from 'react';
import { Medal, BookOpen, MessageCircle, Sparkles, BookText, Target, Trophy } from 'lucide-react'; // Star, UserCircle, CheckCircle2, MessageSquareText 아이콘 삭제
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '데뷰인 | 데뷰 영어 학원',
  description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다. 아카데믹 챔피언, 스스로학습 챔피언 등 다양한 성과를 확인하세요.',
  openGraph: {
    title: '데뷰인 | 데뷰 영어 학원',
    description: '데뷰 영어 학원의 자랑스러운 데뷰인들을 소개합니다.',
    images: [
      {
        url: "/images/og-debutian.png", // 데뷰인 페이지 전용 OG 이미지 (가정)
        width: 1200,
        height: 630,
        alt: "데뷰인 페이지 OG 이미지",
      },
    ],
  },
};

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

  return (
    <main className="flex flex-col min-h-screen">
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
                <span className="font-semibold text-blue-600">&apos;데뷰인&apos;</span>이라 부릅니다. 
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