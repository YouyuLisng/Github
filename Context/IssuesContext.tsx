import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import { fetchIssues } from '@/api/github/fetchIssues'; // 假設有對應的 fetchIssues 函數
import { GitHubIssue } from '@/type/type';

interface IssueDataContext {
    issuesData: GitHubIssue[];
    fetchIssuesData: (username: string, reponame: string) => void;
    resetIssuesData: () => void;
    hasMoreRef: boolean;
    loadingRef: boolean;
    loading: boolean;
}

const IssueDataContext = createContext<IssueDataContext | null>(null);

export const IssuesProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [issuesData, setIssueData] = useState<GitHubIssue[]>([]);
    const pageNumber = useRef<number>(1);
    const hasMoreRef = useRef<boolean>(true);
    const loadingRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIssuesData = async (username: string, reponame: string) => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const newIssues = await fetchIssues({
                userName: username,
                repoName: reponame,
                query: {
                    sort: 'created',
                    page: pageNumber.current,
                    perPage: 10,
                },
            });
            if (newIssues) {
                setIssueData((prevIssues) => [...prevIssues, ...newIssues]);
                if (newIssues.length < 10) {
                    hasMoreRef.current = false;
                }
                pageNumber.current += 1;
            }
        } catch (error) {
            console.error('獲取資料時發生錯誤:', error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    const resetIssuesData = () => {
        setIssueData([]);
        pageNumber.current = 1;
        hasMoreRef.current = true;
    };

    const value: IssueDataContext = {
        issuesData,
        fetchIssuesData,
        resetIssuesData,
        hasMoreRef: hasMoreRef.current,
        loadingRef: loadingRef.current,
        loading
    };

    return (
        <IssueDataContext.Provider value={value}>
            {children}
        </IssueDataContext.Provider>
    );
};

export const useIssuesData = () => {
    const context = useContext(IssueDataContext);
    if (!context) {
        throw new Error('useIssueData must be used within an IssueDataProvider');
    }
    return context;
};
