import React from 'react';

const roadmapDataDKtoD3 = [
  { level: 'DK, DK*', nationalLevel: '초3', usLevel: 'PK', achievementTarget: '파닉스 마스터', vocabulary: '400+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '파닉스', nonLiterature: '-' },
  { level: 'D1, D1*', nationalLevel: '초4~5', usLevel: 'G1', achievementTarget: '토셀 Starter 3~2급', vocabulary: '640+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '다양한 문학 시리즈 (ORT, Biscuit, Little Critter 등)', nonLiterature: '-' },
  { level: 'D2, D2*', nationalLevel: '초5~6', usLevel: 'G2', achievementTarget: '토셀 Basic 3~2급', vocabulary: '800+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '-', nonLiterature: 'Oxford Read and Discover 외 다양한 분야의 컨텐츠' },
  { level: 'D3, D3*', nationalLevel: '초6~중1', usLevel: 'G3', achievementTarget: '토셀 Basic 2~1급', vocabulary: '800+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '-', nonLiterature: 'Oxford Read and Discover 외 다양한 분야의 컨텐츠' },
];

const headers = ['레벨', '국내수준', '미국수준', '성취 목표', '어휘', '미교과', '문학', '비문학'];

const ElementaryRoadmapTableDKtoD3 = () => {
  return (
    <div className="w-full">
      {/* Desktop Header */}
      <div className="hidden md:grid md:grid-cols-8 gap-2 bg-amber-50 p-2 rounded-t-lg font-semibold text-amber-700 text-sm text-center">
        {headers.map(h => <div key={h}>{h}</div>)}
      </div>
      {/* Mobile Cards / Desktop Rows */}
      <div className="space-y-4 md:space-y-0">
        {roadmapDataDKtoD3.map((row, index) => (
          <div key={index} className={`p-4 bg-white rounded-lg shadow-sm border md:border-t-0 md:rounded-none md:shadow-none md:grid md:grid-cols-8 md:gap-2 md:items-center text-sm ${index % 2 !== 0 ? 'md:bg-amber-50/50' : 'md:bg-white'}`}>
            <div className="flex justify-between items-center md:block md:text-center">
              <span className="font-bold md:hidden">레벨</span>
              <span>{row.level}</span>
            </div>
            <div className="flex justify-between items-center md:block md:text-center border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden">국내수준</span>
              <span>{row.nationalLevel}</span>
            </div>
            <div className="flex justify-between items-center md:block md:text-center border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden">미국수준</span>
              <span>{row.usLevel}</span>
            </div>
            <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden mr-2">성취 목표</span>
              <span>{row.achievementTarget}</span>
            </div>
            <div className="flex justify-between items-center md:block md:text-center border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden">어휘</span>
              <span>{row.vocabulary}</span>
            </div>
            <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden mr-2">미교과</span>
              <span>{row.curriculum}</span>
            </div>
            <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden mr-2">문학</span>
              <span>{row.literature}</span>
            </div>
            <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
              <span className="font-bold md:hidden mr-2">비문학</span>
              <span>{row.nonLiterature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementaryRoadmapTableDKtoD3; 