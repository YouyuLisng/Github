import React, { useCallback, useEffect, useState } from 'react';
import { BiSolidDownArrow } from "react-icons/bi";
import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import Avatar from "../Avatar";
import { useAuthContext } from '@/Context/AuthContext'

const UserMenu = () => {
    const router = useRouter();
    
    const { setAccessToken, currentUser, setCurrentUser, handleGitHubLogin } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            const clientId = '1d6c5925798aa7391380';
            const clientSecret = '9e733dd6bc55c1034ecf7b76796134f98e4e08ff';
            const data = {
                client_id: clientId,
                client_secret: clientSecret,
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
                localStorage.setItem('access_token', data.access_token);
                setAccessToken(data.access_token);
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
        }
    }, []);

    const handleLogout = () => {
        setAccessToken('');
        setCurrentUser(null);
        toggleOpen();
    };

    return (
        <div className="relative">
            <div  onClick={toggleOpen} className="flex flex-row items-center gap-3">
                <div className="p-2 md:py-1 text-xs md:px-2 md:text-sm font-bold text-white flex flex-row items-center gap-3 rounded-full cursor-pointer">
                    <Avatar src={currentUser ? currentUser.avatar_url : null} width={30} height={30} />
                    <span>
                        <BiSolidDownArrow size={12} />
                    </span>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[150px] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>  
                                <MenuItem onClick={() => { router.push(`/user/${currentUser.login}/repos`); toggleOpen(); }} label={currentUser.login} />
                                <hr />
                                <MenuItem label='登出' onClick={() => {handleLogout(); }} />
                            </>
                        ) : (
                            <>
                                <MenuItem label='服務條款' />
                                <MenuItem label='幫助中心'/>
                                <MenuItem label='聯繫我們'/>
                                <MenuItem label='品牌辨識'/>
                                <MenuItem label='徵才'/>
                                <MenuItem label='商業合作'/>
                                <MenuItem label='免費下載 App'/>
                                <MenuItem label='設定'/>
                                <MenuItem onClick={() => { handleGitHubLogin(); toggleOpen(); }} label='登入' />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;