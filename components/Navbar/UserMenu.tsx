"use client";

import { BiSolidDownArrow } from "react-icons/bi";

import { useCallback, useState } from 'react';

import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface UserMenuProps {
    currentUser?: any | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="p-2 md:py-1 md:px-2 text-sm font-bold text-white flex flex-row items-center gap-3 rounded-full cursor-pointer">
                    <Link href='/sigin'>註冊　/　登入</Link>
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
                                <MenuItem onClick={() => router.push('/profile')} label={`${currentUser.firstName}`} />
                                <MenuItem onClick={() => router.push('/cart')} label='購物車' />
                                <hr />
                                <MenuItem label='登出' onClick={function (): void {
                                    throw new Error("Function not implemented.");
                                } } />
                            </>
                        ):(
                            <>
                                <MenuItem label='服務條款' />
                                <MenuItem label='幫助中心'/>
                                <MenuItem label='聯繫我們'/>
                                <MenuItem label='品牌辨識'/>
                                <MenuItem label='徵才'/>
                                <MenuItem label='商業合作'/>
                                <MenuItem label='免費下載 App'/>
                                <MenuItem label='設定'/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
