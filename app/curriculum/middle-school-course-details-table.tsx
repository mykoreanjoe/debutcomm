import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const courseDetailsData = {
  title: "중등부 로드맵",
  headers: ["레벨", "학습기간", "성취목표", "입시독해", "수능듣기", "문법"],
  levels: [
    {
      name: "중등 INTER",
      color: "bg-green-500",
      textColor: "text-white",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의\n3~2등급",
        readingComprehension: "중2~3 수준의 독해, 문제풀이",
        listeningComprehension: "중1~고1 수준 리스닝 문제 풀이",
        grammar: "중등 전과정에 걸친 개념과 문제 풀이",
      }
    },
    {
      name: "중등 INTER⁺",
      color: "bg-green-600",
      textColor: "text-white",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의\n3~2등급",
      }
    },
    {
      name: "중등 MASTER",
      color: "bg-teal-500",
      textColor: "text-white",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의\n1등급",
      }
    },
    {
      name: "중등 MASTER⁺",
      color: "bg-teal-600",
      textColor: "text-white",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "고1 모의\n4~3등급",
      }
    },
    {
      name: "고등 INTER",
      color: "bg-sky-500",
      textColor: "text-white",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고1 모의\n3~2등급",
        readingComprehension: "고1~고2 수준의 독해, 문제풀이",
        listeningComprehension: "고2~고3 수준 리스닝 문제 풀이",
      }
    },
    {
      name: "고등 INTER⁺",
      color: "bg-sky-600",
      textColor: "text-white",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고1 모의\n2등급",
      }
    },
    {
      name: "고등 MASTER",
      color: "bg-blue-500",
      textColor: "text-white",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고2 모의\n3~2등급",
      }
    },
    {
      name: "고등 MASTER⁺",
      color: "bg-blue-600",
      textColor: "text-white",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고2 모의\n2등급+",
      }
    },
    {
      name: "수능 ONE",
      color: "bg-purple-600",
      textColor: "text-white",
      cells: {
        learningPeriod: "최소 6개월",
        achievementTarget: "고3 모의\n2등급+",
        readingComprehension: "고3\n완성",
        listeningComprehension: "",
        grammar: "고3\n완성",
      }
    },
  ]
};

const MiddleSchoolCourseDetailsTable = () => {
  return (
    <section className="my-12 p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="bg-green-700 p-3 rounded-t-md mb-0">
        <h2 className="text-xl md:text-2xl font-bold text-center text-white">
          {courseDetailsData.title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse border border-gray-300 text-xs md:text-sm">
          <TableHeader className="bg-gray-200">
            <TableRow>
              {courseDetailsData.headers.map((header, index) => (
                <TableHead 
                  key={index} 
                  className={`p-2 md:p-3 border border-gray-400 font-semibold text-gray-700 text-center whitespace-nowrap 
                    ${header === '레벨' ? 'w-[100px]' : ''}
                    ${header === '학습기간' ? 'w-[80px]' : ''}
                    ${header === '성취목표' ? 'w-[120px]' : ''}
                    ${header === '입시독해' ? 'w-[200px]' : ''}
                    ${header === '수능듣기' ? 'w-[200px]' : ''}
                    ${header === '문법' ? 'w-[200px]' : ''}
                  `}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseDetailsData.levels.map((level, levelIndex) => (
              <TableRow key={levelIndex} className={`${levelIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <TableCell 
                  className={`p-1 md:p-2 border border-gray-400 font-semibold text-center whitespace-nowrap ${level.color} ${level.textColor}`}
                >
                  {level.name}
                </TableCell>
                <TableCell className="p-1 md:p-2 border border-gray-400 text-center whitespace-pre-line">
                  {level.cells.learningPeriod}
                </TableCell>
                <TableCell className="p-1 md:p-2 border border-gray-400 text-center whitespace-pre-line">
                  {level.cells.achievementTarget}
                </TableCell>
                
                {/* 입시독해 */}
                {levelIndex === 0 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line" rowSpan={4}>
                    {courseDetailsData.levels[0].cells.readingComprehension}
                  </TableCell>
                )}
                {levelIndex === 4 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line" rowSpan={4}>
                    {courseDetailsData.levels[4].cells.readingComprehension}
                  </TableCell>
                )}
                {levelIndex === 8 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line">
                    {courseDetailsData.levels[8].cells.readingComprehension}
                  </TableCell>
                )}

                {/* 수능듣기 */}
                {levelIndex === 0 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line" rowSpan={3}>
                    {courseDetailsData.levels[0].cells.listeningComprehension}
                  </TableCell>
                )}
                {levelIndex === 3 && ( // 중등 MASTER+ (비어있음)
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle" rowSpan={1}></TableCell>
                )}
                {levelIndex === 4 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line" rowSpan={3}>
                    {courseDetailsData.levels[4].cells.listeningComprehension}
                  </TableCell>
                )}
                 {levelIndex === 7 && ( // 고등 MASTER+ (비어있음)
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle" rowSpan={1}></TableCell>
                )}
                {levelIndex === 8 && ( // 수능 ONE (비어있음)
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line">
                    {courseDetailsData.levels[8].cells.listeningComprehension || ''}
                  </TableCell>
                )}

                {/* 문법 */}
                {levelIndex === 0 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line" rowSpan={8}>
                    {courseDetailsData.levels[0].cells.grammar}
                  </TableCell>
                )}
                {levelIndex === 8 && (
                  <TableCell className="p-1 md:p-2 border border-gray-400 text-center align-middle whitespace-pre-line">
                    {courseDetailsData.levels[8].cells.grammar}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MiddleSchoolCourseDetailsTable; 