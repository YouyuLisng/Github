import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGitHub from 'remark-github';

interface MarkdownViewerProps {
    content: string;
    maxHeight?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, maxHeight }) => {
    if (!content) {
        return <p>沒有資料</p>;
    }
    
    const decodedContent = atob(content);
    return (
        <div className="markdown-container overflow-auto mt-4 mb-4" style={{ maxHeight }}>
            <Markdown className="prose">{decodedContent}</Markdown>
        </div>
    );
};

export default MarkdownViewer;
