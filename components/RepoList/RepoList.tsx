"use client";
import React, { useEffect } from 'react';
import Loader from '@/components/Loader';
import { IssuesItemSkeleton } from '@/components/Skeleton/IssuesItemSkeleton';
import { Repository } from '@/type/type';
import RepoItem from '@/components/RepoList/RepoItem';
import { useRepoData } from '@/Context/RepoContext';
import EmptyState from '@/components/EmptyState';

interface RepoListProps {
    username: string;
}

export function RepoList({
    username,
}: RepoListProps) {
    const { repoData, fetchRepoData, resetRepoData, hasMoreRef, loadingRef, loading } = useRepoData();

    useEffect(() => {
        resetRepoData();
        fetchRepoData(username);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [username]);
    
    const handleScroll = () => {
        if (!loading && window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 150) {
            fetchRepoData(username);
        }        
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {Array.from({ length: 10 }).map((_, index) => (
                    <IssuesItemSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (repoData.length === 0) {
        return (
            <EmptyState
                title={`${username} 目前尚未發佈倉儲`}
                subtitle="Not Found"
                showReaet={true}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
            {repoData.map((repo: Repository, index: number) => (
                <div key={index}>
                    <RepoItem repo={repo} />
                </div>
            ))}
            {loadingRef && <Loader />}
            {!hasMoreRef && <p className="text-center text-gray-500">沒有更多資料了</p>}
        </div>
    );
}
