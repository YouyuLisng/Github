import React from 'react';
import fetchIssues from '@/app/actions/Issues/fetchIssues';
import type { Metadata } from "next";
import UserIssues from '@/components/IssuesList/Issues';
import { EditIssuesFormModal } from '@/components/Modal/EditIssuesFormModal';
interface RepoPageProps {
    params: {
        username: string;
        issue_number: number;
    };
}

export async function generateMetadata( { params: { username, issue_number } }: RepoPageProps): Promise<Metadata> {
    const Issues = await fetchIssues(username, issue_number);
    return {
        title:`${username} / ${Issues.title}`,
    }
}

export default async function RepoPage({ params: { username, issue_number } } : RepoPageProps) {
    const Issues = await fetchIssues(username, issue_number);
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <UserIssues username={username} issue_number={issue_number}></UserIssues>
        </div>
    );
}