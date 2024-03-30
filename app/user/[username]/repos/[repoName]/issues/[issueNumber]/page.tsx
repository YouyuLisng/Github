import React from 'react';
import fetchIssues from '@/app/actions/Issues/fetchIssues';
import type { Metadata } from "next";
import Issues from '@/components/IssuesList/Issues';

interface IssuesPageProps {
    params: {
        userName: string;
        issueNumber: number;
    };
}

export async function generateMetadata( { params: { userName, issueNumber } }: IssuesPageProps): Promise<Metadata> {
    const Issues = await fetchIssues(userName, issueNumber);
    return {
        title:`${userName} / ${Issues.number}`,
    }
}

export default async function IssuesPage({ params: { userName, issueNumber } } : IssuesPageProps) {
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <Issues username={userName} issue_number={issueNumber}></Issues>
        </div>
    );
}