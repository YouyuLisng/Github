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
    const user = await fetchUser({ 
        userName: userName 
    });

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
                <RepoList username={userName} />
            </UserInfo>
        </>
    )
}
