import React, { useCallback, useEffect, useState } from 'react';
import { BiSolidDownArrow } from "react-icons/bi";
import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/app/actions/fetchCurrentUser';
import Avatar from "../Avatar";
import { GitHubUser } from '@/type/type';

interface UserMenuProps {
    currentUser?: GitHubUser | null
}

const UserMenu = ({
    currentUser
}: UserMenuProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    const handleGitHubLogin = () => {
        const clientId = '1d6c5925798aa7391380';
        const redirectUri = 'http://localhost:3000/';
        const scope = 'user';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

        window.location.href = authUrl;
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        toggleOpen();
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="p-2 md:py-1 text-xs md:px-2 md:text-sm font-bold text-white flex flex-row items-center gap-3 rounded-full cursor-pointer">
                    <Avatar src={currentUser ? currentUser.avatar_url : null} width={30} height={30} />
                    <span>
                        <BiSolidDownArrow onClick={toggleOpen} size={12} />
                    </span>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[150px] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>  
                                <MenuItem label={currentUser.login} />
                                <MenuItem onClick={() => router.push('/profile')} label='個人資料' />
                                <hr />
                                <MenuItem label='登出' onClick={handleLogout} />
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
                                <MenuItem onClick={handleGitHubLogin} label='登入'/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
