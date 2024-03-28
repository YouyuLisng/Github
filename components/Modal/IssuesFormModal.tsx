"use client"
import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserIssuesForm from '@/components/Form/UserIssuesForm';
import RepoIssuesForm from '@/components/Form/RepoIssuesForm';
import { useAuthContext } from '@/Context/auth';
interface IssuesFormModalProps {
    Type: "user" | "repo";
    reponame: string;
}

export function IssuesFormModal({ Type, reponame }: IssuesFormModalProps) {
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
                        {Type === "user" ? (
                            <FaEdit className='text-white' size={20} />
                        ) : (
                            <MdOutlineMessage className='text-white' size={20} />
                        )}
                    </div>
                </div>
                <DialogContent className="sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>{Type === "user" ? "發佈文章" : "留言"}</DialogTitle>
                    </DialogHeader>
                    {Type === "user" ? (
                        <UserIssuesForm currentUser={currentUser} accessToken={accessToken} handleCloseDialog={handleToggle} />
                    ) : (
                        <RepoIssuesForm currentUser={currentUser} reponame={reponame} accessToken={accessToken} handleCloseDialog={handleToggle} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
