import React from 'react';

interface LevelBlockProps {
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
      className={`p-2 rounded-md text-white flex flex-col items-center justify-center text-center shadow-md ${customClasses} min-h-[60px]`}
    >
      {level.split(' ').map((part, index) => (
        <div key={index} className={`font-semibold ${index === 0 ? 'text-xs' : 'text-sm md:text-base'}`}>{part}</div>
      ))}
      {duration && <div className="text-xs md:text-sm mt-1">{duration}</div>}
    </div>
  );
};

const yAxisLabels = [
  { label: "고3", row: 1 },
  { label: "고2", row: 2 },
  { label: "고1", row: 3 },
  { label: "중3\n~", subLabel: "완성", row: 4 },
  { label: "중3\n~", subLabel: "중2", row: 5 },
];

const MiddleSchoolLevelChart = () => {
  const levels: LevelBlockProps[] = [
    // 중등
    { level: '중등 Inter', duration: '3m', color: '#90BE6D', rowStart: 5, colStart: 2, colSpan: 1 }, 
    { level: '중등 Inter⁺', duration: '3m', color: '#90BE6D', rowStart: 5, colStart: 3, colSpan: 1 }, 
    { level: '중등 Master', duration: '3m', color: '#43AA8B', rowStart: 4, colStart: 4, colSpan: 1 }, 
    { level: '중등 Master⁺', duration: '3m', color: '#43AA8B', rowStart: 4, colStart: 5, colSpan: 1 }, 
    // 고등
    { level: '고등 Inter', duration: '6m', color: '#277DA1', rowStart: 3, colStart: 6, colSpan: 1 }, 
    { level: '고등 Inter⁺', duration: '6m', color: '#277DA1', rowStart: 3, colStart: 7, colSpan: 1 }, 
    { level: '고등 Master', duration: '6m', color: '#1A5A8B', rowStart: 2, colStart: 8, colSpan: 1 }, 
    { level: '고등 Master⁺', duration: '6m', color: '#1A5A8B', rowStart: 2, colStart: 9, colSpan: 1 }, 
    // 수능
    { level: '수능 ONE', duration: '6m⁺', color: '#5E548E', rowStart: 1, colStart: 10, colSpan: 1 }, 
  ];

  return (
    <section className="my-12 p-4 md:p-6 bg-slate-50 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-3">
        중등부 레벨 차트
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-2xl mx-auto">
        시험대비에 필요한 학습 프로젝트로 중등 수행/내신/수능을 조기 마스터합니다.
      </p>
      <div className="relative min-h-[450px] md:min-h-[500px] w-full overflow-x-auto">
        <div 
            className="grid gap-1 md:gap-2 pl-2 pr-4 md:pl-4 md:pr-8 pb-4 pt-2"
            style={{
                gridTemplateColumns: '60px repeat(10, minmax(60px, 1fr))',
                gridTemplateRows: 'repeat(5, minmax(70px, auto))',
                paddingTop: '10px',
            }}
        >
          {/* Y축 레이블 */}
          {yAxisLabels.map((yLabel, i) => (
            <div 
              key={`yLabel-${i}`} 
              className="flex flex-col items-center justify-center text-center text-xs md:text-sm text-gray-600 font-medium pr-2 whitespace-pre-line"
              style={{ gridColumn: 1, gridRow: yLabel.row }}
            >
              <span>{yLabel.label}</span>
              {yLabel.subLabel && <span className="text-xs">{yLabel.subLabel}</span>}
            </div>
          ))}

          {/* 가로 점선 (행 구분) */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={`hline-${i}`} 
              className="border-b border-dashed border-gray-300 col-start-2 col-span-10"
              style={{ gridRow: `${i + 1} / span 1`, alignSelf: 'end' }}
            ></div>
          ))}
          
          {/* 레벨 블록 */}
          {levels.map((levelProps, index) => (
            <LevelBlock key={index} {...levelProps} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiddleSchoolLevelChart; 