import React from 'react';

const usCurriculumText = '미국 교과 과정 (각 레벨별 사고 과정 진행)';
const nonLiteratureText = 'Oxford Read and Discover 외 다양한 분야의 컨텐츠 (역사, 문화, 과학, 지리)';
const grammarText = '초등 영문법 777 및 국내 ELT 문법 교재 사용';

const roadmapDataD4toDCreator = [
    { level: 'D4, D4*', nationalLevel: '중1 ~ 중2', usLevel: 'G4', achievementTarget: '토셀 Junior 4~3급', vocabulary: '800+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
    { level: 'D5, D5*', nationalLevel: '중2 ~ 중3', usLevel: 'G5', achievementTarget: '토셀 Junior 3~2급', vocabulary: '800+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
    { level: 'D6, D6*', nationalLevel: '중3 ~ 고1', usLevel: 'G6', achievementTarget: '토셀 Junior 2~1급', vocabulary: '800+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
    { level: 'D7, D7*', nationalLevel: '고1 ~ 고2', usLevel: 'G6+', achievementTarget: '토셀 High Junior 3~2급', vocabulary: '1,000+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
    { level: 'D ELITE', nationalLevel: '고2 심화', usLevel: 'G7+', achievementTarget: '토셀 Junior, 수능 모의고사 3등급 이상', vocabulary: '1,000+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
    { level: 'D CREATOR', nationalLevel: '수준 이상', usLevel: 'G7+', achievementTarget: '토셀 Junior, 수능 모의고사 3등급 이상', vocabulary: '1,000+', usCurriculum: usCurriculumText, nonLiterature: nonLiteratureText, grammar: grammarText },
];

const headers = ['레벨', '국내수준', '미국수준', '성취 목표', '어휘', '미교과', '비문학', '하브루타 문법'];

const ElementaryRoadmapTableD4toDCreator = () => {
    return (
        <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden md:grid md:grid-cols-8 gap-2 bg-purple-100 p-2 rounded-t-lg font-semibold text-purple-700 text-sm text-center">
                {headers.map(h => <div key={h}>{h}</div>)}
            </div>
             {/* Mobile Cards / Desktop Rows */}
            <div className="space-y-4 md:space-y-0">
                {roadmapDataD4toDCreator.map((row, index) => (
                    <div key={index} className={`p-4 bg-white rounded-lg shadow-sm border md:border-t-0 md:rounded-none md:shadow-none md:grid md:grid-cols-8 md:gap-2 md:items-center text-sm ${index % 2 !== 0 ? 'md:bg-purple-50/50' : 'md:bg-white'}`}>
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
                             <span>{row.usCurriculum}</span>
                        </div>
                        <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
                            <span className="font-bold md:hidden mr-2">비문학</span>
                            <span>{row.nonLiterature}</span>
                        </div>
                        <div className="flex justify-between items-start md:block md:text-left border-t md:border-none pt-2 mt-2 md:pt-0 md:mt-0">
                            <span className="font-bold md:hidden mr-2">하브루타 문법</span>
                             <span>{row.grammar}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ElementaryRoadmapTableD4toDCreator; 