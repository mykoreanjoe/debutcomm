import React from 'react';

interface Course {
  id: string;
  length: string;
  color?: string; // color 속성을 옵셔널로 변경
}

interface Level {
  name: string;
  duration: string;
  yearMark: boolean;
  courses: Course[];
}

const levels: Level[] = [ // 타입 적용
  { name: 'PK', duration: '', yearMark: true, courses: [{ id: 'DK', length: '3m' }, { id: 'DK*', length: '3m' }] },
  { name: 'G1', duration: '', yearMark: false, courses: [{ id: 'D1', length: '3m' }, { id: 'D1*', length: '3m' }] },
  { name: 'G2', duration: '1년 과정', yearMark: true, courses: [{ id: 'D2', length: '3m' }, { id: 'D2*', length: '3m' }] },
  { name: 'G3', duration: '', yearMark: false, courses: [{ id: 'D3', length: '3m' }, { id: 'D3*', length: '3m' }] },
  { name: 'G4', duration: '1년 과정', yearMark: true, courses: [{ id: 'D4', length: '3m' }, { id: 'D4*', length: '3m' }] },
  { name: 'G5', duration: '', yearMark: false, courses: [{ id: 'D5', length: '3m' }, { id: 'D5*', length: '3m' }] },
  { name: 'G6', duration: '1년 과정', yearMark: true, courses: [{ id: 'D6', length: '3m' }, { id: 'D6*', length: '3m' }] },
  { name: 'G7', duration: '', yearMark: false, courses: [{ id: 'D7', length: '3m' }, { id: 'D7*', length: '3m' }] },
  { name: 'G7+', duration: '1년 과정', yearMark: true, courses: [{ id: 'D Elite', length: '6m', color: 'bg-purple-600' }, { id: 'D Creator', length: '6m', color: 'bg-purple-800' }] },
];

// 각 레벨에 대한 색상 정의 (이미지 기반)
const levelColors: { [key: string]: string } = {
  'DK': 'bg-yellow-400', 'DK*': 'bg-yellow-400',
  'D1': 'bg-green-400', 'D1*': 'bg-green-400',
  'D2': 'bg-orange-400', 'D2*': 'bg-orange-400',
  'D3': 'bg-red-400', 'D3*': 'bg-red-400',
  'D4': 'bg-pink-500', 'D4*': 'bg-pink-500',
  'D5': 'bg-rose-500', 'D5*': 'bg-rose-500',
  'D6': 'bg-amber-700', 'D6*': 'bg-amber-700',
  'D7': 'bg-stone-700', 'D7*': 'bg-stone-700',
  'D Elite': 'bg-purple-600', 
  'D Creator': 'bg-purple-800', 
};


const ElementaryLevelChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
      <h3 className="text-2xl font-semibold text-lime-600 mb-8 text-center">
        초등부 레벨 차트
      </h3>
      <div className="relative overflow-x-auto">
        <div className="flex items-end min-w-max pb-12">
          <div className="flex flex-col justify-end space-y-1 mr-4 text-sm text-gray-600 pr-2 border-r">
            {levels.slice().reverse().map(level => (
              <div key={level.name} className="h-10 flex items-center ">{level.name}</div>
            ))}
          </div>

          <div className="flex-grow grid grid-cols-5 gap-x-1" style={{ gridTemplateRows: `repeat(${levels.length}, minmax(0, 1fr))` }}>
            {levels.slice().reverse().map((level, levelIndex) => (
              <React.Fragment key={level.name}>
                {level.courses.map((course) => {
                  let colStart = 1; 
                  if (level.name === 'PK' || level.name === 'G1') colStart = 1;
                  else if (level.name === 'G2' || level.name === 'G3') colStart = 2;
                  else if (level.name === 'G4' || level.name === 'G5') colStart = 3;
                  else if (level.name === 'G6' || (level.name === 'G7' && !level.name.includes('+'))) colStart = 4;
                  else if (level.name.includes('G7+')) colStart = 5;
                  
                  if (course.id === 'D Elite' || course.id === 'D Creator') colStart = 5;

                  const bgColor = course.color || levelColors[course.id] || 'bg-gray-400';
                  
                  return (
                    <div
                      key={course.id}
                      className={`h-10 ${bgColor} text-white text-xs font-semibold flex flex-col items-center justify-center p-1 rounded shadow whitespace-nowrap`}
                      style={{ 
                        gridColumnStart: colStart, 
                        gridRowStart: levelIndex + 1, 
                      }}
                    >
                      <span>{course.id}</span>
                      <span>{course.length}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-x-1 mt-2 border-t pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-center text-sm text-gray-700 font-medium">
              1년 과정
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        탄탄한 어학 기본기를 쌓으며, 다양한 프로젝트로 창의적인 학습역량을 마스터합니다.
      </p>
    </div>
  );
};

export default ElementaryLevelChart; 