"use client";
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { SkeletonItem } from '@/components/Skeleton';
import fetchPublicRepositories from '@/app/actions/fetchRepos';
import { Repository } from '@/type/type';
import RepoItem from '../RepoItem';

export function RepoList() {
    const [error, setError] = useState<string | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadRepos();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadRepos = async () => {
        if (loading) return;
        setLoading(true);
        const newRepos = await fetchPublicRepositories(repos.length / 10 + 1);
        if (newRepos) {
            setRepos(prevRepos => [...prevRepos, ...newRepos]);
        }
        setLoading(false); 
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) 
        return;
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
                        <SkeletonItem key={index} /> // 使用 SkeletonItem 組件來顯示骨架內容
                    ))
                )}
                {loading && <Loader />}
            </div>
        </>
    );
}