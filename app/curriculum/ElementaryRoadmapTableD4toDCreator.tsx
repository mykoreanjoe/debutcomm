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
  { level: 'D4, D4*', nationalLevel: '중1 ~ 중2', usLevel: 'G4', achievementTarget: '토셀 Junior 4~3급', vocabulary: '800+', curriculum: '미국 교과과정 (각 레벨 별 사고 과정 진행)', literature: '', nonLiterature: '', hebrewLiterature: '하브루타 문법 및 해설' },
  { level: 'D5, D5*', nationalLevel: '중2 ~ 중3', usLevel: 'G5', achievementTarget: '토셀 Junior 3~2급', vocabulary: '800+', curriculum: '', literature: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D6, D6*', nationalLevel: '중3 ~ 고1', usLevel: 'G6', achievementTarget: '토셀 Junior 2~1급', vocabulary: '800+', curriculum: '', literature: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D7, D7*', nationalLevel: '고1 ~ 고2', usLevel: 'G6+', achievementTarget: '토셀 High Junior 3~2급', vocabulary: '1,000+', curriculum: '', literature: '', nonLiterature: '', hebrewLiterature: '' },
  { level: 'D ELITE', nationalLevel: '고2 심화', usLevel: 'G7+', achievementTarget: '토플 Junior 수능 모의고사 3등급 이상', vocabulary: '1,000+', curriculum: '반복표에 따른 개별화', literature: '반복표에 따른 개별화', nonLiterature: '반복표에 따른 개별화', hebrewLiterature: '' },
  { level: 'D CREATOR', nationalLevel: '수준 이상', usLevel: 'G7+', achievementTarget: '토플 Junior 수능 모의고사 3등급 이상', vocabulary: '1,000+', curriculum: '반복표에 따른 개별화', literature: '반복표에 따른 개별화', nonLiterature: '반복표에 따른 개별화', hebrewLiterature: '' },
];

const ElementaryRoadmapTableD4toDCreator = () => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-10">
      <h3 className="text-2xl font-semibold text-amber-600 mb-6 text-center">
        초등부 로드맵 (D4 ~ D CREATOR)
      </h3>
      <Table>
        <TableCaption className="mt-4">초등부 학습 과정 로드맵 (D4 ~ D CREATOR)입니다. 각 레벨별 목표와 내용을 확인하세요.</TableCaption>
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
            <TableHead className="w-[150px] text-center font-semibold text-amber-700 border">하브루타 문법</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{roadmapDataD4toDCreator.map((row, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}>
              <TableCell className="font-medium text-center border px-2 py-3 text-xs align-top">{row.level}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.nationalLevel}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.usLevel}</TableCell>
              <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{row.achievementTarget}</TableCell>
              <TableCell className="text-center border px-2 py-3 text-xs align-top">{row.vocabulary}</TableCell>
              
              {/* 교과 (미교과) */}
              {index < 4 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{index === 0 ? roadmapDataD4toDCreator[0].curriculum : ''}</TableCell> } 
              {index === 0 && roadmapDataD4toDCreator.length > 4 && <TableCell style={{display:'none'}} rowSpan={4}></TableCell>} {/* 로우 스팬용 숨김 셀 (D4~D7)*/}
              {index >= 4 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{row.curriculum}</TableCell>} {/* D ELITE, D CREATOR */}
              
              {/* 문학 - D ELITE, D CREATOR는 개별 표시 */}
              {index < 4 && <TableCell className="border px-2 py-3 text-xs align-top"></TableCell>}
              {index >= 4 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{row.literature}</TableCell>}
              
              {/* 비문학 - D ELITE, D CREATOR는 개별 표시 */}
              {index < 4 && <TableCell className="border px-2 py-3 text-xs align-top"></TableCell>}
              {index >= 4 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal">{row.nonLiterature}</TableCell>}
              
              {/* 하브루타 문법 - D4~D7까지 병합 */}
              {index === 0 && <TableCell className="border px-2 py-3 text-xs align-top whitespace-normal" rowSpan={4}>{roadmapDataD4toDCreator[0].hebrewLiterature}</TableCell>}
              {index >= 4 && <TableCell className="border px-2 py-3 text-xs align-top"></TableCell>}

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