'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
// import { checkWelcomeStatus, markWelcomeAsSeen } from '@/app/actions/user';

const WelcomeMessage = () => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-2xl animate-wave">👋</span>
            <div className="flex flex-col">
                <p className="font-semibold">환영합니다!</p>
                <p className="text-sm text-gray-600">데뷰 커뮤니티에 오신 것을 환영합니다.</p>
            </div>
        </div>
    );
};

export default function WelcomeToast() {
    useEffect(() => {
        // For UI testing, always show the welcome message.
        toast(<WelcomeMessage />);

        /* Original logic:
        const showWelcomeMessage = async () => {
            const { has_seen } = await checkWelcomeStatus();
            
            if (!has_seen) {
                await markWelcomeAsSeen();
                toast(<WelcomeMessage />);
            }
        };

        showWelcomeMessage();
        */
    }, []);

    // This component does not render anything itself
    return null;
} 