"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Loader';
import { IssuesItemSkeleton } from '@/components/Skeleton/IssuesItemSkeleton';
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues';
import { GitHubIssue } from '@/type/type';
import IssuesItem from '@/components/IssuesList/IssuesItem';
import { IssuesFormModal } from '../Modal/IssuesFormModal';
import { useIssuesData } from '@/Context/IssuesContext';
interface IssuesListProps {
    username: string;
}

export function IssuesList({
    username,
}: IssuesListProps) {
    const { issuesData, fetchIssuesData, resetIssuesData, hasMoreData, loading } = useIssuesData();

    useEffect(() => {
        resetIssuesData();
        fetchIssuesData(username);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [username]);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 150) {
            fetchIssuesData(username);
        }        
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 p-2 md:p-4 bg-white md:rounded-e-xl">
                {issuesData.length > 0 ? (
                    issuesData.map((issue: GitHubIssue, index: number) => (
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
                {!hasMoreData && <p className="text-center text-gray-500">沒有更多文章了</p>}
            </div>
            <IssuesFormModal Type={'user'} reponame={''} />
        </>
    );
}
