import React from 'react';
import fetchIssues from '@/app/actions/Issues/fetchIssues';
import Avatar from '@/components/Avatar';
import { IoCloseOutline } from "react-icons/io5";
import Link from 'next/link';
import Time from '@/components/Time';
import MarkdownViewer from '@/components/Markdown';
import type { Metadata } from "next";
interface RepoPageProps {
    params: {
        username: string;
        issue_number: number;
    };
}

export async function generateMetadata( { params: { username, issue_number } }: RepoPageProps): Promise<Metadata> {
    const Issues = await fetchIssues(username, issue_number);
    return {
        title:`${username}`,
    }
}

export default async function RepoPage({ params: { username, issue_number } } : RepoPageProps) {
    const Issues = await fetchIssues(username, issue_number);
    return (
        <div className='max-w-[1320px] mx-auto md:px-2 px-2 bg-white rounded-lg'>
            <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                        <Avatar src={Issues.user.avatar_url} width={32} height={32} />
                        <p className="px-2 text-sm">{username}</p>
                    </div>
                    <div>
                        <Link href={`/users/${username}/repos`}>
                            <IoCloseOutline size={20} />
                        </Link>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl mb-4'>{Issues.title}</h1>
                    <Time time={Issues.created_at} />
                    <div className='mt-4'>
                    <p className="text-xs md:text-sm text-zinc-500 truncate whitespace-nowrap overflow-hidden" dangerouslySetInnerHTML={{ __html: Issues.body }}></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
