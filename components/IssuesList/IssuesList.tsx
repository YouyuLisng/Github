"use client";
import React, { useEffect } from 'react';
import Loader from '@/components/Loader';
import { IssuesItemSkeleton } from '@/components/Skeleton/IssuesItemSkeleton';
import { GitHubIssue } from '@/type/type';
import IssuesItem from '@/components/IssuesList/IssuesItem';
import { IssuesFormModal } from '../Modal/IssuesFormModal';
import { useIssuesData } from '@/Context/IssuesContext';

interface IssuesListProps {
    userName: string;
    repoName: string;
}

export function IssuesList({
    userName,
    repoName
}: IssuesListProps) {
    const { issuesData, fetchIssuesData, resetIssuesData, hasMoreRef, loading } = useIssuesData();

    useEffect(() => {
        resetIssuesData();
        fetchIssuesData(userName, repoName);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [userName]);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 150) {
            fetchIssuesData(userName, repoName);
        }        
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {issuesData.length > 0 ? (
                    issuesData.map((issue: GitHubIssue, index: number) => (
                        <div key={index}>
                            <IssuesItem issue={issue} userName={userName} repoName={repoName} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <IssuesItemSkeleton key={index} />
                    ))
                )}
                {loading && <Loader />}
                {!hasMoreRef && <p className="text-center text-gray-500">沒有更多文章了</p>}
            </div>
            <IssuesFormModal Type={'user'} reponame={''} />
        </>
    );
}
