import React from 'react'
import UserAvatar from './UserAvatar'
import Image from "next/image";
import { GitHubUser } from '@/type/type'
import { Separator } from './ui/separator';
import { IoIosLink } from 'react-icons/io';
import Link from 'next/link';

interface UserInfoProps {
    user: GitHubUser | null;
    children: React.ReactNode;
}

export default function UserInfo({
    user,
    children
}: UserInfoProps) {
    return (
        <div className='max-w-[760px] mx-auto bg-white'>
            <div className='w-full h-full rounded-xl relative'>
                <Image width={768} height={200} priority={true} src="/images/1280.jpg" alt={''} />
                <div className='absolute bottom-[-25px] left-6 md:bottom-[-35px] md:left-10'>
                    <div className='hidden md:block'>
                        <UserAvatar src={user?.avatar_url} width={130} height={130} />
                    </div>
                    <div className='md:hidden'>
                        <UserAvatar src={user?.avatar_url} width={60} height={60} />
                    </div>
                </div>
            </div>
            <div className='px-5 py-6 md:px-10 md:py-12'>
                <div className='px-2 md:px-4'>
                    <p className="text-sm md:text-md md:text-2xl font-bold">{user?.login}</p>
                    <b className='text-xs md:text-sm text-zinc-500'>@ {user?.login}</b>
                    {user?.blog && user.blog.trim() !== '' && (
                        <div className='flex items-center text-xs md:text-sm text-zinc-500'>
                            <IoIosLink size={14} />
                            <Link href={user.blog}>{user.blog}</Link>
                        </div>
                    )}
                    <Separator className='my-4' />
                </div>
                {children}
            </div>
        </div>
    )
}
