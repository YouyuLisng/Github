"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import getCurrentUser from '@/app/actions/CurrentUser/fetchCurrentUser';
import fetchFirstRepo from '@/app/actions/Issues/fetchFirstRepo';
import { GitHubUser } from '@/type/type';

interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContext {
    accessToken: string;
    setAccessToken: (token: string) => void;
    currentUser: GitHubUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<GitHubUser | null>>;
    reponame: string;
    handleGitHubLogin: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [accessToken, setAccessTokenState] = useState<string>(() => {
        return typeof window !== 'undefined' ? localStorage.getItem('access_token') || '' : '';
    });
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
    const [reponame, setReponame] = useState('');

    const handleGitHubLogin = () => {
        const clientId = '1d6c5925798aa7391380';
        const scope = 'repo';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;

        window.location.href = authUrl;
    };

    useEffect(() => {
        const fetchCurrentUserAndRepo = async () => {
            if (accessToken) {
                try {
                    const user = await getCurrentUser(accessToken);
                    setCurrentUser(user);
                    const repo = await fetchFirstRepo(user?.login);
                    setReponame(repo.name);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchCurrentUserAndRepo();
    }, [accessToken]);

    const setAccessToken = (token: string) => {
        setAccessTokenState(token);
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', token);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, currentUser, setCurrentUser, reponame, handleGitHubLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};

