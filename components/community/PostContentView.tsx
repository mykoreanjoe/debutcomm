"use client";

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

interface PostContentViewProps {
    htmlContent: string;
}

export default function PostContentView({ htmlContent }: PostContentViewProps) {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {
        // 클라이언트 사이드에서만 DOMPurify를 실행하여 "window is not defined" 에러 방지
        const sanitized = DOMPurify.sanitize(htmlContent, {
            ADD_TAGS: ['iframe'], // iframe 태그(유튜브) 허용
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'], // iframe에 필요한 속성 허용
        });
        setSanitizedContent(sanitized);
    }, [htmlContent]);

    return (
        <div 
            className="prose dark:prose-invert max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        />
    );
} 