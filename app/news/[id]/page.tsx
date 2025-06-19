import type { Metadata } from 'next';
import { NotionAPI } from 'notion-client';
import { idToUuid, parsePageId } from 'notion-utils';
import { notFound } from 'next/navigation';
import NewsRendererClient from '../NewsRendererClient';

const notion = new NotionAPI();

export const revalidate = 0;

// 페이지가 받을 Props 타입을 명시적으로 정의하여 타입 충돌을 해결합니다.
interface PageProps {
  params: { id: string };
}

export default async function NewsPostPage({ params }: PageProps) {
  try {
    const pageId = parsePageId(params.id, { uuid: false }); 

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
    return notFound();
  }
}

// generateMetadata 함수도 동일한 타입을 사용하고, 반환 타입을 명시합니다.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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