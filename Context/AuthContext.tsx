"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from '@/api/github/fetchCurrentUser';
import { GitHubUser } from '@/type/type';

interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContext {
    accessToken: string;
    setAccessToken: (token: string) => void;
    currentUser: GitHubUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<GitHubUser | null>>;
    handleGitHubLogin: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: AuthContextProps) => {
    const [accessToken, setAccessTokenState] = useState<string>(() => {
        return typeof window !== 'undefined' ? localStorage.getItem('access_token') || '' : '';
    });
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);

    const handleGitHubLogin = () => {
        const clientId = process.env.GITHUB_ID;
        const scope = 'repo';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
        window.location.href = authUrl;
    };

    useEffect(() => {
        const fetchCurrentUserAndRepo = async () => {
            if (accessToken) {
                try {
                    const user = await fetchCurrentUser({
                        token: accessToken
                    });
                    setCurrentUser(user);
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
        <AuthContext.Provider value={{ accessToken, setAccessToken, currentUser, setCurrentUser, handleGitHubLogin }}>
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

