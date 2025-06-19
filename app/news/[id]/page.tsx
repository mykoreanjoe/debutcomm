import { NotionAPI } from 'notion-client';
import { idToUuid, parsePageId } from 'notion-utils';
import { notFound } from 'next/navigation'; // 404 페이지 처리를 위해 추가
import NewsRendererClient from '../NewsRendererClient'; // 방금 만든 클라이언트 컴포넌트

const notion = new NotionAPI();

// Next.js 캐시를 사용하지 않도록 설정
export const revalidate = 0;

export default async function NewsPostPage({ params }: { params: { id: string } }) {
  try {
    // ID를 노션 API가 요구하는 하이픈 없는 형식으로 변환하고,
    // 유효하지 않은 ID(예: favicon.ico)인 경우 null을 반환합니다.
    const pageId = parsePageId(params.id, { uuid: false }); 

    // 만약 pageId가 유효하지 않으면, 충돌하는 대신 404 페이지를 보여줍니다.
    if (!pageId) {
      return notFound();
    }

    const recordMap = await notion.getPage(pageId);

    return (
      <div className="container mx-auto px-4 py-8">
        <NewsRendererClient recordMap={recordMap} />
      </div>
    );
  } catch (error) {
    console.error(`Failed to load Notion page [${params.id}]:`, error);
    // getPage에서 오류가 발생해도 404 페이지를 보여줍니다.
    return notFound();
  }
}

// 동적 페이지에 대한 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const pageId = parsePageId(params.id, { uuid: false });

        if (!pageId) {
            return { title: '데뷰 News' };
        }

        const recordMap = await notion.getPage(pageId);
        const block = recordMap.block[idToUuid(pageId)]?.value;
        const title = block?.properties?.title[0][0] || 'News';

        return {
            title: `${title} - 데뷰 News`,
        };
    } catch {
        return {
            title: '데뷰 News',
        };
    }
}