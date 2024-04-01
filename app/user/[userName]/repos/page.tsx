import React from 'react'
import { fetchRepos } from '@/api/github/fetchRepos'
import { fetchUser } from '@/api/github/fetchUser'
import { RepoList } from '@/components/RepoList/RepoList';
import type { Metadata } from "next";
import EmptyState from '@/components/EmptyState';
import UserInfo from '@/components/UserInfo';
interface ReposPageProps {
    params: {
        userName: string;
    };
}
export async function generateMetadata( { params: { userName } }: ReposPageProps): Promise<Metadata> {
    const user = await fetchUser({
        userName: userName
    });
    if (!user) {
        return {
            title: 'Not found',
        }
    }
    return {
        title: user.login,
    }
}

export default async function ReposPage({ params: { userName } } : ReposPageProps) {
    const user = await fetchUser({ userName: userName });
    const repo = await fetchRepos({ userName: userName });
    if (!user) {
        return (
            <div className='max-w-[760px] mx-auto bg-white'>
                <UserInfo user={user} >
                    <EmptyState title={`${userName} 此用戶不存在`} subtitle='Not Found' showReaet={true} />
                </UserInfo>
            </div>
        )
    }

    if (repo.length === 0) {
        return (
            <>
                <UserInfo user={user} >
                    <EmptyState title={`${userName} 目前尚未發佈倉儲`} subtitle='Not Found' showReaet={true} />
                </UserInfo>
            </>
        )
    }

    return (
        <>
            <UserInfo user={user}>
                <RepoList username={userName} />
            </UserInfo>
        </>
    )
}
