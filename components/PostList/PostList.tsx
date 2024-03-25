"use client";
import React, { useEffect, useRef, useState } from 'react';
import Loader from '@/components/Loader';
import { SkeletonItem } from '@/components/Skeleton';
import fetchUserPost from '@/app/actions/Issues/fetchAllIssues';
import { GitHubIssue } from '@/type/type';
import PostItem from './PostItem';
import EmptyState from '../EmptyState';

interface PostListProps {
    data: GitHubIssue[];
    username: string
}

export function PostList({
    data,
    username
}: PostListProps) {
    console.log('PostList 重新渲染了');
    const [posts, setPosts] = useState<GitHubIssue[]>(data);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const pageNumber = useRef(2);
    const hasMoreRef = useRef(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadPosts = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        setLoading(true);
        loadingRef.current = true;
        const scrollPosition = window.scrollY;
        try {
            const newPosts = await fetchUserPost(username, pageNumber.current); // 修改此處的函式名稱為 fetchPosts
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
                    <EmptyState />
                )}
                {loading && <Loader />}
            </div>
        </>
    );
}
