import React from 'react';
import { fetchIssuesId } from '@/api/github/fetchIssuesId';
import type { Metadata } from "next";
import Issues from '@/components/IssuesList/Issues';

interface IssuesPageProps {
    params: {
        userName: string;
        repoName: string;
        issueNumber: number;
    };
}

export async function generateMetadata( { params: { userName, repoName, issueNumber } }: IssuesPageProps): Promise<Metadata> {

    return {
        title:`${userName} / ${repoName} / ${issueNumber}`,
    }
}

export default async function IssuesPage({ params: { userName, repoName, issueNumber } } : IssuesPageProps) {
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <Issues userName={userName} repoName={repoName} issue_number={issueNumber}></Issues>
        </div>
    );
}