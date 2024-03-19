import React from 'react'
import fetchUserRepos from '@/app/actions/fetchUserRepos'
import fetchUser from '@/app/actions/fetchUser'

interface ReposPageProps {
    params: {
        username: string;
    };
}
export default async function ReposPage({ params: { username } } : ReposPageProps) {
    const user = await fetchUser(username);
    const userRepo = await fetchUserRepos(username);
    return (
        <div className='max-w-[760px] min-h-[300px] rounded-xl mx-auto bg-white'>
            <p className='text-black'>{user.items[0].login}</p>
        </div>
    )
}
