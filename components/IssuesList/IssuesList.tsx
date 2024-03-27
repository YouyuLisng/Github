"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader';
import { IssuesItemSkeleton } from '@/components/Skeleton/IssuesItemSkeleton';
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues';
import { GitHubIssue } from '@/type/type';
import IssuesItem from '@/components/IssuesList/IssuesItem';
import { IssuesFormModal } from '../Modal/IssuesFormModal';
interface IssuesListProps {
    username: string;
}

export function IssuesList({
    username,
}: IssuesListProps) {
    const [issues, setIssues] = useState<GitHubIssue[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const pageNumber = useRef(1);
    const hasMoreRef = useRef(true);

    useEffect(() => {
        loadIssues();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadIssues = async () => {
        if (loadingRef.current || !hasMoreRef.current) return;

        setLoading(true);
        loadingRef.current = true;

        try {
            const newIssues = await fetchAllIssues(username, pageNumber.current);
            if (newIssues) {
                setIssues((prevIssues) => [...prevIssues, ...newIssues]);
                if (newIssues.length < 10) {
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
        loadIssues();
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {issues.length > 0 ? (
                    issues.map((issue: GitHubIssue, index: number) => (
                        <div key={index}>
                            <IssuesItem issue={issue} usename={username} />
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <IssuesItemSkeleton key={index} />
                    ))
                )}
                {loading && <Loader />}
                {!hasMoreRef.current && <p className="text-center text-gray-500">沒有更多文章了</p>}
            </div>
            <IssuesFormModal />
        </>
    );
}
