import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = 'https://www.debutenglish.com/sitemap.xml'; // 실제 도메인으로 추후 변경

  return {
    rules: [
      {
        userAgent: '*', // 모든 로봇에 대한 기본 규칙
        allow: '/',
      },
      // 아래는 특정 로봇에 대한 규칙을 명시적으로 추가한 것입니다.
      // 현재는 모든 로봇에 대한 규칙과 동일하지만, 향후 각 로봇의 정책에 맞춰 개별 수정이 용이합니다.
      {
        userAgent: 'Yeti', // 네이버 검색 로봇
        allow: '/',
      },
      {
        userAgent: 'Googlebot', // 구글 검색 로봇
        allow: '/',
      }
    ],
    sitemap: sitemapUrl,
  }
} 