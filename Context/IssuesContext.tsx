import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import { fetchIssues } from '@/api/github/fetchIssues';
import { GitHubIssue } from '@/type/type';

interface IssuesDataContext {
    issuesData: GitHubIssue[];
    fetchIssuesData: (username: string, reponame: string) => void;
    resetIssuesData: () => void;
    hasMoreData: boolean;
    loading: boolean;
}

const IssuesContext = createContext<IssuesDataContext | null>(null);

export const IssuesProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [issuesData, setIssuesData] = useState<GitHubIssue[]>([]);
    const pageNumber = useRef<number>(1);
    const hasMoreRef = useRef<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIssuesData = async (username: string, reponame: string) => {
        if (loading || !hasMoreRef.current) return;
        
        setLoading(true);

        try {
            const newIssues = await fetchIssues(
                {
                    userName: username,
                    repoName: reponame,
                    query: {
                        sort: 'created',
                        page: pageNumber.current,
                        perPage: 10,
                    },
                }
            );
            if (newIssues) {
                setIssuesData((prevIssues) => [...prevIssues, ...newIssues]);
                if (newIssues.length < 10) {
                    hasMoreRef.current = false;
                }
                pageNumber.current += 1;
            }
        } catch (error) {
            console.error('獲取資料時發生錯誤:', error);
        } finally {
            setLoading(false);
        }
    };


    const resetIssuesData = () => {
        setIssuesData([]);
        pageNumber.current = 1;
        hasMoreRef.current = true;
    };

    const value: IssuesDataContext = {
        issuesData,
        fetchIssuesData,
        resetIssuesData,
        hasMoreData: hasMoreRef.current,
        loading
    };

    return (
        <IssuesContext.Provider value={value}>
            {children}
        </IssuesContext.Provider>
    );
};

export const useIssuesData = () => {
    const context = useContext(IssuesContext);
    if (!context) {
        throw new Error('useIssuesData must be used within an IssuesProvider');
    }
    return context;
};
