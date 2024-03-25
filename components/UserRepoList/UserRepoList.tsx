"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader';
import { SkeletonItem } from '@/components/Skeleton';
import fetchUserRepos from '@/app/actions/fetchUserRepos';
import { Repository } from '@/type/type';
import UserRepoItem from '@/components/UserRepoList/UserRepoItem';

interface  UserRepoListProps {
    username: string;
    repo: Repository[];
}

export function UserRepoList({
    username,
    repo,
}: UserRepoListProps) {
    const [repos, setRepos] = useState<Repository[]>(repo);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const pageNumber = useRef(2);
    const hasMoreRef = useRef(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadRepos = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;
    
        setLoading(true);
        loadingRef.current = true;
    
        try {
            const newRepos = await fetchUserRepos(username, pageNumber.current, 10);
            if (newRepos) {
                setRepos((prevRepos) => [...prevRepos, ...newRepos]);
                if (newRepos.length < 10) {
                    hasMoreRef.current = false;
                }
            }
            pageNumber.current += 1;
        } catch (error) {
            console.error('加載資料時發生錯誤:', error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMoreRef.current) return;
        loadRepos();
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {repos.length > 0 ? (
                    repos.map((repo: Repository, index: number) => (
                        <div key={index}>
                            <UserRepoItem repo={repo} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonItem key={index} />
                    ))
                )}
                {loading && <Loader />}
                {!hasMoreRef.current && <p className="text-center text-gray-500">沒有更多資料了</p>}
            </div>
        </>
    );
}
