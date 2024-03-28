"use client"
import React from 'react'
import Avatar from '../Avatar'
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5'
import Time from '../Time'
import { Repository } from '@/type/type'

interface MarkdownPostProps {
    username: string;
    RepoData: Repository;
    children: React.ReactNode;
}

export default function MarkdownPost({
    username,
    RepoData,
    children
}: MarkdownPostProps) {
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                        <Avatar src={RepoData.owner.avatar_url} width={32} height={32} />
                        <p className="px-2 text-sm">{username}</p>
                    </div>
                    <div>
                        <Link href={`/repo/${username}`}>
                            <IoCloseOutline size={20} />
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl mb-4'>{RepoData.name}</h1>
                    <Time time={RepoData.created_at} />
                    <div className='mt-4 text-xs md:text-sm text-zinc-500'>
                        {RepoData.description}
                    </div>
                    <div className='mt-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
