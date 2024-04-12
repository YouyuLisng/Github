import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGitHub from 'remark-github';

interface MarkdownViewerProps {
    content: string;
    maxHeight?: string;
    repository: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, maxHeight, repository }) => {
    if (!content) {
        return <p>沒有資料</p>;
    }
    
    try {
        return (
            <div className="markdown-container overflow-auto mt-4 mb-4" style={{ maxHeight }}>
                <Markdown className="prose" remarkPlugins={[remarkGfm, [remarkGitHub, { repository: repository }]]}>{content}</Markdown>
            </div>
        );
    } catch (error) {
        console.error('Markdown Error:', error);
        return <p>Markdown Error</p>;
    }
};

export default MarkdownViewer;
