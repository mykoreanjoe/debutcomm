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
  title: "중등과정",
  description: "수능 독해를 직독직해하며, 문법에 필요한 개념을 정리하고 오답을 포트폴리오화하여 내신과 수능 조기에 완성하는것을 목표로 학습 합니다.",
  headers: ["레벨", "학습기간", "성취목표", "입사독해", "수능듣기", "문법", "온라인", "프로젝트"],
  levels: [
    {
      name: "중등 INTER",
      color: "bg-green-200",
      textColor: "text-green-800",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의 3~2등급",
        readingComprehension: "중2~3 수준의 독해, 문제풀이",
        listeningComprehension: "중1~고1 수준 리스닝 문제 풀이",
        grammar: "중등 전과정에 걸친 개념과 문제 풀이",
        online: "매주 2회 고1~고2 수준의 실전 시험 진행(최소모의고사 40회 이상 시행)",
        project: "수행 / 내신 / 수능대비를 위한 \"서술형/Writing\" 집중 연계 프로젝트(학기 1권 완성)"
      }
    },
    {
      name: "중등 INTER⁺",
      color: "bg-green-300",
      textColor: "text-green-900",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의 3~2등급",
        // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "중등 MASTER",
      color: "bg-emerald-300",
      textColor: "text-emerald-900",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "중3 모의 1등급",
         // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "중등 MASTER⁺",
      color: "bg-emerald-400",
      textColor: "text-emerald-900",
      cells: {
        learningPeriod: "3개월",
        achievementTarget: "고1 모의 4~3등급",
         // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "고등 INTER",
      color: "bg-sky-300",
      textColor: "text-sky-900",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고1 모의 3~2등급",
        readingComprehension: "고1~고2 수준의 독해, 문제풀이",
        listeningComprehension: "고2~고3 수준 리스닝 문제 풀이",
        // 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "고등 INTER⁺",
      color: "bg-sky-400",
      textColor: "text-sky-900",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고1 모의 2등급",
        // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "고등 MASTER",
      color: "bg-blue-400",
      textColor: "text-blue-900",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고2 모의 3~2등급",
        // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "고등 MASTER⁺",
      color: "bg-blue-500",
      textColor: "text-blue-900",
      cells: {
        learningPeriod: "6개월",
        achievementTarget: "고2 모의 2등급+",
        // 입사독해, 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
    {
      name: "수능 ONE",
      color: "bg-purple-400",
      textColor: "text-purple-900",
      cells: {
        learningPeriod: "최소 6개월",
        achievementTarget: "고3 모의 2등급+",
        readingComprehension: "고3 완성", // 입사독해 대신 표시
        // 수능듣기, 문법, 온라인, 프로젝트는 INTER과 동일 (colspan 처리)
      }
    },
  ]
};

const MiddleSchoolCourseDetailsTable = () => {
  return (
    <section className="my-12 p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-3">
        {courseDetailsData.title}
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm md:text-base max-w-2xl mx-auto">
        {courseDetailsData.description}
      </p>
      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse border border-gray-300 text-xs md:text-sm">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {courseDetailsData.headers.map((header, index) => (
                <TableHead key={index} className="p-2 md:p-3 border border-gray-300 font-semibold text-gray-700 text-center">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseDetailsData.levels.map((level, levelIndex) => (
              <TableRow key={levelIndex} className={`${levelIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <TableCell className={`p-2 md:p-3 border border-gray-300 font-semibold text-center ${level.color} ${level.textColor}`}>
                  {level.name}
                </TableCell>
                <TableCell className="p-2 md:p-3 border border-gray-300 text-center">{level.cells.learningPeriod}</TableCell>
                <TableCell className="p-2 md:p-3 border border-gray-300 text-center">{level.cells.achievementTarget}</TableCell>
                
                {/* 입사독해: 수능 ONE 레벨만 다름 */} 
                {level.name === "수능 ONE" ? (
                  <TableCell className="p-2 md:p-3 border border-gray-300 text-center" colSpan={levelIndex < 4 ? 1 : 1 }>{level.cells.readingComprehension}</TableCell>
                ) : (
                  levelIndex < 1 || level.cells.readingComprehension ? (
                    <TableCell className="p-2 md:p-3 border border-gray-300 text-center" rowSpan={levelIndex === 0 ? 4 : (levelIndex === 4 ? 4 : (levelIndex === 8 ? 1: 1)) }>
                      {level.cells.readingComprehension}
                    </TableCell>
                  ) : null
                )}

                {/* 수능듣기: 중등과 고등이 다름, 수능 ONE은 고등과 동일 */} 
                {levelIndex < 1 || (levelIndex === 4 && level.cells.listeningComprehension) || (levelIndex === 8 && courseDetailsData.levels[4].cells.listeningComprehension) ? (
                  <TableCell className="p-2 md:p-3 border border-gray-300 text-center" rowSpan={levelIndex === 0 ? 4 : (levelIndex === 4 ? 4 : (levelIndex === 8 ? 1: 1)) }>
                    {level.name === "수능 ONE" ? courseDetailsData.levels[4].cells.listeningComprehension : level.cells.listeningComprehension}
                  </TableCell>
                ) : null}

                {/* 문법, 온라인, 프로젝트: 모든 레벨에서 첫번째 값으로 통일 (중등 INTER 값) */} 
                {levelIndex === 0 ? (
                  <>
                    <TableCell className="p-2 md:p-3 border border-gray-300 text-center" rowSpan={courseDetailsData.levels.length}>{courseDetailsData.levels[0].cells.grammar}</TableCell>
                    <TableCell className="p-2 md:p-3 border border-gray-300 text-center" rowSpan={courseDetailsData.levels.length}>{courseDetailsData.levels[0].cells.online}</TableCell>
                    <TableCell className="p-2 md:p-3 border border-gray-300 text-center" rowSpan={courseDetailsData.levels.length}>{courseDetailsData.levels[0].cells.project}</TableCell>
                  </>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MiddleSchoolCourseDetailsTable; 