import React from 'react'
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues'
import fetchUser from '@/app/actions/UserRepo/fetchUser'
import { IssuesList } from '@/components/IssuesList/IssuesList';
import type { Metadata } from "next";
import EmptyState from '@/components/EmptyState';
import UserInfo from '@/components/UserInfo';
interface UsersProps {
    params: {
        userName: string;
    };
}
export async function generateMetadata( { params: { userName } }: UsersProps): Promise<Metadata> {
    const user = await fetchUser(userName);

    if (!user) {
        return {
            title: 'Not found',
        }
    }
    return {
        title: user.login,
    }
}

export default async function Users({ params: { userName } } : UsersProps) {
    const user = await fetchUser(userName);
    const Issues = await fetchAllIssues(userName, 1);
    if (!user) {
        return (
            <div className='max-w-[760px] mx-auto bg-white'>
                <UserInfo user={user} >
                    <EmptyState title={`${userName} 此用戶不存在`} subtitle='Not Found' showReaet={true} />
                </UserInfo>
            </div>
        )
    }
    return (
        <>
            <UserInfo user={user}>
                {Issues.length !== 0 ? (
                    <IssuesList username={userName} />
                ) : (
                    <EmptyState title={`${userName} 目前尚未發佈文章`} subtitle='Not Found' showReaet={true} />
                )}
            </UserInfo>
        </>
    )
}
