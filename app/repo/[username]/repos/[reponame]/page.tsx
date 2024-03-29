import React from 'react';
import fetchRepo from '@/app/actions/Repo/fetchRepo';
import fetchMarkdown from '@/app/actions/Markdown/fetchMarkdown';
import MarkdownViewer from '@/components/Markdown';
import EmptyState from '@/components/EmptyState';
import type { Metadata } from "next";
import MarkdownPost from '@/components/Markdown/MarkdownPost';
import { MarkdownIssuesList } from '@/components/Markdown/MarkdownIssuesList';
import fetchAllIssues from '@/app/actions/Repo/fetchAllIssues';
interface RepoPageProps {
    params: {
        username: string;
        reponame: string;
    };
}

export async function generateMetadata( { params: { username, reponame } }: RepoPageProps): Promise<Metadata> {
    const RepoData = await fetchRepo(username, reponame);
    return {
        title:`${username}/${RepoData.name}`,
    }
}

export default async function RepoPage({ params: { username, reponame } } : RepoPageProps) {
    const MarkdownIssues = await fetchAllIssues(username, reponame, 1);
    const RepoData = await fetchRepo(username, reponame);
    const MarkdownData = await fetchMarkdown(username, reponame);

    if (!MarkdownData || !MarkdownData.content) {
        return (
            <MarkdownPost username={username} RepoData={RepoData}>
                <EmptyState title="Markdown 目前沒有內容" subtitle='Not Found' />
            </MarkdownPost>
        );
    }

    return (
        <MarkdownPost username={username} RepoData={RepoData}>
            <MarkdownViewer content={MarkdownData.content} repository={`https://github.com/${username}/${RepoData.name}`} />
            {MarkdownIssues.length !== 0 ? (
                <MarkdownIssuesList username={username} reponame={reponame} />
            ) : (
                <EmptyState title={`${reponame} 目前尚未有評論`} subtitle='Not Found' showReaet={true} />
            )}
        </MarkdownPost>
    );
}
