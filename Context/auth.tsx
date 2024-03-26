"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import getCurrentUser from '@/app/actions/CurrentUser/fetchCurrentUser';
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
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token') || '';
        } else {
            return '';
        }
    });
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
    
    const handleGitHubLogin = () => {
        const clientId = '1d6c5925798aa7391380';
        const redirectUri = 'http://localhost:3000/';
        const scope = 'repo';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (accessToken) {
                try {
                    const user = await getCurrentUser(accessToken);
                    setCurrentUser(user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchCurrentUser();
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
        throw new Error('useAuthContext 必須在 AuthProvider 中使用');
    }
    return context;
};
