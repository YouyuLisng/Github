// GitHubLogin.tsx
import React from 'react'

export default function GithubLogin() {
    const handleGitHubLogin = () => {
        const clientId = '1d6c5925798aa7391380';
        const redirectUri = 'http://localhost:3000/callback';
        const scope = 'user';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };

    return (
        <button onClick={handleGitHubLogin}>登入</button>
    );
}