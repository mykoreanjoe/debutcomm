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

const roadmapDataD4toDCreator = [
  { level: 'D4, D4*', nationalLevel: '중1 ~ 중2', usLevel: 'G4', achievementTarget: '토셀 Junior 4~3급', vocabulary: '800+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', nonLiterature: 'Oxford Read and Discover 외 다양한 분야의 컨텐츠 (역사, 문화, 과학, 지리)', hebrewLiterature: '초등영문법777 및 국내 ELT 문법 시리즈 사용' },
  { level: 'D5, D5*', nationalLevel: '중2 ~ 중3', usLevel: 'G5', achievementTarget: '토셀 Junior 3~2급', vocabulary: '800+', curriculum: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D6, D6*', nationalLevel: '중3 ~ 고1', usLevel: 'G6', achievementTarget: '토셀 Junior 2~1급', vocabulary: '800+', curriculum: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D7, D7*', nationalLevel: '고1 ~ 고2', usLevel: 'G6+', achievementTarget: '토셀 High Junior 3~2급', vocabulary: '1,000+', curriculum: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D ELITE', nationalLevel: '고2 심화', usLevel: 'G7+', achievementTarget: '토플 Junior 수능 모의고사 3등급 이상', vocabulary: '1,000+', curriculum: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D CREATOR', nationalLevel: '수준 이상', usLevel: 'G7+', achievementTarget: '토플 Junior 수능 모의고사 3등급 이상', vocabulary: '1,000+', curriculum: '', nonLiterature: '', hebrewLiterature: '' },
];

const ElementaryRoadmapTableD4toDCreator = () => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-10">
      <h3 className="text-2xl font-semibold text-amber-600 mb-6 text-center">
        초등부 로드맵 (D4 ~ D CREATOR)
      </h3>
      <Table>
        <TableCaption className="mt-4 text-center">초등부 학습 과정 로드맵 (D4 ~ D CREATOR)입니다. 각 레벨별 목표와 내용을 확인하세요.</TableCaption>
        <TableHeader>
          <TableRow className="bg-amber-50">
            <TableHead className="w-[80px] text-center font-semibold text-amber-700 border">레벨</TableHead>
            <TableHead className="w-[70px] text-center font-semibold text-amber-700 border">국내수준</TableHead>
            <TableHead className="w-[60px] text-center font-semibold text-amber-700 border">미국수준</TableHead>
            <TableHead className="w-[180px] text-center font-semibold text-amber-700 border">성취 목표</TableHead>
            <TableHead className="w-[60px] text-center font-semibold text-amber-700 border">어휘</TableHead>
            <TableHead className="w-[150px] text-center font-semibold text-amber-700 border">미교과</TableHead>
            <TableHead className="w-[200px] text-center font-semibold text-amber-700 border">비문학</TableHead>
            <TableHead className="w-[150px] text-center font-semibold text-amber-700 border">하브루타 문법</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{roadmapDataD4toDCreator.map((row, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}>
              <TableCell className="font-medium text-center border px-2 py-3 text-xs align-top">{row.level}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.nationalLevel}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.usLevel}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal">{row.achievementTarget}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.vocabulary}</TableCell>
              
              {/* 미교과 */}
              {index === 0 && <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={4}>{roadmapDataD4toDCreator[0].curriculum}</TableCell>}
              {index >= 4 && <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal">{row.curriculum}</TableCell>}
              
              {/* 비문학 */}
              {index === 0 && <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={4}>{roadmapDataD4toDCreator[0].nonLiterature}</TableCell>}
              {index >= 4 && <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal">{row.nonLiterature}</TableCell>}
              
              {/* 하브루타 문법 */}
              {index === 0 && <TableCell className="text-center border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={4}>{roadmapDataD4toDCreator[0].hebrewLiterature}</TableCell>}
              {index >= 4 && <TableCell className="text-center border px-2 py-3 text-xs align-top"></TableCell>}

            </TableRow>
          ))}</TableBody>
      </Table>
      <p className="text-sm text-gray-500 mt-4 text-center">
        위 로드맵은 학습 방향을 안내하며, 학생의 레벨과 상황에 따라 맞춤 조절될 수 있습니다.
      </p>
    </div>
  );
};

export default ElementaryRoadmapTableD4toDCreator; 