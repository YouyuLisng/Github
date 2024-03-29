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
        return <p>内容为空</p>;
    }
    
    try {
        const decodedContent = atob(content);
        return (
            <div className="markdown-container overflow-auto mt-4 mb-4" style={{ maxHeight }}>
                <Markdown className="prose" remarkPlugins={[remarkGfm, [remarkGitHub, { repository: repository }]]}>{decodedContent}</Markdown>
            </div>
        );
    } catch (error) {
        console.error('Markdown 解析错误:', error);
        return <p>Markdown 解析错误</p>;
    }
};

export default MarkdownViewer;
