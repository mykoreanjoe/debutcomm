import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedSection from '@/components/AnimatedSection';
import { ExternalLink } from 'lucide-react';
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
    description: '초·중·고등 영어 전문 기관으로, 개별 맞춤 관리, 스피킹, 에세이, 영어 토론 및 수준별 수업 등 전문 프로그램을 통해 내신과 실력 향상을 모두 지원합니다.',
  },
  {
    name: '리드나인주니어',
    logoUrl: '/images/partners/leadnine-junior-logo.png',
    websiteUrl: 'https://map.naver.com/p/entry/place/1632522352?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506052355&locale=ko&svcName=map_pcv5',
    description: '재미있는 WHOLE LANGUAGE 기반 커리큘럼, Oxford Reading Tree, 온라인 북클럽 및 특목·자사 대비 맞춤 프로그램으로 Speaking, Writing 실력 향상을 지원합니다. 합리적인 교육비로 최고의 가성비를 제공합니다.',
  },
  {
    name: '법무법인글로리',
    logoUrl: '/images/partners/glory-lawfirm-logo.png',
    websiteUrl: 'https://glorylawfirm.kr/kor/main/',
    description: '\'모두의 번영\'을 목표로 고객의 법적 상황을 종합 분석하여 선제적 법률 서비스를 제공합니다. 이혼, 상속, 부동산, 형사, 회사법, ESG 등 다양한 분야에서 최적의 솔루션을 제공합니다.',
  },
  {
    name: '잉글리쉬 라이프 (목동도서총판)',
    logoUrl: '/images/partners/english-life-logo.png',
    websiteUrl: 'https://e-lifeshop.co.kr/',
    secondaryWebsiteUrl: 'https://map.naver.com/p/search/%EC%9E%89%EA%B8%80%EB%A6%AC%EC%8B%9C%EB%9D%BC%EC%9D%B4%ED%94%84/place/19833185?c=15.00,0,0,0,dh&placePath=/home?entry=pll&from=map&fromPanelNum=2&timestamp=202506051619&locale=ko&svcName=map_pcv5&searchText=%EC%9E%89%EA%B8%80%EB%A6%AC%EC%8B%9C%EB%9D%BC%EC%9D%B4%ED%94%84',
    description: '다양한 영어 원서 및 교재 공급과 함께 에듀솔루션 학원관리, 온라인 학습 지원, VOCABOX 어휘학습 등 폭넓은 교육 서비스를 제공하며, 영어 도서관 맞춤 상담도 지원합니다.',
  },
];

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <AnimatedSection delay={0}>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
          파트너스
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          데뷰 영어와 함께, 같이 완성의 철학을 같이 공유하는 파트너 기관들입니다.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {partners.map((partner, index) => (
          <AnimatedSection delay={(index + 1) * 0.1} key={partner.name}>
            <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardHeader className="items-center text-center p-6 pt-8">
                <div className="relative w-36 h-36 mb-6 mx-auto p-2">
                  <Image
                    src={partner.logoUrl}
                    alt={`${partner.name} 로고`}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mt-2">{partner.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between p-6 pt-2 text-center">
                <p className="text-base text-gray-700 mb-6 leading-relaxed">{partner.description}</p>
                <div className="space-y-3 mt-auto">
                  {partner.websiteUrl && (
                    <Button 
                      asChild 
                      variant={partner.websiteUrl.includes('naver.com') ? 'default' : 'secondary'} 
                      className={`w-full py-3 text-base ${
                        partner.websiteUrl.includes('naver.com') ? 'bg-[#03C75A] text-white hover:bg-[#02B350]' : ''
                      }`}
                    >
                      <Link href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                        {partner.websiteUrl.includes('naver.com') ? '네이버 플레이스 바로가기' : '웹사이트 방문'} <ExternalLink size={18} className="ml-2" />
                      </Link>
                    </Button>
                  )}
                  {partner.secondaryWebsiteUrl && (
                     <Button 
                       asChild 
                       variant="default" 
                       className="w-full py-3 text-base bg-[#03C75A] text-white hover:bg-[#02B350]"
                     >
                      <Link href={partner.secondaryWebsiteUrl} target="_blank" rel="noopener noreferrer">
                        네이버 플레이스 <ExternalLink size={18} className="ml-2" />
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
        <div className="mt-16 p-8 bg-slate-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">데뷰 영어의 약속</h2>
            <p className="text-center text-gray-600 mb-4">
              데뷰 영어는 학생들의 영어 실력 향상을 위해 최고의 교육 환경과 콘텐츠를 제공하고자 노력합니다.
              엄선된 파트너 기관들과의 파트너십을 통해 시너지를 창출하고, 학생들에게 더욱 풍부하고 효과적인 학습 경험을 선사합니다.
            </p>
        </div>
      </AnimatedSection>
    </div>
  );
} 