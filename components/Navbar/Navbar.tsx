"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Container from "@/components/Container";
import Logo from "@/components/Navbar/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { GitHubUser } from '@/type/type';
import getCurrentUser from '@/app/actions/fetchCurrentUser';
const Navbar = () => {
    const [currentUser, setCurrentUser] = useState<GitHubUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null | undefined>(null);
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            const clientId = '1d6c5925798aa7391380';
            const clientSecret = '9e733dd6bc55c1034ecf7b76796134f98e4e08ff';
            const redirect_uri = 'http://localhost:3000/';
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
                setAccessToken(data.access_token);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
        }
    }, []);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (accessToken) {
                console.log(accessToken)
                try {
                    const user = await getCurrentUser(accessToken);
                    console.log(user);
                    setCurrentUser(user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchCurrentUser();
    }, [accessToken]); // 將 accessToken 加入 useEffect 的依賴項目中
    return(
        <div className="fixed w-full bg-headerblue z-10 shadow-sm">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:-gap-0 px-2">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
    )
}

export default Navbar;