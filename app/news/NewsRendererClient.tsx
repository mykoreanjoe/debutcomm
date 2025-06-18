"use client";

import { NotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';

// Core Notion styles
import 'react-notion-x/src/styles.css';
// Used for code blocks
import 'prismjs/themes/prism-tomorrow.css';
// Used for equations
import 'katex/dist/katex.min.css';

type Props = {
    recordMap: ExtendedRecordMap;
};

export default function NewsRendererClient({ recordMap }: Props) {
    if (!recordMap) {
        return null;
    }

    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={true}
            darkMode={false}
            disableHeader={true}
        />
    );
} 