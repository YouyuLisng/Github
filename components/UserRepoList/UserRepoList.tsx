"use client";
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { SkeletonItem } from '@/components/Skeleton';
import fetchUserRepos from '@/app/actions/fetchUserRepos';
import { Repository } from '@/type/type';
import RepoItem from '../RepoItem';

interface  UserRepoListProps {
    username: string;
}

export function UserRepoList({
    username
}: UserRepoListProps) {
    const [error, setError] = useState<string | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 新增一個狀態來標記是否還有更多資料

    useEffect(() => {
        loadRepos();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadRepos = async () => {
        if (loading || !hasMore) return; // 當沒有更多資料時停止請求
        setLoading(true);
        const newRepos = await fetchUserRepos(username, repos.length / 10 + 1);
        if (newRepos) {
            if (newRepos.length === 0) {
                setHasMore(false); // 如果返回的資料量為 0，則表示沒有更多資料了
            } else {
                setRepos(prevRepos => [...prevRepos, ...newRepos]);
            }
        }
        setLoading(false);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
        ) return;
        loadRepos();
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-4 bg-white md:rounded-e-xl">
                {repos.length > 0 ? (
                    repos.map((repo: Repository, index: number) => (
                        <div key={index}>
                            <RepoItem repo={repo} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonItem key={index} />
                    ))
                )}
                {loading && <Loader />}
                {!hasMore && <p className="text-center text-gray-500">沒有更多資料了</p>}
            </div>
        </>
    );
}
