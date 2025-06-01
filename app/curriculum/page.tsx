import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, Rocket, GraduationCap, Target, CalendarDays, BookCopy, Users, Zap, Brain, TrendingUp } from 'lucide-react'; // TrendingUp 아이콘 추가

// Linter 상태 확인을 위한 임시 주석
interface CurriculumCardProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  bgColorClass?: string;
  textColorClass?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  anchorId?: string; // 상세 내용으로 이동하기 위한 ID
}

const curriculumData: CurriculumCardProps[] = [
  {
    title: "초등 정규 과정",
    description: "탄탄한 기본기와 자기주도 학습 습관을 형성하는 과정입니다.",
    bgColorClass: "bg-blue-50",
    textColorClass: "text-blue-700",
    buttonText: "초등 정규 과정 상담받기",
    icon: BookOpen,
    anchorId: "elementary-regular-details",
  },
  {
    title: "초등 인텐시브 과정",
    description: "심화 학습과 다양한 액티비티를 통해 영어 실력을 한 단계 높이는 집중 과정입니다.",
    bgColorClass: "bg-green-50",
    textColorClass: "text-green-700",
    buttonText: "초등 인텐시브 과정 상담받기",
    icon: Rocket,
    // anchorId: "elementary-intensive-details", // 추후 추가 가능
  },
  {
    title: "중등 정규 과정",
    description: "체계적인 학습과 내신 대비를 통해 학업 성취도를 극대화하는 과정입니다.",
    bgColorClass: "bg-yellow-50",
    textColorClass: "text-yellow-700",
    buttonText: "중등 정규 과정 상담받기",
    icon: GraduationCap,
    // anchorId: "middle-regular-details", // 추후 추가 가능
  },
  {
    title: "중등 내신 과정",
    description: "학교별 맞춤 전략과 실전 훈련으로 내신 성적 향상을 목표하는 과정입니다.",
    bgColorClass: "bg-purple-50",
    textColorClass: "text-purple-700",
    buttonText: "중등 내신 과정 상담받기",
    icon: Target,
    // anchorId: "middle-intensive-details", // 추후 추가 가능
  },
];

const CurriculumCard: React.FC<CurriculumCardProps> = ({
  title,
  description,
  icon: Icon,
  bgColorClass = "bg-gray-50",
  textColorClass = "text-gray-700",
  buttonText = "상담받기",
  onButtonClick,
  anchorId,
}) => {
  const handleButtonClick = () => {
    // TODO: Implement Kakao Talk integration
    console.log(`${title} 상담 버튼 클릭`);
    if (onButtonClick) {
      onButtonClick();
    }
    // window.open('YOUR_KAKAO_TALK_CHANNEL_LINK', '_blank');
  };

  const content = (
    <div className={`rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-between ${bgColorClass} border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full`}>
      <div>
        {Icon && (
          <div className="mb-4">
            <Icon className={`w-12 h-12 ${textColorClass}`} />
          </div>
        )}
        <h3 className={`text-2xl font-bold mb-3 ${textColorClass}`}>{title}</h3>
        <p className="text-gray-600 text-base mb-6 min-h-[4.5rem]">{description}</p>
      </div>
      <Button 
        onClick={handleButtonClick} 
        className="w-full mt-auto bg-slate-700 hover:bg-slate-800 text-white"
      >
        <MessageSquare size={18} className="mr-2" /> 
        {buttonText}
      </Button>
    </div>
  );

  if (anchorId) {
    return <a href={`#${anchorId}`} className="block h-full">{content}</a>;
  }

  return content;
};

export default function CurriculumPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          데뷰 영어 커리큘럼
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          가장 완성도 높은 커리큘럼이 세심한 강사, 가장 정확한 온라인 AI, 꼼꼼한 스터디 매니저와 함께, <br className="hidden md:inline" />우리 학생에게 꼭 필요한 학습을 만들어 갑니다.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">과정 안내</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {curriculumData.map((curriculum) => (
            <CurriculumCard
              key={curriculum.title}
              {...curriculum}
            />
          ))}
        </div>
      </section>

      {/* 초등 정규 과정 상세 내용 섹션 */}
      <section id="elementary-regular-details" className="pt-16 pb-12 bg-blue-50 rounded-xl shadow-lg">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">초등 정규 과정</h2>
            <p className="text-xl text-blue-600">🧑‍🎓 대상: 초등 1~5학년</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <CalendarDays size={24} className="mr-3" /> 시간표 & 수업 구성
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-blue-800 uppercase bg-blue-100">
                    <tr>
                      <th scope="col" className="px-4 py-3">구분</th>
                      <th scope="col" className="px-4 py-3">요일</th>
                      <th scope="col" className="px-4 py-3">수업 시간</th>
                      <th scope="col" className="px-4 py-3">수업 회차</th>
                      <th scope="col" className="px-4 py-3">총 수업 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-blue-200">
                      <td rowSpan={3} className="px-4 py-3 font-medium text-gray-900 align-top border-r border-blue-200">주 3회 수업</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">월/수/금</td>
                      <td className="px-4 py-3">① 2:30 ~ 4:05</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">95분 × 3</td>
                      <td rowSpan={3} className="px-4 py-3 align-top">285분 / 주</td>
                    </tr>
                    <tr className="bg-white border-b border-blue-200">
                      <td className="px-4 py-3">② 4:10 ~ 5:45</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3">③ 6:00 ~ 7:35</td>
                    </tr>
                    <tr className="bg-blue-50 border-t border-blue-200">
                      <td rowSpan={2} className="px-4 py-3 font-medium text-gray-900 align-top border-r border-blue-200">주 2회 수업</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">화/목</td>
                      <td className="px-4 py-3">① 3:00 ~ 5:25</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">145분 × 2</td>
                      <td rowSpan={2} className="px-4 py-3 align-top">290분 / 주</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3">② 6:00 ~ 8:25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start"><BookCopy size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>교재 구성:</strong> 자체 개발 교재 + 외부 전문 교재 혼합 운영</span></li>
                <li className="flex items-start"><CalendarDays size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>DEBUT DAY:</strong> 매월 1회 토요일 특별 수업 (이벤트 or 발표회 등)</span></li>
                <li className="flex items-start"><Users size={20} className="mr-2 mt-1 text-blue-600 flex-shrink-0" /><span><strong>완성학습:</strong> 스터디 매니저와 함께, 수업 <strong>앞 또는 뒤에 고정된 루틴</strong>으로 운영</span></li>
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                  <Zap size={24} className="mr-3" /> 통합형 수업 (Integrated Learning Approach)
                </h3>
                <p className="text-gray-700 mb-3">
                  DEBUT의 커리큘럼은 초1 파닉스부터 중3 수능까지 연계되는 시스템입니다.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 pl-4">
                  <li>어휘량의 축적</li>
                  <li>영역별 스킬의 통합 내재화 (리딩, 문법, 스피킹, 라이팅 등)</li>
                </ol>
                <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-600 italic">
                  영어가 어려운 이유는 '영역별 공부법'이 서로 다르고, 학생의 흥미·성취도도 영역마다 다르기 때문입니다.
                </blockquote>
                <p className="text-gray-700 mb-2">
                  단일 영역 중심 학습은 한계가 있으며, 통합형 수업을 통해 '절름발이 영어'를 예방하고 <strong>균형 잡힌 성장</strong>을 유도합니다.
                </p>
                <p className="text-gray-700">
                  대표 사례: 영어 도서관만 다녔던 학생들은 어휘력은 있지만 말하기, 쓰기, 문법에서 큰 격차가 드러납니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <Zap size={24} className="mr-3" /> 활동 & 프로젝트 중심 수업
              </h3>
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-600 italic">
                "그저 외우기만 하는 공부는 오래 가지 않습니다."
              </blockquote>
              <p className="text-gray-700 mb-2">
                특히 초등 저학년은 <strong>활동과 프로젝트를 통한 흥미 기반 수업</strong>이 핵심입니다.
              </p>
              <p className="text-gray-700 mb-2">
                데뷰는 '컴프리헨시브 커리큘럼'을 통해 주제별 리딩 스킬과 <strong>인 클래스 액티비티</strong>, <strong>프로젝트 중심 실습</strong>을 연계하여 실력 향상을 유도합니다.
              </p>
              <p className="text-gray-700">
                활동이 곧 학습이 되는 구조로, 집중력이 낮은 아이도 <strong>즐겁게 몰입</strong>할 수 있습니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <Brain size={24} className="mr-3" /> Skill-Based Learning
              </h3>
              <p className="text-gray-700 mb-3">
                픽션/논픽션을 통해 리딩 사고력을 확장시키는 훈련 과정입니다.
              </p>
              <p className="text-gray-700 mb-2">
                단순 독해를 넘어서 <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">추론</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">순서 배열</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">목적 파악</code>, <code className="font-mono bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-sm">문맥 유추</code> 등 <strong>수능형 사고 훈련</strong> 강화합니다.
              </p>
              <p className="text-gray-700 mb-2"><strong>핵심 개념:</strong></p>
              <ul className="list-disc list-outside space-y-1 text-gray-700 pl-5 mb-3">
                <li>동의어·반의어</li>
                <li>품사 구분</li>
                <li>문장 구조 패턴</li>
              </ul>
              <p className="text-gray-700">
                쉬운 개념부터 시작해 점진적으로 확장하며, <strong>활동 & 프로젝트</strong>로 완전 내재화시킵니다.
              </p>
            </div>
          </div>

          {/* 초등부 레벨 차트 섹션 추가 시작 */}
          <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2 flex items-center">
              <TrendingUp size={24} className="mr-3" /> 초등부 레벨 차트
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              탄탄한 어학 기본기를 쌓으며, 다양한 프로젝트로 창의적인 학습역량을 마스터합니다.
            </p>

            <div className="flex text-xs text-center">
              {/* Y-Axis Labels */}
              <div className="flex flex-col justify-between pr-2 space-y-1 border-r border-gray-200 font-medium text-gray-500 min-w-[30px]">
                <span>G7*</span>
                <span>G7</span>
                <span>G6</span>
                <span>G5</span>
                <span>G4</span>
                <span>G3</span>
                <span>G2</span>
                <span>G1</span>
                <span>PK</span>
              </div>

              {/* Chart Area - Simplified Representation */}
              <div className="flex-1 grid grid-cols-5 gap-px pl-2 relative">
                {/* Background grid lines (5 columns for 5 years) */}
                {[...Array(4)].map((_, i) => (
                  <div key={`vline-${i}`} className="absolute h-full border-r border-dashed border-gray-200" style={{ left: `${(i + 1) * 20}%`, top: 0, bottom: 'calc(1.5rem + 4px)' /* Adjust to not overlap year labels */ }}></div>
                ))}
                
                {/* Level Blocks - Approximate placement and styling */}
                {/* Each child div here represents a column for a "1년 과정" */}
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* PK & G1 Column 1 */}
                  <div className="p-1 rounded text-white bg-yellow-400">DK <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-yellow-400">DK* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-gray-700 bg-lime-300 mt-8">D1 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-gray-700 bg-lime-300">D1* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G2 & G3 Column 2 */}
                  <div className="p-1 rounded text-white bg-orange-400 mt-[calc(2*1.5rem)]">D2 <span className="text-xxs">3m</span></div> {/* Adjust margin based on G1/PK height */} 
                  <div className="p-1 rounded text-white bg-orange-400">D2* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-orange-500 mt-8">D3 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-orange-500">D3* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G4 & G5 Column 3 */}
                  <div className="p-1 rounded text-white bg-red-400 mt-[calc(4*1.5rem)]">D4 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-400">D4* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-500 mt-8">D5 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-red-500">D5* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G6 & G7 Column 4 */}
                  <div className="p-1 rounded text-white bg-amber-600 mt-[calc(5*1.5rem)]">D6 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-600">D6* <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-700 mt-8">D7 <span className="text-xxs">3m</span></div>
                  <div className="p-1 rounded text-white bg-amber-700">D7* <span className="text-xxs">3m</span></div>
                </div>
                <div className="relative h-48 space-y-1 flex flex-col-reverse pr-1"> {/* G7* Column 5 */}
                  <div className="p-1 rounded text-white bg-purple-600 mt-[calc(7*1.5rem)]">D Elite <span className="text-xxs">6m</span></div>
                  <div className="p-1 rounded text-white bg-purple-600">D Creator <span className="text-xxs">6m</span></div>
                </div>
              </div>
            </div>
            {/* Year Labels */}
            <div className="flex mt-1 pt-1 border-t border-gray-300">
              <div className="min-w-[30px] pr-2"></div> {/* Spacer for Y-axis alignment */}
              <div className="flex-1 grid grid-cols-5 text-center text-xs text-gray-500">
                {[...Array(5)].map((_, i) => (
                  <div key={`year-${i}`} className="pr-1">1년 과정</div>
                ))}
              </div>
            </div>
          </div>
          {/* 초등부 레벨 차트 섹션 추가 끝 */}

        </div>
      </section>
      {/* 다른 과정 상세 내용도 위와 유사한 형태로 추가 가능 */}
    </div>
  );
} 