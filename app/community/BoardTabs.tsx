"use client";

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type Board = {
    id: number;
    name: string;
    slug: string;
};

type BoardTabsProps = {
    boards: Board[];
    currentBoardSlug?: string;
    currentSort?: string;
};

export default function BoardTabs({ boards, currentBoardSlug, currentSort }: BoardTabsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createURL = (boardSlug?: string, sort?: string) => {
        const params = new URLSearchParams(searchParams);
        if (boardSlug) {
            params.set('board', boardSlug);
        } else {
            params.delete('board');
        }
        if (sort && sort !== 'newest') {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }
        params.delete('page'); // 탭을 바꾸면 1페이지로
        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    };

    const tabs = [
        { id: null, name: '전체', slug: undefined, sort: 'newest' },
        { id: null, name: '인기', slug: undefined, sort: 'popular' },
        ...boards.map(board => ({ id: board.id, name: board.name, slug: board.slug, sort: currentSort || 'newest' })),
    ];

    return (
        <div className="mb-4 border-b">
            <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => {
                    // 현재 탭이 활성화 상태인지 결정
                    const isActive = (
                        (tab.sort === 'popular' && currentSort === 'popular' && !currentBoardSlug) ||
                        (tab.sort === 'newest' && (currentSort === 'newest' || !currentSort) && !currentBoardSlug && !tab.slug) ||
                        (currentBoardSlug && tab.slug === currentBoardSlug)
                    );

                    return (
                        <Link
                            key={tab.id ? `${tab.id}-${tab.name}` : tab.name}
                            href={createURL(tab.slug, tab.sort)}
                            className={cn(
                                'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                                isActive
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            )}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
} 