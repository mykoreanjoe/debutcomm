'use client';

import { Skeleton } from "@/components/ui/skeleton";

export function CommentSectionSkeleton() {
  return (
    <div className="space-y-6 mt-8">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-end">
              <Skeleton className="h-10 w-24" />
          </div>
      </div>
      
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 