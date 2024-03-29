import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import fetchAllIssues from '@/app/actions/Issues/fetchAllIssues';
import { GitHubIssue } from '@/type/type';

interface IssuesDataContext {
    issuesData: GitHubIssue[];
    fetchIssuesData: (username: string) => void;
    resetIssuesData: () => void;
    hasMoreRef: boolean;
    loadingRef: boolean;
    loading: boolean;
}

const IssuesContext = createContext<IssuesDataContext | null>(null);

export const IssuesProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [issuesData, setIssuesData] = useState<GitHubIssue[]>([]);
    const pageNumber = useRef<number>(1);
    const hasMoreRef = useRef<boolean>(true);
    const loadingRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchIssuesData = async (username: string) => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const newIssues = await fetchAllIssues(username, pageNumber.current);
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
            loadingRef.current = false;
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
        hasMoreRef: hasMoreRef.current,
        loadingRef: loadingRef.current,
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
