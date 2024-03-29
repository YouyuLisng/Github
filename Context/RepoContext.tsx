import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import fetchUserRepos from '@/app/actions/UserRepo/fetchUserRepos';
import { Repository } from '@/type/type';

interface RepoDataContext {
    repoData: Repository[];
    setRepoData: React.Dispatch<React.SetStateAction<Repository[]>>;
    fetchRepoData: (username: string) => void;
    hasMoreRef: boolean;
}

const RepoDataContext = createContext<RepoDataContext | null>(null);

export const RepoDataProvider = ({ 
    children
}: { children: ReactNode }) => {
    const [repoData, setRepoData] = useState<Repository[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const hasMoreRef = useRef(true);

    const fetchRepoData = async (username: string) => {
        try {
            const newRepos = await fetchUserRepos(username, pageNumber, 10);
            if (newRepos) {
                setRepoData((prevRepo) => [...prevRepo, ...newRepos]);
                if (newRepos.length < 10) {
                    hasMoreRef.current = false;
                }
            }
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        } catch (error) {
            console.error('獲取資料時發生錯誤:', error);
        }
    };

    // 提供資料給 Context
    const value: RepoDataContext = {
        repoData,
        setRepoData,
        fetchRepoData,
        hasMoreRef: hasMoreRef.current,
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
