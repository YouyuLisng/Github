import React from 'react';
import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import UserInfo from '@/components/UserInfo';
import { IssuesList } from '@/components/IssuesList/IssuesList';
import { fetchIssues } from '@/api/github/fetchIssues'
import { fetchUser } from '@/api/github/fetchUser'
interface UsersProps {
    params: {
        userName: string;
        repoName: string;
    };
}
export async function generateMetadata({
    params: { userName, repoName }
}: UsersProps): Promise<Metadata> {
    return {
        title:`${userName} / ${repoName}`,
    };
}

export default async function Users({
    params: { userName, repoName },
}: UsersProps) {
    const user = await fetchUser({ userName: userName});
    const issues = await fetchIssues({ userName: userName, repoName: repoName });

    if (!user) {
        return (
            <div className="max-w-[760px] mx-auto bg-white">
                <UserInfo user={user}>
                    <EmptyState
                        title={`${userName} 此用戶不存在`}
                        subtitle="Not Found"
                        showReaet={true}
                    />
                </UserInfo>
            </div>
        );
    }

    if (issues.length === 0) {
        return (
            <UserInfo user={user} >
                <EmptyState title={`${repoName} 目前沒有文章`} subtitle='Not Found' showReaet={true} />
            </UserInfo>
        )
    }

    return (
        <UserInfo user={user}>
            <IssuesList userName={userName} repoName={repoName} />
        </UserInfo>
    );
}
