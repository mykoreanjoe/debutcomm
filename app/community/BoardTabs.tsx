"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type Board = {
    id: number;
    name: string;
};

interface BoardTabsProps {
    boards: Board[];
    currentBoardId: number | null;
}

export default function BoardTabs({ boards, currentBoardId }: BoardTabsProps) {
    const searchParams = useSearchParams();

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        params.delete('page'); //
        return params.toString();
    };

    return (
        <Tabs value={currentBoardId?.toString() || 'all'}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <Link href={`/community?${createQueryString('boardId', '')}`} passHref>
                    <TabsTrigger value="all" className="w-full">전체</TabsTrigger>
                </Link>
                {boards.map((board) => (
                    <Link key={board.id} href={`/community?${createQueryString('boardId', board.id.toString())}`} passHref>
                        <TabsTrigger value={board.id.toString()} className="w-full">{board.name}</TabsTrigger>
                    </Link>
                ))}
            </TabsList>
        </Tabs>
    );
} 