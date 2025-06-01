import React from 'react';

interface LevelBlockProps {
  // grade: string; // 사용되지 않으므로 제거
  level: string;
  duration?: string;
  color: string;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
  customClasses?: string;
}

const LevelBlock: React.FC<LevelBlockProps> = ({
  // grade, // 사용되지 않으므로 제거
  level,
  duration,
  color,
  colSpan = 1,
  rowSpan = 1,
  colStart,
  rowStart,
  customClasses = '',
}) => {
  const style: React.CSSProperties = {
    backgroundColor: color,
    gridColumn: colStart ? `span ${colSpan} / span ${colSpan}` : undefined,
    gridRow: rowStart ? `span ${rowSpan} / span ${rowSpan}` : undefined,
    gridColumnStart: colStart,
    gridRowStart: rowStart,
  };

  return (
    <div
      style={style}
      className={`p-3 rounded-md text-white flex flex-col items-center justify-center text-center shadow-md ${customClasses}`}
    >
      <div className="font-semibold text-sm md:text-base">{level}</div>
      {duration && <div className="text-xs md:text-sm">{duration}</div>}
    </div>
  );
};

const MiddleSchoolLevelChart = () => {
  const levels: LevelBlockProps[] = [
    // 중3 - 완성 (row 1)
    { /* grade: '중3-완성', */ level: '중등 Inter', duration: '3m', color: '#84a98c', rowStart: 5, colStart: 2 },
    { /* grade: '중3-완성', */ level: '중등 Inter⁺', duration: '3m', color: '#84a98c', rowStart: 5, colStart: 3 },
    { /* grade: '중3-완성', */ level: '중등 Master', duration: '3m', color: '#6a994e', rowStart: 4, colStart: 4 },
    { /* grade: '중3-완성', */ level: '중등 Master⁺', duration: '3m', color: '#6a994e', rowStart: 4, colStart: 5 },
    // 고1 (row 2)
    { /* grade: '고1', */ level: '고등 Inter', duration: '6m', color: '#34a0a4', rowStart: 3, colStart: 6 },
    { /* grade: '고1', */ level: '고등 Inter⁺', duration: '6m', color: '#168aad', rowStart: 3, colStart: 7 },
    // 고2 (row 3)
    { /* grade: '고2', */ level: '고등 Master', duration: '6m', color: '#1a759f', rowStart: 2, colStart: 8 },
    { /* grade: '고2', */ level: '고등 Master⁺', duration: '6m', color: '#1a759f', rowStart: 2, colStart: 9 },
    // 고3 (row 4)
    { /* grade: '고3', */ level: '수능 ONE', duration: '6m⁺', color: '#7b2cbf', rowStart: 1, colStart: 10 },
  ];

  const yAxisLabels = ['고3', '고2', '고1', '중3 - 완성', '중3 - 중2'];

  return (
    <section className="my-12 p-6 bg-slate-50 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-3">
        중등부 레벨 차트
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-xl mx-auto">
        시험대비에 필요한 학습 프로젝트로 중등 수행/내신/수능을 조기 마스터합니다.
      </p>
      <div className="relative">
        {/* Y축 레이블 */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around pr-2 text-right text-xs md:text-sm text-gray-500 font-medium" style={{ height: 'calc(100% - 30px)', top: '15px', writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>
          {yAxisLabels.slice().reverse().map((label, index) => (
            <div key={index} className="h-1/5 flex items-center justify-center" style={{writingMode: 'horizontal-tb'}}>
              {label.split(' - ').map(part => <div key={part}>{part}</div>)}
            </div>
          ))}
        </div>

        {/* 차트 그리드 */}
        <div 
            className="grid gap-1 md:gap-2 pl-12 md:pl-16"
            style={{
                gridTemplateColumns: 'repeat(11, minmax(0, 1fr))', // 10개 블록 + 1개 Y축 공간
                gridTemplateRows: 'repeat(5, minmax(60px, auto))', // 5개 학년 행
            }}
        >
          {/* 가이드 라인 (세로) */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`vline-${i}`} className="border-r border-dashed border-gray-300" style={{ gridColumn: `${i + 2} / span 1`, gridRow: '1 / span 5' }}></div>
          ))}
          {/* 가이드 라인 (가로) */}
          {Array.from({ length: 4 }).map((_, i) => (
             <div key={`hline-${i}`} className="border-b border-dashed border-gray-300" style={{ gridRow: `${i + 1} / span 1`, gridColumn: '2 / span 10' }}></div>
          ))}
          
          {levels.map((levelProps, index) => (
            <LevelBlock key={index} {...levelProps} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiddleSchoolLevelChart; 