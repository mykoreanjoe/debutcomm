'use client';

// import { useEffect, useState } from 'react';
// import { getCurrentUserPoints } from '@/app/actions/user';
import { CircleDollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// import { Skeleton } from "@/components/ui/skeleton"

export default function UserPoints() {
    // const [points, setPoints] = useState<number | null>(null);

    // useEffect(() => {
    //     getCurrentUserPoints().then(setPoints);
    // }, []);

    // if (points === null) {
    //     return <Skeleton className="w-24 h-8" />;
    // }

    const points = 1234; // Dummy points for UI testing

    return (
        <Badge variant="secondary" className="flex items-center gap-1.5 text-base py-1 px-3">
            <CircleDollarSign className="w-4 h-4 text-yellow-500"/>
            <span>{points.toLocaleString()} P</span>
        </Badge>
    );
} 