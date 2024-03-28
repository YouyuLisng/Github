"use client"
import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import IssuesForm from './Form/UserIssuesForm';

import { useAuthContext } from '@/Context/auth'

export default function PostBtn() {
    const { currentUser, accessToken } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    if(!currentUser) {
        return null
    }

    return (
        <>
            <Dialog onOpenChange={handleToggle} open={isOpen}>
                <div className="fixed bottom-10 right-10 bg-sky-500 rounded-md cursor-pointer z-50">
                    <div onClick={handleToggle} className='p-2'>
                        <FaEdit className='text-black' size={20} />
                    </div>
                </div>
                <DialogContent className="sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>Add Issues</DialogTitle>
                    </DialogHeader>
                    <IssuesForm currentUser={currentUser} accessToken={accessToken} handleCloseDialog={handleToggle} />
                </DialogContent>
            </Dialog>
        </>
    )
}
