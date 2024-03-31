"use client"
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserIssuesForm from '@/components/Form/UserIssuesForm';
import { useAuthContext } from '@/Context/auth';

interface IssuesFormModalProps {
    userName: string;
    repoName: string;
}

export function IssuesFormModal({ userName, repoName }: IssuesFormModalProps) {
    const { currentUser, accessToken } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    
    if (!currentUser) {
        return null;
    }
    
    return (
        <>
            <Dialog onOpenChange={handleToggle} open={isOpen}>
                <div className="fixed bottom-10 right-10 bg-sky-500 rounded-md cursor-pointer z-50">
                    <div onClick={handleToggle} className='p-2'>
                        <FaEdit className='text-white' size={20} />
                    </div>
                </div>
                <DialogContent className="sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>發佈文章</DialogTitle>
                    </DialogHeader>
                    <UserIssuesForm userName={userName} accessToken={accessToken} handleCloseDialog={handleToggle} repoName={repoName} />
                </DialogContent>
            </Dialog>
        </>
    );
}
