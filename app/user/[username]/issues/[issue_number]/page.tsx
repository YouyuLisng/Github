import React from 'react';
import fetchIssues from '@/app/actions/Issues/fetchIssues';
import type { Metadata } from "next";
import Issues from '@/components/IssuesList/Issues';

interface IssuesPageProps {
    params: {
        username: string;
        issue_number: number;
    };
}

export async function generateMetadata( { params: { username, issue_number } }: IssuesPageProps): Promise<Metadata> {
    const Issues = await fetchIssues(username, issue_number);
    return {
        title:`${username} / ${Issues.number}`,
    }
}

export default async function IssuesPage({ params: { username, issue_number } } : IssuesPageProps) {
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <Issues username={username} issue_number={issue_number}></Issues>
        </div>
    );
}