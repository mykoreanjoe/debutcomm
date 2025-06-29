import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { Building, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '파트너스 | 데뷰 영어 학원',
  description: '데뷰 영어와 함께, 같이 완성의 철학을 같이 공유하는 파트너 기관들입니다.',
  openGraph: {
    title: '데뷰 영어 학원 파트너스',
    description: '데뷰 영어와 함께, 같이 완성의 철학을 같이 공유하는 파트너 기관들입니다.',
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "데뷰 영어 학원 파트너스",
      },
    ],
  },
};

const partners = [
  {
    name: '리드나인영어',
    logoUrl: '/images/partners/leadnine-logo.png',
    websiteUrl: 'https://map.naver.com/p/search/%EB%A6%AC%EB%93%9C%EB%82%98%EC%9D%B8%EC%98%81%EC%96%B4%ED%95%99%EC%9B%90/place/1565515705?c=15.00,0,0,0,dh&placePath=/home?entry=bmp&from=map&fromPanelNum=2&timestamp=202506052255&locale=ko&svcName=map_pcv5&searchText=%EB%A6%AC%EB%93%9C%EB%82%98%EC%9D%B8%EC%98%81%EC%96%B4%ED%95%99%EC%9B%90',
    description: '초·중·고등 영어 전문 기관으로, 개별 맞춤 관리, 스피킹, 에세이, 영어 토론 등 전문 프로그램을 통해 내신과 실력 향상을 모두 지원합니다.',
    isNaverPlace: true,
  },
  {
    name: '리드나인주니어',
    logoUrl: '/images/partners/leadnine-junior-logo.png',
    websiteUrl: 'https://map.naver.com/p/entry/place/1632522352?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506052355&locale=ko&svcName=map_pcv5',
    description: 'WHOLE LANGUAGE 기반 커리큘럼, Oxford Reading Tree, 온라인 북클럽 및 특목·자사 대비 맞춤 프로그램으로 Speaking, Writing 실력 향상을 지원합니다.',
    isNaverPlace: true,
  },
  {
    name: '강의하는 아이들',
    logoUrl: '/images/partners/gangeui-kids-logo.png',
    websiteUrl: 'https://map.naver.com/p/search/%EA%B0%95%EC%9D%98%ED%95%98%EB%8A%94%20%EC%95%84%EC%9D%B4%EB%93%A4/place/1828938488?c=13.00,0,0,0,dh&placePath=/home?entry=bmp&from=map&fromPanelNum=2&timestamp=202506062116&locale=ko&svcName=map_pcv5&searchText=%EA%B0%95%EC%9D%98%ED%95%98%EB%8A%94%20%EC%95%84%EC%9D%B4%EB%93%A4',
    description: '학생 중심의 참여형 수업을 통해 수학적 사고력과 문제 해결 능력을 키우는 데 중점을 둔 교육 기관입니다.',
    isNaverPlace: true,
  },
  {
    name: '법무법인 글로리',
    logoUrl: '/images/partners/glory-lawfirm-logo.png',
    websiteUrl: 'https://glorylawfirm.kr/kor/main/',
    description: '\'모두의 번영\'을 목표로 고객의 법적 상황을 종합 분석하여 선제적 법률 서비스를 제공합니다. 다양한 분야에서 최적의 솔루션을 제공합니다.',
    isNaverPlace: false,
  },
  {
    name: 'Concert K',
    logoUrl: '/images/partners/concertk-logo.png',
    websiteUrl: 'https://concertk.com/concertk/',
    secondaryWebsiteUrl: 'https://map.naver.com/p/search/concert%20k/place/1969908422?c=15.00,0,0,0,dh&placePath=/home?entry=bmp&from=map&fromPanelNum=2&timestamp=202506091320&locale=ko&svcName=map_pcv5&searchText=concert%20k',
    description: '30년 방송PD의 특별한 무대와 탁월한 기획력, 전문성으로 감동의 무대를 완성하는 토털 공연 기획사입니다.',
    isNaverPlace: false,
  },
  {
    name: '잉글리쉬 라이프',
    logoUrl: '/images/partners/english-life-logo.png',
    websiteUrl: 'https://e-lifeshop.co.kr/',
    secondaryWebsiteUrl: 'https://map.naver.com/p/search/%EC%9E%89%EA%B8%80%EB%A6%AC%EC%8B%9C%EB%9D%BC%EC%9D%B4%ED%94%84/place/19833185?c=15.00,0,0,0,dh&placePath=/home?entry=pll&from=map&fromPanelNum=2&timestamp=202506051619&locale=ko&svcName=map_pcv5&searchText=%EC%9E%89%EA%B8%80%EB%A6%AC%EC%8B%9C%EB%9D%BC%EC%9D%B4%ED%94%84',
    description: '다양한 영어 원서 및 교재 공급과 함께 교육 솔루션, 온라인 학습, VOCABOX 어휘학습 등 폭넓은 교육 서비스를 제공합니다.',
    isNaverPlace: false,
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <AnimatedSection>
            <SectionTitle
                as="h1"
                icon={Building}
                title="PARTNERS"
                subtitle="데뷰 영어는 최고의 파트너들과 함께 학생들의 성공적인 미래를 만들어갑니다."
                iconColor="text-blue-600"
            />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <AnimatedSection delay={(index + 1) * 0.1} key={partner.name}>
              <Card className="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="p-6">
                    <div className="bg-gray-50 rounded-lg flex items-center justify-center h-40 mb-4 p-4">
                        <div className="relative w-full h-full">
                            <Image
                                src={partner.logoUrl}
                                alt={`${partner.name} 로고`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain"
                            />
                        </div>
                    </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col p-6 pt-0">
                  <CardDescription className="text-sm text-gray-600 mb-6 flex-grow">{partner.description}</CardDescription>
                  <div className="space-y-3 mt-auto">
                    {partner.websiteUrl && (
                      <Button 
                        asChild 
                        className={`w-full ${partner.isNaverPlace ? 'bg-[#03C75A] text-white hover:bg-[#03C75A]/90' : ''}`}
                        variant={partner.isNaverPlace ? 'default' : 'outline'}
                      >
                        <Link href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                          {partner.isNaverPlace ? '네이버 플레이스' : '웹사이트 방문'} <ExternalLink size={16} className="ml-2" />
                        </Link>
                      </Button>
                    )}
                    {partner.secondaryWebsiteUrl && (
                       <Button asChild variant="default" className="w-full bg-[#03C75A] text-white hover:bg-[#03C75A]/90">
                        <Link href={partner.secondaryWebsiteUrl} target="_blank" rel="noopener noreferrer">
                          네이버 플레이스 <ExternalLink size={16} className="ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-20 md:mt-24 p-8 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">데뷰의 약속</h2>
              <p className="text-center text-gray-600 max-w-3xl mx-auto">
                데뷰 영어는 학생들의 실력 향상을 위해 최고의 교육 환경과 콘텐츠를 제공하고자 노력합니다.
                엄선된 파트너들과의 시너지를 통해, 학생들에게 더욱 풍부하고 효과적인 학습 경험을 선사합니다.
              </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
} 