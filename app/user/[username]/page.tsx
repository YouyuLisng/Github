import React from 'react'
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues'
import fetchUser from '@/app/actions/UserRepo/fetchUser'
import { IssuesList } from '@/components/IssuesList/IssuesList';
import type { Metadata } from "next";
import EmptyState from '@/components/EmptyState';
import UserInfo from '@/components/UserInfo';
interface UsersProps {
    params: {
        username: string;
    };
}
export async function generateMetadata( { params: { username } }: UsersProps): Promise<Metadata> {
    const user = await fetchUser(username);

    if (!user) {
        return {
            title: 'Not found',
        }
    }
    return {
        title: user.login,
    }
}

export default async function Users({ params: { username } } : UsersProps) {
    const user = await fetchUser(username);
    const Issues = await fetchAllIssues(username, 1);
    if (!user) {
        return (
            <div className='max-w-[760px] mx-auto bg-white'>
                <UserInfo user={user} >
                    <EmptyState title={`${username} 此用戶不存在`} subtitle='Not Found' showReaet={true} />
                </UserInfo>
            </div>
        )
    }
    return (
        <>
            <UserInfo user={user}>
                {Issues.length !== 0 ? (
                    <IssuesList username={username} />
                ) : (
                    <EmptyState title={`${username} 目前尚未發佈文章`} subtitle='Not Found' showReaet={true} />
                )}
            </UserInfo>
        </>
    )
}
