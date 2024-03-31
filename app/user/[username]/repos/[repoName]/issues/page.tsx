import React from 'react';
import fetchUser from '@/app/actions/UserRepo/fetchUser';
import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import UserInfo from '@/components/UserInfo';
import { IssuesClientPage } from './page-client';

interface UsersProps {
    params: {
        userName: string;
        repoName: string;
    };
}
export async function generateMetadata({
    params: { userName },
}: UsersProps): Promise<Metadata> {
    const user = await fetchUser(userName);

    if (!user) {
        return {
            title: 'Not found',
        };
    }
    return {
        title: user.login,
    };
}

export default async function Users({
    params: { userName, repoName },
}: UsersProps) {
    const user = await fetchUser(userName);
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

    return (
        <UserInfo user={user}>
            <IssuesClientPage userName={userName} repoName={repoName} />
        </UserInfo>
    );
}
