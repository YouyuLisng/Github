import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import { fetchRepos } from '@/api/github/fetchRepos';
import { Repository, GitHubIssue } from '@/type/type';

interface RepoDataContext {
    repoData: Repository[];
    fetchRepoData: (username: string) => void;
    resetRepoData: () => void;
    hasMoreRef: boolean;
    loadingRef: boolean;
    loading: boolean;
}

const RepoDataContext = createContext<RepoDataContext | null>(null);

export const RepoDataProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [repoData, setRepoData] = useState<Repository[]>([]);
    const pageNumber = useRef<number>(1);
    const hasMoreRef = useRef<boolean>(true);
    const loadingRef = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRepoData = async (username: string) => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoading(true);

        try {
            const newRepos = await fetchRepos({
                userName: username,
                query: {
                    sort: 'created',
                    page: pageNumber.current,
                    perPage: 10,
                },
            });
            if (newRepos) {
                setRepoData((prevRepo) => [...prevRepo, ...newRepos]);
                if (newRepos.length < 10) {
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

    const resetRepoData = () => {
        setRepoData([]);
        pageNumber.current = 1;
        hasMoreRef.current = true;
    };

    const value: RepoDataContext = {
        repoData,
        fetchRepoData,
        resetRepoData,
        hasMoreRef: hasMoreRef.current,
        loadingRef: loadingRef.current,
        loading
    };

    return (
        <RepoDataContext.Provider value={value}>
            {children}
        </RepoDataContext.Provider>
    );
};

export const useRepoData = () => {
    const context = useContext(RepoDataContext);
    if (!context) {
        throw new Error('useRepoData must be used within a RepoDataProvider');
    }
    return context;
};
