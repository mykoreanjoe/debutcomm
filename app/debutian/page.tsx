import React from 'react';
import { Medal } from 'lucide-react'; // 금메달 아이콘으로 Medal 아이콘을 사용합니다.

const DebutianPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section id="academic-champion" className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-yellow-500">
          아카데믹 챔피언
        </h1>
        <div className="mt-2 mb-8 border-b-4 border-yellow-400 w-32 mx-auto"></div> {/* 밑줄 효과 */}

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-slate-50 p-6 md:p-10 rounded-lg shadow-sm">
          <div className="flex flex-col items-center text-center md:w-1/4">
            {/* Medal 아이콘으로 대체. 실제 이미지 사용 시 Image 컴포넌트로 변경 필요 */}
            <Medal className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mb-3" />
            <p className="text-lg font-semibold text-gray-700">아카데믹</p>
            <p className="text-sm text-gray-500">(월말 1위)</p>
          </div>
          <div className="md:w-3/4">
            <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight" style={{ fontFamily: '\'\'\'Comic Sans MS\'\'\', \'\'\'Comic Sans\'\'\', \'\'\'cursive\'\'\'' }}>
              Champions
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-1 mb-3 leading-tight" style={{ fontFamily: '\'\'\'Comic Sans MS\'\'\', \'\'\'Comic Sans\'\'\', \'\'\'cursive\'\'\'' }}>
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

      {/* TODO: 데뷰인의 다른 섹션들이 있다면 여기에 추가 */}
      {/* 
      <section id="other-section" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-700">
          다른 섹션 제목
        </h2>
        <p className="text-gray-600 text-center">
          다른 내용이 들어갑니다...
        </p>
      </section>
      */}
    </main>
  );
};

export default DebutianPage; 