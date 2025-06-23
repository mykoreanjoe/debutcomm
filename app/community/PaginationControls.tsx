'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalCount: number;
  postsPerPage: number;
}

export default function PaginationControls({ currentPage, totalCount, postsPerPage }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / postsPerPage);

  if (totalPages <= 1) {
    return null; // 페이지가 하나 이하면 페이지네이션을 보여주지 않음
  }

  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {/* 페이지 번호 로직은 단순화를 위해 생략, 필요시 추가 구현 */}
        {[...Array(totalPages)].map((_, i) => (
           <PaginationItem key={i}>
             <PaginationLink 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i + 1);
                }}
                isActive={currentPage === i + 1}
              >
               {i + 1}
             </PaginationLink>
           </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
} 