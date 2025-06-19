import Link from 'next/link';
import { NotionAPI } from 'notion-client';
import { parsePageId } from 'notion-utils';

// Core Notion styles
import 'react-notion-x/src/styles.css'

// Next.js 캐시를 사용하지 않도록 설정
export const revalidate = 0;

const notion = new NotionAPI();
// 올바른 데이터베이스 ID
const databaseId = '216a2fe8-845b-800c-9846-cf2af1b1b80e';

// Post 타입을 명시적으로 정의하여 any 타입 사용을 피합니다.
interface Post {
    id: string;
    title: string;
    date: string | null;
}

async function getNewsPosts(): Promise<Post[]> {
  try {
    const recordMap = await notion.getPage(databaseId);

    if (!recordMap.collection_view) {
      console.error("Notion collection_view not found.");
      return [];
    }
    
    // 이제 데이터 구조를 정확히 알고 있으므로, 더 안정적으로 ID를 가져옵니다.
    const collectionViewId = '216a2fe8-845b-8090-81fc-000cfce23563'; // 피드 보기
    // 이 한 줄은 타입이 복잡하므로 예외적으로 ESLint 규칙을 비활성화합니다.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageIds = (recordMap.collection_view[collectionViewId] as any)?.value?.page_sort ?? [];
    
    const posts: Post[] = pageIds
      .map((pageId: string): Post | null => {
          const block = recordMap.block[pageId]?.value;
          if (!block || !block.properties) return null;

          const properties = block.properties;
          
          // 디버깅 결과로 알아낸 정확한 속성 ID와 이름을 사용합니다.
          const title = properties.title?.[0]?.[0];
          const status = properties.tJMo?.[0]?.[0]; // Status 속성의 실제 ID는 'tJMo'
          const date = properties['}{vD']?.[0]?.[1]?.[0]?.[1]?.start_date; // 날짜 속성의 실제 ID는 '}{vD'

          if (status !== 'Published' || !title) {
              return null;
          }
          
          // 링크(URL)에 사용될 하이픈 없는 깔끔한 ID를 생성합니다. (결정적인 수정)
          const cleanIdForUrl = parsePageId(pageId, { uuid: false });

          // Post 타입에 맞는 객체를 반환합니다.
          return {
              id: cleanIdForUrl, // 이 깔끔한 ID를 링크에 사용합니다.
              title: title,
              date: date,
          };
      })
      // 타입 가드를 사용하여 null 값을 걸러내고 타입을 Post[]로 확정합니다.
      .filter((post): post is Post => post !== null);

    // 날짜 순으로 정렬
    posts.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch Notion data:", error);
    return [];
  }
}

export default async function NewsListPage() {
  const posts = await getNewsPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">News</h1>
      <div className="space-y-4">
        {posts.length > 0 ? (
          // post는 이제 Post 타입으로 정확히 추론됩니다.
          posts.map((post) => (
            // post.id는 이제 하이픈 없는 깔끔한 ID입니다.
            <Link key={post.id} href={`/news/${post.id}`} className="block p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              {post.date && <p className="text-gray-500 mt-2">{post.date}</p>}
            </Link>
          ))
        ) : (
          <p>게시된 뉴스가 없습니다. 노션 데이터베이스에서 글을 작성하고 &apos;Status&apos;를 &apos;Published&apos;로 설정해주세요.</p>
        )}
      </div>
    </div>
  );
}