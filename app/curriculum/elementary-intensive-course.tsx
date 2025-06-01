'use client';

import React from 'react';
import {
  BookUser, /* CalendarClock, */ /* Users, */ Landmark, /* CircleDollarSign, */ BookCopy, Zap, TrendingUp, UserCheck, BookHeart, NotebookText, Target, BrainCircuit, Info,
  BookOpenText, MessageCircle, Edit3, ClipboardCheck, Lightbulb, /* Users2, */ Mic2, BookMarked, Award, /* FileText, */ AlertCircle, /* CheckCircle2, */ Layers, Clock, /* BookOpen, */ /* CalendarDays, */ CheckCircle, /* Newspaper, */ /* BarChart2, */ Star, /* Shield, */ /* MessageSquare, */ AlertTriangle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 업데이트된 schedule 구조에 맞춘 타입
interface ScheduleItem {
  type: string;
  time: string;
  duration: string;
}

interface IntensiveCourseInfoProps {
  title: string;
  targetAudience: string;
  mainSubjects: string[];
  textbookInfo: string;
  debutDay: string;
  completionStudy: string;
}

const comparisonData = [
  {
    category: "학습 목표",
    elementary: "영어에 대한 흥미와 기본적인 의사소통 능력 향상",
    middleSchool: "문법적 정확성과 논리적인 글쓰기, 독해력 강화",
  },
  {
    category: "교과 과정",
    elementary: "생활 영어, 기초 독해 및 듣기, 간단한 문장 쓰기",
    middleSchool: "본격적인 문법 학습, 장문 독해, 작문 및 서술형 문제",
  },
  {
    category: "어휘 수준",
    elementary: "기본적인 생활 어휘 중심 (약 1,000~2,000단어)",
    middleSchool: "학습 중심 어휘, 교과서 단어 확장 (약 3,000~5,000단어)",
  },
  {
    category: "문장 구조",
    elementary: "단순한 문장 위주 (주어+동사+목적어)",
    middleSchool: "복잡한 문장 구조 (접속사, 관계대명사, 부사절 활용)",
  },
  {
    category: "문법 난이도",
    elementary: "기본적인 시제, 인칭대명사, be동사, 일반동사 활용",
    middleSchool: "12시제, 조동사, 관계대명사, 수동태, 분사구문, 가정법 등 심화된 문법 개념",
  },
  {
    category: "읽기/독해",
    elementary: "짧은 문장과 단순한 이야기 중심",
    middleSchool: "지문 길이가 길어지고 논리적 이해 필요 (비문학, 논설문 포함)",
  },
  {
    category: "쓰기/작문",
    elementary: "단순한 문장과 짧은 글쓰기 연습",
    middleSchool: "서술형 문장 쓰기, 에세이 및 논리적 글쓰기 연습",
  },
  {
    category: "평가 방식",
    elementary: "단순 객관식 문제, 말하기·듣기 평가 중심",
    middleSchool: "서술형 문제, 독해 문제, 문법 및 작문 평가 강화",
  },
  {
    category: "수업 방식",
    elementary: "놀이식 학습, 게임, 회화 중심",
    middleSchool: "교과서 중심 수업, 개념 설명, 시험 대비 학습",
  },
];

const ElementaryIntensiveCourse: React.FC<IntensiveCourseInfoProps> = ({
  title,
  targetAudience,
  mainSubjects,
  textbookInfo,
  debutDay,
  completionStudy,
}) => {
  const newDescription = "초등 고학년(5~6학년) 시기는 중학교 영어 학습을 대비하는 데 매우 중요한 시기입니다. 이 단계에서 영어의 기초가 제대로 다져지지 않으면 중학교에서 겪을 어려움이 커질 수 있습니다.";

  return (
    <section id="elementary-intensive" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg shadow-xl p-6 md:p-10 mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-4 flex items-center justify-center">
          <Star className="w-10 h-10 mr-3" /> {title}
        </h2>
        <p className="text-center text-gray-600 mb-6 text-lg">{targetAudience}</p>
        <p className="text-sm text-center text-gray-500 mb-10 bg-purple-100 p-4 rounded-md shadow-sm">
          <AlertTriangle className="w-5 h-5 mr-2 inline-block text-purple-600" />
          {newDescription}
        </p>

        <div className="grid md:grid-cols-1 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
              <BookUser className="w-6 h-6 mr-2" /> 코스 대상
            </h3>
            <p className="text-gray-600">{targetAudience}</p>
            
            <h3 className="text-xl font-semibold text-purple-600 mt-6 mb-4 flex items-center">
              <BookMarked className="w-6 h-6 mr-2" /> 주요 학습 내용
            </h3>
            <ul className="space-y-2 text-sm">
              {mainSubjects.map((subject, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" /> 
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-10 text-sm">
          <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" /> 추가 정보
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <strong className="w-28 flex-shrink-0 text-purple-800">{textbookInfo.split(':')[0]}:</strong> 
              <span className="text-gray-700">{textbookInfo.split(':')[1]?.trim()}</span>
            </li>
            <li className="flex items-start">
                <strong className="w-28 flex-shrink-0 text-purple-800">{debutDay.split(':')[0]}:</strong>
                <span className="text-gray-700">{debutDay.split(':')[1]?.trim()}</span>
            </li>
            <li className="flex items-start">
                <strong className="w-28 flex-shrink-0 text-purple-800">{completionStudy.split(':')[0]}:</strong>
                <span className="text-gray-700">{completionStudy.split(':')[1]?.trim()}</span>
            </li>
          </ul>
        </div>
        
        {/* 중요성 강조 문구 및 비교표 섹션 */}
        <div className="mb-10 p-6 bg-amber-50 rounded-lg shadow-inner">
          <div className="flex items-center text-amber-700 mb-4">
            <Info className="w-6 h-6 mr-2 flex-shrink-0" />
            <p className="font-semibold text-lg">초등 고학년 학습의 중요성</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {newDescription}
          </p>
          
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-amber-200">
                  <TableHead className="w-1/4 font-semibold text-amber-800 py-3 px-4">구분</TableHead>
                  <TableHead className="w-3/8 font-semibold text-amber-800 py-3 px-4">초등 영어 (고학년)</TableHead>
                  <TableHead className="w-3/8 font-semibold text-amber-800 py-3 px-4">중등 영어</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-amber-50/50'}>
                    <TableCell className="font-medium text-gray-800 py-3 px-4">{row.category}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{row.elementary}</TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">{row.middleSchool}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 초등 인텐시브 클래스 주요 특징 섹션 추가 */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-semibold text-[#ff8f00] mb-6 text-center flex items-center justify-center">
            <Zap className="w-7 h-7 mr-2" /> 초등 인텐시브 클래스 주요 특징 
          </h3>
          <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-5 text-center">
            {[
              { icon: UserCheck, label: '1인 담임제' },
              { icon: BookHeart, label: '스터디매니저' },
              { icon: NotebookText, label: '스터디북' },
              { icon: Target, label: '완성학습' },
              { icon: BrainCircuit, label: '온라인AI' },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-amber-50 rounded-lg shadow-sm">
                <feature.icon className="w-10 h-10 text-[#ff8f00] mb-3" />
                <p className="font-semibold text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* ===== 새로운 정보 섹션 시작 ===== */}
        <div className="mt-12 pt-10 border-t border-gray-200 space-y-12">

          {/* 1. 리딩 & 스피킹 (학습 시스템) */}
          <section>
            <h3 className="text-2xl font-semibold text-[#13588f] mb-6 text-center flex items-center justify-center">
              <BookOpenText className="w-7 h-7 mr-2" /> 리딩 & 스피킹
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-sky-50 rounded-lg shadow">
                <h4 className="font-semibold text-sky-700 mb-2 flex items-center"><Edit3 className="w-5 h-5 mr-2"/>수업 전</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  <li>수업 전 모르는 단어들을 스터디북에 써서 옵니다. (OT때 재설명)</li>
                  <li>본인이 해석을 써옵니다.</li>
                </ul>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg shadow">
                <h4 className="font-semibold text-sky-700 mb-2 flex items-center"><MessageCircle className="w-5 h-5 mr-2"/>수업</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  <li>구문 직독직해</li>
                  <li>문제 풀이 {'>'} 틀린 문제 분석</li>
                  <li>문장 Keyword 쓰기</li>
                  <li>틀리는 부분은 스터디북에 기록하도록 합니다.</li>
                </ul>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg shadow">
                <h4 className="font-semibold text-sky-700 mb-2 flex items-center"><ClipboardCheck className="w-5 h-5 mr-2"/>수업 후</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  <li>온라인 학습</li>
                  <li>밴드 미션 진행</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 문법 & 하브루타 (문법 지도 방침) */}
          <section>
            <h3 className="text-2xl font-semibold text-[#13588f] mb-6 text-center flex items-center justify-center">
              <BookMarked className="w-7 h-7 mr-2" /> 문법 & 하브루타
            </h3>
            <div className="bg-indigo-50 p-6 rounded-lg shadow-inner">
              <blockquote className="text-center text-indigo-700 italic border-l-4 border-indigo-300 pl-4 py-2 mb-6">
                <Lightbulb className="w-5 h-5 mr-2 inline-block text-indigo-500" /> &quot;문법 용어와 규칙을 쉽고 정확히 익히고, 문제에 적용하여 스스로가 설명 할 수 있도록 지도&quot;
              </blockquote>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4 text-sm">
                <li>학생들의 이해 속도에 따라서 수업을 하겠습니다.</li>
                <li>핵심 용어와 규칙들은 반드시 스터디북에 기록하여, 학생들이 하브루타로 설명 할 수 있도록 합니다.</li>
                <li>틀린 답들은 스터디북에 오답으로 쓰고 검사 받도록 관리 합니다.</li>
              </ul>
            </div>
          </section>

          {/* 3. 보카 (어휘 학습 시스템) */}
          <section>
            <h3 className="text-2xl font-semibold text-[#13588f] mb-6 text-center flex items-center justify-center">
              <Mic2 className="w-7 h-7 mr-2" /> 보카 (VOCA)
            </h3>
            <div className="bg-teal-50 p-6 rounded-lg shadow-inner">
              <blockquote className="text-center text-teal-700 italic border-l-4 border-teal-300 pl-4 py-2 mb-6">
                <Lightbulb className="w-5 h-5 mr-2 inline-block text-teal-500" /> &quot;제대로 듣고 쓰고 말할 수 있도록 지도&quot;
              </blockquote>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-teal-700">시험 방식:</h4>
                  <p className="text-gray-700">음원으로 or 선생님이 직접 소리를 들려주면 학생들이 영어로 단어를 쓰고, 그 뜻을 정확히 쓰도록 봅니다.</p>
                  <h4 className="font-semibold text-teal-700 mt-2">시험 결과:</h4>
                  <p className="text-gray-700">매 수업마다 단어 시험을 보며 결과는 학원친구 일일학습에서 확인 가능합니다.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600 flex items-center"><AlertCircle className="w-5 h-5 mr-1 text-red-500" /> 시험 틀린 부분</h4>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 pl-2">
                    <li>이번 학기부터는 스터디북 마지막 부분에 시험에서 틀린 어휘를 기록하여, 틀린 어휘들만 따로 관리 할 수 있도록 합니다.</li>
                    <li>온라인으로 이후 전체 단어를 한번 더 재학습 시킵니다.</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Monthly Test (월말 평가) */}
          <section>
            <h3 className="text-2xl font-semibold text-[#13588f] mb-6 text-center flex items-center justify-center">
              <Award className="w-7 h-7 mr-2" /> Monthly Test (월말 평가)
            </h3>
            <div className="bg-purple-50 p-6 rounded-lg shadow-inner">
              <blockquote className="text-center text-purple-700 italic border-l-4 border-purple-300 pl-4 py-2 mb-6">
                <Lightbulb className="w-5 h-5 mr-2 inline-block text-purple-500" /> &quot;매월 말일고사를 시행하여, 주기적으로 학생들의 성적 향상도를 점검하고 챔피언 학생을 선정하여 시상합니다.&quot;
              </blockquote>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4 text-sm">
                <li>시험 일정은 진도표에 기재되어 있습니다.</li>
                <li>월말고사 성적은 학원친구를 통해 확인 가능 하십니다.</li>
                <li>성적처리는 평균 2~3일 정도 걸리며, 상담은 순차적으로 이루어 집니다.</li>
              </ul>
            </div>
          </section>

        </div>
        {/* ===== 새로운 정보 섹션 끝 ===== */}
        
        {/* 학부모 안심 메시지 */}
        <div className="mt-10 p-6 bg-purple-50 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            학부모님께 드리는 <span className="text-pink-500 font-bold">안심 메시지</span>
          </h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              초등 고학년, 특히 5~6학년은 중등 영어를 준비하는 <strong className="text-purple-600">결정적인 시기</strong>입니다. 
              이때 영어의 기초를 탄탄히 다지지 않으면, 중학교 진학 후 학습 격차로 인해 어려움을 겪는 경우가 많습니다. 
              단순히 단어를 많이 외우고 문제만 푸는 것을 넘어, 영어의 <strong className="text-purple-600">네 가지 영역(읽기, 듣기, 쓰기, 말하기)을 균형 있게 발전</strong>시키고, 
              <strong className="text-purple-600">문법의 원리를 정확히 이해</strong>하는 것이 중요합니다. 
            </p>
            <p>
              데뷰어학원의 초등 인텐시브 과정은 중등 내신과 수능까지 이어지는 <strong className="text-purple-600">장기적인 영어 실력의 초석</strong>을 다지는 프로그램입니다. 
              단순한 선행 학습이 아닌, <strong className="text-purple-600">깊이 있는 이해와 응용 능력</strong>을 키우는 데 중점을 둡니다. 
              체계적인 커리큘럼과 경험 많은 강사진, 그리고 꼼꼼한 관리 시스템을 통해 우리 아이가 영어에 대한 자신감을 갖고 중학교에 진학할 수 있도록 최선을 다하겠습니다.
              학부모님의 불안감을 <strong className="text-purple-600">&quot;확신&quot;</strong>으로 바꾸고, 과정의 모든 것을 <strong className="text-purple-600">&quot;결과&quot;</strong>로서 증명하겠습니다.
            </p>
          </div>
        </div>

        {/* 과정 문의 버튼 */}
        <div className="mt-12 text-center">
          <button 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => console.log("초등 인텐시브 과정 상담 문의")}
          >
            <MessageCircle className="w-5 h-5 mr-2 inline-block" /> {/* 이 아이콘이 없으면 MessageSquare 또는 다른 것으로 대체해야 함 */}
            초등 인텐시브 과정 상담받기
          </button>
        </div>

      </div>
    </section>
  );
};

export default ElementaryIntensiveCourse; 