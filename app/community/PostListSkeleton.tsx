'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-6 w-4/5" />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 