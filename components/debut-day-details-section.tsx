import React from 'react';
import { CalendarDays, /* Gift, */ Users, /* Sparkles, */ Gamepad2, Compass, Trophy, /* Zap, */ Mic2, BookOpen, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string; iconColor?: string }> = 
  ({ icon: Icon, title, description, iconColor = "text-blue-500" }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className={`mb-4 p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200`}>
      <Icon className={`w-10 h-10 ${iconColor}`} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const DebutDayDetailsSection = () => {
  // 실제 데뷰데이 하이라이트 이미지 정보로 교체 (사용자 첨부 이미지 반영)
  const highlightImages = [
    { src: "/images/debut_day/debut_day_highlight_01.jpg", alt: "ChatGPT 스피킹 컨테스트 포스터", caption: "ChatGPT 스피킹 컨테스트" },
    { src: "/images/debut_day/debut_day_highlight_02.jpg", alt: "할로윈 데이 장식", caption: "할로윈 데이 이벤트" },
    { src: "/images/debut_day/debut_day_highlight_03.jpg", alt: "학습 전략 특강", caption: "학습 전략 특강" },
    { src: "/images/debut_day/debut_day_highlight_04.jpg", alt: "데뷰 영어학원 간식", caption: "즐거운 간식 시간" },
    { src: "/images/debut_day/debut_day_highlight_05.jpg", alt: "공부법 특강 후기", caption: "특강 참여 후기" },
    { src: "/images/debut_day/debut_day_highlight_06.jpg", alt: "데뷰데이 환영 보드", caption: "웰컴 데뷰데이!" },
    { src: "/images/debut_day/debut_day_highlight_07.jpg", alt: "데뷰데이 활동 기록 보드", caption: "함께 만든 추억" },
    { src: "/images/debut_day/debut_day_highlight_08.jpg", alt: "데뷰 영어학원 할로윈 작품 전시", caption: "학생 작품 전시" },
  ];

  const naverBlogUrl = "https://blog.naver.com/ourdebut";

  return (
    <section id="debut-day-details" className="py-12 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <CalendarDays className="w-16 h-16 text-amber-600 mx-auto mb-5 shadow-lg rounded-full p-2 bg-white" />
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-4">
            데뷰데이!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            데뷰는 하루의 소중함을 알고 있습니다. 정규 수업 외에 토요 클리닉, 1:1 간담회 등, 학원과 함께 하는 하루 하루를, 학생들의 시기에 따른 행사들로 채워 나갑니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard 
            icon={Compass} 
            title="진로 탐색 & 멘토링"
            description="다양한 분야의 전문가 특강과 1:1 진로 상담을 통해 미래를 설계합니다."
            iconColor="text-sky-500"
          />
          <FeatureCard 
            icon={Gamepad2} 
            title="즐거움 가득! 이벤트"
            description="게임, 퀴즈, 만들기 등 다채로운 체험 활동으로 스트레스를 해소하고 즐거움을 나눕니다."
            iconColor="text-rose-500"
          />
          <FeatureCard 
            icon={Trophy} 
            title="도전! 챌린지 & 컨테스트"
            description="영어 스피치, 글쓰기 대회 등 선의의 경쟁을 통해 성취감을 맛보고 실력을 뽐냅니다."
            iconColor="text-green-500"
          />
          <FeatureCard 
            icon={Mic2} 
            title="특별 초청 강연"
            description="유명 강사 및 교육 전문가를 초빙하여 유익한 학습 정보와 동기 부여 메시지를 전달합니다."
            iconColor="text-purple-500"
          />
          <FeatureCard 
            icon={Users} 
            title="학부모 소통의 장"
            description="자녀 학습 현황 공유 및 교육 정보 교류를 위한 정기적인 학부모 간담회를 개최합니다."
            iconColor="text-teal-500"
          />
          <FeatureCard 
            icon={BookOpen} 
            title="토요 클리닉 & 보충"
            description="정규 수업 외 부족한 부분을 보충하고, 심화 학습을 원하는 학생들을 위한 특별 클리닉을 운영합니다."
            iconColor="text-orange-500"
          />
        </div>
        
        <div className="mt-16 pt-12 border-t border-amber-200">
          <div className="text-center mb-10 md:mb-12">
            <ImageIcon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-amber-700">데뷰데이 활동 하이라이트</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {highlightImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden group transform transition-all duration-300 hover:scale-105">
                <div className="relative w-full aspect-[4/3]">
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                {image.caption && (
                  <p className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-700 text-lg mb-6">
                데뷰데이의 다채로운 프로그램은 매월 새롭게 공지됩니다. <br className="sm:hidden"/>
                학생과 학부모님 모두에게 유익하고 즐거운 시간이 될 수 있도록 항상 노력하겠습니다!
            </p>
            <a 
              href={naverBlogUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              더 많은 데뷰데이 이야기 (네이버 블로그)
            </a>
        </div>

        <div className="mt-16 pt-12 border-t border-amber-200">
          <div className="text-center mb-10 md:mb-12">
            <CalendarDays className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-amber-700">데뷰데이 연간 타임라인</h3>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-amber-100 text-amber-800 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">월</th>
                  <th scope="col" className="px-6 py-3">주요 활동</th>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">핵심 테마</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "1월", activity: "교재 마스터 챌린지", theme: "준비 / 새출발" },
                  { month: "2월", activity: "중등 내신 암기 세미나, 오픈 클래스", theme: "전략적 실전 학습" },
                  { month: "3월", activity: "디즈니 데이, 스터디 위드미", theme: "친구와 함께 / 학습 습관" },
                  { month: "4월", activity: "스터디 프로젝트", theme: "습관 형성 및 루틴" },
                  { month: "5월", activity: "로드맵 상담", theme: "성장 점검 및 감성" },
                  { month: "6월", activity: "Speaking Day, 내신 스터디", theme: "발표력 및 자신감" },
                  { month: "7월", activity: "CHAT-GPT 스피킹 컨테스트", theme: "자기 표현력 및 창의성" },
                  { month: "8월", activity: "데뷰 디즈니 데이", theme: "복습 및 실력 강화" },
                  { month: "9월", activity: "대개강 이벤트", theme: "동기 부여 및 새출발" },
                  { month: "10월", activity: "공포의 영어방탈출", theme: "재미있는 학습 체험" },
                  { month: "11월", activity: "로드맵 상담", theme: "학습 완성도 평가" },
                  { month: "12월", activity: "의대생 공부법 특강", theme: "멘토링 및 미래 대비" },
                ].map((item, index) => (
                  <tr key={index} className={`border-b border-amber-100 ${index % 2 === 0 ? 'bg-amber-50' : 'bg-white'} hover:bg-amber-100 transition-colors duration-150`}>
                    <td className="px-6 py-4 font-medium text-amber-900 whitespace-nowrap">{item.month}</td>
                    <td className="px-6 py-4">{item.activity}</td>
                    <td className="px-6 py-4">{item.theme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-600 text-center">* 위 내용은 시기에 따라 변경될 수 있습니다.</p>
        </div>

      </div>
    </section>
  );
};

export default DebutDayDetailsSection; 