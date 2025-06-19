import React from 'react';

interface Course {
  id: string;
  length: string;
  color?: string; // TailwindCSS class or Hex
  textColor?: string; // TailwindCSS class or Hex for text
  colSpan?: number;
  rowSpan?: number;
  gridColStart?: number;
  gridRowStart?: number;
}

interface LevelYAxis {
  name: string;
  rowStart: number; // Y축 레이블에 해당하는 그리드 행 시작 번호 명시
}

// Y축 레이블 및 그리드 행 번호 매핑 (이미지 기준, G7*가 가장 위)
const yAxisLabels: LevelYAxis[] = [
  { name: 'G7*', rowStart: 1 }, 
  { name: 'G7', rowStart: 2 }, 
  { name: 'G6', rowStart: 3 }, 
  { name: 'G5', rowStart: 4 }, 
  { name: 'G4', rowStart: 5 }, 
  { name: 'G3', rowStart: 6 }, 
  { name: 'G2', rowStart: 7 }, 
  { name: 'G1', rowStart: 8 }, 
  { name: 'PK', rowStart: 9 },
];

// 이미지에 맞게 데이터 재조정 (색상, 위치 등)
// X축 컬럼은 1년 과정을 하나의 그룹으로 보고, 각 그룹 내에서 2개의 레벨(기본, *)을 배치
const chartCourses: Course[] = [
  // 1년차 (컬럼 1-2)
  { id: 'DK', length: '3m', gridRowStart: 9, gridColStart: 1, color: '#FBBF24', textColor: '#78350F' }, // PK 레벨, 1번째 컬럼
  { id: 'DK*', length: '3m', gridRowStart: 9, gridColStart: 2, color: '#FBBF24', textColor: '#78350F' },// PK 레벨, 2번째 컬럼
  { id: 'D1', length: '3m', gridRowStart: 8, gridColStart: 2, color: '#A3E635', textColor: '#3F6212' },   // G1 레벨, 2번째 컬럼
  { id: 'D1*', length: '3m', gridRowStart: 8, gridColStart: 3, color: '#A3E635', textColor: '#3F6212' }, // G1 레벨, 3번째 컬럼
  // 2년차 (컬럼 3-4)
  { id: 'D2', length: '3m', gridRowStart: 7, gridColStart: 3, color: '#FB923C', textColor: '#FFFFFF' },   // G2 레벨, 3번째 컬럼
  { id: 'D2*', length: '3m', gridRowStart: 7, gridColStart: 4, color: '#FB923C', textColor: '#FFFFFF' }, // G2 레벨, 4번째 컬럼
  // 3년차 (컬럼 5-6)
  { id: 'D3', length: '3m', gridRowStart: 6, gridColStart: 5, color: '#F87171', textColor: '#FFFFFF' },   // G3 레벨, 5번째 컬럼
  { id: 'D3*', length: '3m', gridRowStart: 6, gridColStart: 6, color: '#F87171', textColor: '#FFFFFF' }, // G3 레벨, 6번째 컬럼
  // 4년차 (컬럼 7-8)
  { id: 'D4', length: '3m', gridRowStart: 5, gridColStart: 7, color: '#EC4899', textColor: '#FFFFFF' },   // G4 레벨, 7번째 컬럼
  { id: 'D4*', length: '3m', gridRowStart: 5, gridColStart: 8, color: '#EC4899', textColor: '#FFFFFF' }, // G4 레벨, 8번째 컬럼
  // 5년차 (컬럼 9-10)
  { id: 'D5', length: '3m', gridRowStart: 4, gridColStart: 9, color: '#EF4444', textColor: '#FFFFFF' },   // G5 레벨, 9번째 컬럼
  { id: 'D5*', length: '3m', gridRowStart: 4, gridColStart: 10, color: '#EF4444', textColor: '#FFFFFF' },// G5 레벨, 10번째 컬럼
  { id: 'D6', length: '3m', gridRowStart: 3, gridColStart: 10, color: '#6B7280', textColor: '#FFFFFF' },  // G6 레벨, 10번째 컬럼
  { id: 'D6*', length: '3m', gridRowStart: 3, gridColStart: 11, color: '#6B7280', textColor: '#FFFFFF' },// G6 레벨, 11번째 컬럼
  // 6년차 (컬럼 11-12) - D7은 D6* 바로 위, 11번째 컬럼부터 시작한다고 가정 (이미지상 D Elite/Creator와 겹치므로 조정)
  { id: 'D7', length: '3m', gridRowStart: 2, gridColStart: 11, color: '#4B5563', textColor: '#FFFFFF' },  // G7 레벨, 11번째 컬럼
  { id: 'D7*', length: '3m', gridRowStart: 2, gridColStart: 12, color: '#4B5563', textColor: '#FFFFFF' },// G7 레벨, 12번째 컬럼
  // 최상위 레벨 (컬럼 12-13) - D Elite/Creator는 D7* 바로 위, 12번째 컬럼부터 시작한다고 가정
  { id: 'D Elite', length: '6m', gridRowStart: 1, gridColStart: 12, color: '#8B5CF6', textColor: '#FFFFFF' }, // G7* 레벨, 12번째 컬럼
  { id: 'D Creator', length: '6m', gridRowStart: 1, gridColStart: 13, color: '#5B21B6', textColor: '#FFFFFF' },// G7* 레벨, 13번째 컬럼
];

const ElementaryLevelChart = () => {
  const totalGridCols = Math.max(...chartCourses.map(c => (c.gridColStart || 0) + (c.colSpan || 1) -1 ), 13); // 총 컬럼 수 동적 계산 (최소 13개로 가정)
  const yearCourseGroups = 5; // "1년 과정" 그룹 수
  const colsPerGroup = 2; // 각 "1년 과정" 그룹당 기본 컬럼 수 (DK, D1* 등 2개씩 차지)
  // D6 이후 레벨들이 차지하는 추가 컬럼 수를 고려하여 가이드라인 및 "1년 과정" 레이블 위치 계산 필요

  return (
    <div className="overflow-x-auto py-2">
      <div className="min-w-[800px]">
        <div className="bg-[#FFFBEB] p-4 md:p-6 rounded-lg shadow-lg mb-10 font-sans">
          <h3 className="text-xl font-bold text-amber-700 mb-1 flex items-center">
            <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm mr-3 whitespace-nowrap">초등부 레벨 차트</span>
            <span className="text-sm text-gray-700 font-normal">탄탄한 어학 기본기를 쌓으며, 다양한 프로젝트로 창의적인 학습역량을 마스터합니다.</span>
          </h3>
          
          <div className="relative mt-6" style={{ paddingBottom: '40px' }}>
            <div className="flex min-w-[${totalGridCols * 32}px]"> {/* 최소 너비 확보 */}
              <div className="flex flex-col justify-between text-xs font-medium text-gray-600 pr-3 space-y-0">
                {yAxisLabels.map(label => (
                  <div key={label.name} className="h-9 flex items-center justify-end flex-shrink-0" style={{ height: '36px' }}>{label.name}</div>
                ))}
                <div className="h-9"></div> {/* X축 레이블 공간 확보용 빈 div */}
              </div>

              <div className="flex-grow relative border-l border-gray-300">
                <div 
                  className="grid gap-px relative"
                  style={{
                    gridTemplateColumns: `repeat(${totalGridCols}, minmax(30px, 1fr))`,
                    gridTemplateRows: `repeat(${yAxisLabels.length}, 36px)`,
                    // width: `${totalGridCols * 32}px` // 너비는 부모에서 overflow-x-auto로 관리
                  }}
                >
                  {/* X축 가이드라인: 2컬럼(1년 과정)마다 생성. D6 이후 구조가 달라지므로, 처음 5개년은 규칙적으로, 이후는 추가로 그려야 할 수 있음 */}
                  {[...Array(yearCourseGroups)].map((_, i) => (
                    <div key={`guide-${i}`} className="absolute top-0 bottom-0 border-r border-dashed border-gray-300 z-0"
                         style={{ left: `${(i + 1) * colsPerGroup * 32}px`, height: `${yAxisLabels.length * 36}px` }}></div>
                  ))}
                  
                  {chartCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`text-white text-[10px] font-semibold flex flex-col items-center justify-center p-0.5 rounded-sm shadow leading-tight z-10`}
                      style={{
                        backgroundColor: course.color,
                        color: course.textColor,
                        gridColumnStart: course.gridColStart,
                        gridColumnEnd: `span ${course.colSpan || 1}`,
                        gridRowStart: course.gridRowStart,
                        minHeight: '32px', 
                      }}
                    >
                      <span>{course.id}</span>
                      <span>{course.length}</span>
                    </div>
                  ))}
                </div>
                {/* "1년 과정" X축 레이블 */}
                <div className="grid absolute bottom-[-30px] left-0 right-0 pr-3 h-9 items-center"
                     style={{ gridTemplateColumns: `repeat(${totalGridCols}, minmax(30px, 1fr))` }}>
                  {[...Array(yearCourseGroups)].map((_, i) => (
                    <div key={`year-${i}`} 
                         className="col-span-2 text-center text-xs text-amber-700 font-medium border-t-2 border-amber-600 pt-1 whitespace-nowrap"
                         style={{ gridColumnStart: i * colsPerGroup + 1 }}>
                      1년 과정
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementaryLevelChart; 