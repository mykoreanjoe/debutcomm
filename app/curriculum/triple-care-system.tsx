import React from 'react';
import { Users, /* CheckCircle, */ /* ShieldCheck, */ PhoneCall, Smile, BarChart2 } from 'lucide-react'; // 사용하지 않는 아이콘 주석 처리

const TripleCareSystem = () => {
  return (
    <section id="triple-care-system" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-3">
            4.5 3중 관리 완성 학습
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            강사, 온라인AI, 스터디 매니저가 함께하여 한 학생의 학습을 관리 합니다.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-2xl">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">주요 업무</h3>
          <ul className="space-y-6">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <PhoneCall className="w-7 h-7 text-green-500 mr-4 mt-1" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-700">출결 체크</h4>
                <p className="text-gray-600">5분 이상 지각 시 학부모님께 즉시 전화 알림으로 철저한 출결 관리를 지원합니다.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <BarChart2 className="w-7 h-7 text-blue-500 mr-4 mt-1" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-700">온라인 성취도 관리</h4>
                <p className="text-gray-600">온라인 학습 데이터 기반으로 학생의 성취도를 면밀히 분석하고, 맞춤형 피드백을 제공합니다.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <Smile className="w-7 h-7 text-pink-500 mr-4 mt-1" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-700">학생들의 정서적 케어</h4>
                <p className="text-gray-600">단순한 학습 관리를 넘어, 학생들의 학습 동기 부여 및 정서적 안정까지 세심하게 지원합니다.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TripleCareSystem; 