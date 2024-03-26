"use client";
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/Loader';
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues';
import { GitHubIssue } from '@/type/type';
import PostItem from './PostItem';
import EmptyState from '../EmptyState';
import { SkeletonItem } from '@/components/Skeleton';

interface PostListProps {
    username: string
}

export function PostList({
    username
}: PostListProps) {
    console.log('PostList 重新渲染了');
    const [posts, setPosts] = useState<GitHubIssue[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const pageNumber = useRef(1);
    const hasMoreRef = useRef(true);

    useEffect(() => {
        loadPosts();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadPosts = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        setLoading(true);
        loadingRef.current = true;
        const scrollPosition = window.scrollY;
        try {
            const newPosts = await fetchAllIssues(username, pageNumber.current); // 修改此處的函式名稱為 fetchPosts
            if (newPosts) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                if (newPosts.length < 10) {
                    hasMoreRef.current = false;
                }
            }
            pageNumber.current += 1;
        } catch (error) {
            console.error('加載資料時發生錯誤:', error);
            hasMoreRef.current = false;
        } finally {
            loadingRef.current = false;
            setLoading(false);

            window.scrollTo(0, scrollPosition);
        }
    };         
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) 
        return;
        loadPosts();
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-4 bg-white md:rounded-e-xl">
                {posts.length > 0 ? (
                    posts.map((post: GitHubIssue, index: number) => (
                        <div key={index}>
                            <PostItem post={post} username={username} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonItem key={index} />
                    ))
                )}
                {loading && <SkeletonItem />}
                {!hasMoreRef.current && <p className="text-center text-gray-500">沒有更多文章了</p>}
            </div>
        </>
    );
}
