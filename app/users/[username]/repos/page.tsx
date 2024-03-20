import React, { use } from 'react'
import fetchUserRepos from '@/app/actions/fetchUserRepos'
import fetchUser from '@/app/actions/fetchUser'
import Avatar from '@/components/Avatar';
import { UserRepoList } from '@/components/UserRepoList/UserRepoList';

interface ReposPageProps {
    params: {
        username: string;
    };
}
export default async function ReposPage({ params: { username } } : ReposPageProps) {
    const user = await fetchUser(username);
    const repo = await fetchUserRepos(username, 1, 10);
    return (
        <>
            <div className='max-w-[760px] mx-auto md:px-2 px-2 bg-white'>
                <div className='max-w-[760px] min-h-[250px] rounded-xl'>
                    <img className='w-full h-full rounded-xl' src="/images/1280.jpg" alt="" />
                </div>
                <div className='p-6'>
                    <div className='flex items-center'>
                        <Avatar src={user.items[0].avatar_url} width={40} height={40} />
                        <p className="px-4 text-2xl font-bold">{user.items[0].login}</p>
                    </div>
                    <UserRepoList username={username} repo={repo} />
                </div>
            </div>
        </>
    )
}
