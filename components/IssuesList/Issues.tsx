"use client"
import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import Link from 'next/link';
import Time from '../Time';
import { IoCloseOutline } from 'react-icons/io5';
import { GitHubIssue } from '@/type/type';
import ReactHtmlParser from 'react-html-parser';
import fetchIssues from '@/app/actions/Issues/fetchIssues';
import Loader from '../Loader'; // 引入 Loader 元件
import { EditIssuesFormModal } from '../Modal/EditIssuesFormModal';

interface IssuesProps {
    username: string;
    issue_number: number;
}

export default function Issues({
    username,
    issue_number,
}: IssuesProps) {
    const [issue, setIssue] = useState<GitHubIssue | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // 新增 loading 狀態變數

    useEffect(() => {
        const fetchIssueData = async () => {
            try {
                const data = await fetchIssues(username, issue_number);
                setIssue(data);
            } catch (error) {
                console.error('Error fetching issue:', error);
            } finally {
                setLoading(false); // 資料加載完成後設置 loading 為 false
            }
        };
        fetchIssueData();
    }, [username, issue_number]);
    
    return (
        <div className='p-6'>
            {loading ? ( // 如果 loading 為 true，顯示 Loader 元件
                <Loader />
            ) : (
                issue && (
                    <>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center'>
                                <Avatar src={issue.user.avatar_url} width={32} height={32} />
                                <p className="px-2 text-sm">{username}</p>
                            </div>
                            <div className='flex items-center'>
                                <EditIssuesFormModal issues={issue}  />
                                <Link href={`/users/${username}`}>
                                    <IoCloseOutline size={20} />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-3xl mb-4'>{issue.title}</h1>
                            <Time time={issue.created_at} />
                            <div className='mt-4 text-xs md:text-sm text-zinc-500'>
                                {ReactHtmlParser(issue.body.replace(/<a/g, '<span').replace(/<\/a>/g, '</span>'))}
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
}