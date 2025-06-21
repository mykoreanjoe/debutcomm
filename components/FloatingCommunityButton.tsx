"use client";

import React from 'react';
import { Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FloatingCommunityButton = () => {
    const pathname = usePathname();

    // Do not show the button on the community pages
    if (pathname.startsWith('/community')) {
        return null;
    }

    return (
        <Link href="/community">
            <div className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer group">
                <Users className="w-8 h-8 text-white transition-transform duration-200 group-hover:rotate-12" />
            </div>
        </Link>
    );
};

export default FloatingCommunityButton; 