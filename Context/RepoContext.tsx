import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import fetchUserRepos from '@/app/actions/UserRepo/fetchUserRepos';
import fetchAllIssues from '@/app/actions/Repo/fetchAllIssues';
import editIssues from '@/app/actions/Repo/editIssues';
import closeIssues from '@/app/actions/Repo/closeIssues';
import { Repository, GitHubIssue } from '@/type/type';

interface RepoDataContext {
    repoData: Repository[];
    repoIssues: GitHubIssue[];
    fetchRepoData: (username: string) => void;
    resetRepoData: () => void;
    fetchRepoIssues: (username: string, reponame: string, issuesNumber: number) => void;
    editRepoIssues: (username: string, reponame: string, issuesNumber: number, values: any, accessToken: string) => Promise<boolean>;
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
            setLoading(false);
        }
    };

    const [repoIssues, setRepoIssues] = useState<GitHubIssue[]>([]);

    const fetchRepoIssues = async (username: string, reponame: string, issuesNumber: number) => {
        try {
            const response = await fetchAllIssues(username, reponame, issuesNumber);
            return response;
        } catch (error) {
            console.error('fetchRepoIssues error:', error);
            return false;
        }
    };

    const editRepoIssues = async (username: string, reponame: string, issuesNumber: number, values: any, accessToken: string): Promise<boolean> => {
        try {
            const response = await editIssues(username, reponame, issuesNumber, values, accessToken);
            return response;
        } catch (error) {
            console.error('edit erroe:', error);
            return false;
        }
    };

    const resetRepoData = () => {
        setRepoData([]);
        pageNumber.current = 1;
        hasMoreRef.current = true;
    };

    const value: RepoDataContext = {
        repoData,
        repoIssues,
        fetchRepoData,
        resetRepoData,
        fetchRepoIssues,
        editRepoIssues,
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
