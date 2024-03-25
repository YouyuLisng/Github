// AuthContext.tsx
"use client"
import React, { createContext, useContext, useState } from 'react';
interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContext {
    accessToken: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
    handleGitHubLogin: () => void;
}
const AuthContext = createContext<AuthContext | null>(null);
export const AuthProvider = ({ children }: AuthContextProps) => {
    const [accessToken, setAccessToken] = useState<string>('');

    const handleGitHubLogin = () => {
        const clientId = '1d6c5925798aa7391380';
        const redirectUri = 'https://dcard-demo.vercel.app/';
        const scope = 'user';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };
    
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, handleGitHubLogin}}>
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

export default AuthProvider;