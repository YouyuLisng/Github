import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    content: string;
    maxHeight?: string;
}

function MarkdownViewer({ content, maxHeight }: MarkdownViewerProps) {
    const decodedContent = decodeBase64(content);
    return (
        <div className="markdown-container overflow-auto mt-4 mb-4" style={{ maxHeight: maxHeight }}>
            <Markdown className="prose" remarkPlugins={[remarkGfm]}>{decodedContent}</Markdown>
        </div>
    );
}

export default MarkdownViewer;

function decodeBase64(base64String: string) {
    const decodedString = atob(base64String);
    return decodedString;
}
