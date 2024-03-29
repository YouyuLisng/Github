"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader';
import { IssuesItemSkeleton } from '@/components/Skeleton/IssuesItemSkeleton';
import fetchUserRepos from '@/app/actions/UserRepo/fetchUserRepos';
import { Repository } from '@/type/type';
import RepoItem from '@/components/RepoList/RepoItem';
import { useRepoData } from '@/Context/RepoContext';

interface  RepoListProps {
    username: string;
    repo: Repository[];
}

export function RepoList({
    username,
    repo,
}: RepoListProps) {
    const { repoData, fetchRepoData, resetRepoData, hasMoreRef, loadingRef } = useRepoData();

    useEffect(() => {
        resetRepoData();
        fetchRepoData(username);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [username]);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMoreRef) return;
        fetchRepoData(username);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {repoData.length > 0 ? (
                    repoData.map((repo: Repository, index: number) => (
                        <div key={index}>
                            <RepoItem repo={repo} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <IssuesItemSkeleton key={index} />
                    ))
                )}
                {loadingRef && <Loader />}
                {!hasMoreRef && <p className="text-center text-gray-500">沒有更多資料了</p>}
            </div>
        </>
    );
}
