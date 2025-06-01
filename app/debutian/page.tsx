import React from 'react';
import { Medal, BookOpen, MessageCircle, Sparkles, BookText, Target } from 'lucide-react'; // Building 아이콘 제거
import Image from 'next/image'; // next/image import 추가

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
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      {/* 전체 페이지 제목 */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
        데뷰 챔피언
      </h1>

      {/* 아카데믹 챔피언 섹션 */}
      <section id="academic-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-sky-200">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-1 text-left">
          아카데믹 챔피언
        </h2>
        <div className="mt-1 mb-6 border-b-4 border-orange-400 w-24"></div> {/* 밑줄 효과 */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center md:w-1/4">
            {/* TODO: 실제 금메달 이미지로 교체 (예: /images/gold_medal.png) */}
            <Medal className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mb-3" />
            <p className="text-lg font-semibold text-gray-700">아카데믹</p>
            <p className="text-sm text-gray-500">(월말 1위)</p>
          </div>
          <div className="md:w-3/4">
            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
              Champions
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-1 mb-3 leading-tight" style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}>
              are not afraid of failure.
              They take calculated risks.
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

      {/* 스스로보하 챔피언 (초등) 섹션 */}
      <section id="suzohaboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-sky-200">
        <div className="flex items-center mb-1">
          <span className="bg-green-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">초등</span>
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
            스스로보하 챔피언
          </h2>
        </div>
        <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div> {/* 밑줄 효과 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {suzohabohaItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* TODO: 실제 항목 이미지로 교체 (예: /images/elementary_studybook.png) */}
              {item.icon}
              <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 스스로내하 챔피언 (중등) 섹션 */}
      <section id="suneboha-champion" className="mb-16 p-6 md:p-8 rounded-xl shadow-lg bg-white border border-sky-200">
        <div className="flex items-center mb-1">
          <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">중등</span>
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
            스스로내하 챔피언
          </h2>
        </div>
        <div className="mt-1 mb-6 border-b-4 border-orange-400 w-40"></div> {/* 밑줄 효과 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {sunebohaItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* TODO: 실제 항목 이미지로 교체 (예: /images/middle_studybook.png) */}
              {item.icon}
              <p className="text-md font-semibold text-gray-700 mt-2">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* 하단 로고 섹션 */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-blue-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-white">
          {/* public/images/debut_language_school_logo.png 사용 */}
          <Image src="/images/debut_language_school_logo.png" alt="데뷰영어학원 로고" width={50} height={50} className="mr-3" />
          <div>
            <p className="font-semibold text-lg">DEBUT LANGUAGE SCHOOL</p>
            <p className="text-md">데뷰영어학원</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default DebutianPage; 