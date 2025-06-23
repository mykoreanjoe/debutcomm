import { createClient } from '@/lib/supabase/server';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 10;

async function getTotalPostCount(boardSlug?: string): Promise<number> {
    const supabase = createClient();
    let query = supabase
        .from('posts_with_counts')
        .select('*', { count: 'exact', head: true });

    if (boardSlug) {
        query = query.eq('board_slug', boardSlug);
    }
    
    const { count, error } = await query;
    
    if (error) {
        console.error('Error fetching total post count:', error);
        return 0;
    }
    
    return count || 0;
}


interface PaginationControlsProps {
    currentPage: number;
    boardSlug: string | undefined;
    sortOrder: string;
}

export default async function PaginationControls({ currentPage, boardSlug, sortOrder }: PaginationControlsProps) {
    const totalCount = await getTotalPostCount(boardSlug);
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams();
        if (boardSlug) params.set('board', boardSlug);
        if (sortOrder !== 'newest') params.set('sort', sortOrder);
        params.set('page', pageNumber.toString());
        return `/community?${params.toString()}`;
    };

    if (totalPages <= 1) {
        return null;
    }
    
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
} 