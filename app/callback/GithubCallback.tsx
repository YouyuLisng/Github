"use client"
import React, { useEffect } from 'react';
import PageLoad from '../loading';
import { useRouter } from "next/navigation";

export default function GithubCallback() {
    const router = useRouter();
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');

        if (code) {
            const clientId = '1d6c5925798aa7391380';
            const clientSecret = '9e733dd6bc55c1034ecf7b76796134f98e4e08ff';
            const redirect_uri = 'http://localhost:3000/'
            const data = {
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirect_uri,
                code: code,
            };

            fetch('/api/github', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('accessToken', data.access_token);
                router.push('/');
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
        }
    }, []);
    
    return (
        <PageLoad />
    );
}
