import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import fetchUserRepos from '@/app/actions/UserRepo/fetchUserRepos';
import { Repository } from '@/type/type';

interface RepoDataContext {
    repoData: Repository[];
    setRepoData: React.Dispatch<React.SetStateAction<Repository[]>>;
    fetchRepoData: (username: string) => void;
    resetRepoData: () => void;
    hasMoreRef: boolean;
    loadingRef: boolean;
}

const RepoDataContext = createContext<RepoDataContext | null>(null);

export const RepoDataProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [repoData, setRepoData] = useState<Repository[]>([]);
    const pageNumber = useRef<number>(1);
    const hasMoreRef = useRef<boolean>(true);
    const loadingRef = useRef<boolean>(false);

    const fetchRepoData = async (username: string) => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;

        try {
            const newRepos = await fetchUserRepos(username, pageNumber.current, 10);
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
        }
    };

    const resetRepoData = () => {
        setRepoData([]);
        pageNumber.current = 1
        hasMoreRef.current = true;
    };

    // 提供資料給 Context
    const value: RepoDataContext = {
        repoData,
        setRepoData,
        fetchRepoData,
        resetRepoData,
        hasMoreRef: hasMoreRef.current,
        loadingRef: loadingRef.current
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
