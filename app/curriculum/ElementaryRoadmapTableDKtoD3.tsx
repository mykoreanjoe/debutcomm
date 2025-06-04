import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const roadmapDataDKtoD3 = [
  { level: 'DK, DK*', nationalLevel: '초3', usLevel: 'PK', achievementTarget: '파닉스 마스터', vocabulary: '400+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '파닉스', nonLiterature: '' },
  { level: 'D1, D1*', nationalLevel: '초4~5', usLevel: 'G1', achievementTarget: '토셀 Starter 3~2급', vocabulary: '640+', curriculum: '', literature: '다양한 문학 시리즈 (ORT, Biscuit, Little Critter 등)', nonLiterature: '' },
  { level: 'D2, D2*', nationalLevel: '초5~6', usLevel: 'G2', achievementTarget: '토셀 Basic 3~2급', vocabulary: '800+', curriculum: '', literature: '', nonLiterature: 'Oxford Read and Discover 외 다양한 분야의 컨텐츠 (역사, 문화, 과학, 지리)' },
  { level: 'D3, D3*', nationalLevel: '초6~중1', usLevel: 'G3', achievementTarget: '토셀 Basic 2~1급', vocabulary: '800+', curriculum: '', literature: '', nonLiterature: '' },
];

const ElementaryRoadmapTableDKtoD3 = () => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-10">
      <h3 className="text-2xl font-semibold text-amber-600 mb-6 text-center">
        초등부 로드맵 (DK ~ D3*)
      </h3>
      <Table>
        <TableCaption className="mt-4">초등부 학습 과정 로드맵 (DK ~ D3*)입니다. 각 레벨별 목표와 내용을 확인하세요.</TableCaption>
        <TableHeader>
          <TableRow className="bg-amber-50">
            <TableHead className="w-[80px] text-center font-semibold text-amber-700 border">레벨</TableHead>
            <TableHead className="w-[70px] text-center font-semibold text-amber-700 border">국내수준</TableHead>
            <TableHead className="w-[60px] text-center font-semibold text-amber-700 border">미국수준</TableHead>
            <TableHead className="w-[180px] text-center font-semibold text-amber-700 border">성취 목표</TableHead>
            <TableHead className="w-[60px] text-center font-semibold text-amber-700 border">어휘</TableHead>
            <TableHead className="w-[150px] text-center font-semibold text-amber-700 border">미교과</TableHead>
            <TableHead className="w-[180px] text-center font-semibold text-amber-700 border">문학</TableHead>
            <TableHead className="w-[200px] text-center font-semibold text-amber-700 border">비문학</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roadmapDataDKtoD3.map((row, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}>
              <TableCell className="font-medium text-center border px-2 py-3 text-xs align-top">{row.level}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.nationalLevel}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.usLevel}</TableCell>
              <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{row.achievementTarget}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.vocabulary}</TableCell>
              
              {index === 0 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={roadmapDataDKtoD3.length}>{roadmapDataDKtoD3[0].curriculum}</TableCell>}
              
              {index === 0 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={1}>{row.literature}</TableCell>}
              {index === 1 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={1}>{row.literature}</TableCell>}
              {index > 1 && <TableCell className="border px-2 py-3 text-xs align-top"></TableCell>}

              {index < 2 && <TableCell className="border px-2 py-3 text-xs align-top"></TableCell>}
              {index === 2 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={roadmapDataDKtoD3.length - 2}>{row.nonLiterature}</TableCell>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-sm text-gray-500 mt-4 text-center">
        위 로드맵은 학습 방향을 안내하며, 학생의 레벨과 상황에 따라 맞춤 조절될 수 있습니다.
      </p>
    </div>
  );
};

export default ElementaryRoadmapTableDKtoD3; 