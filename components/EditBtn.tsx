"use client"
import React, { useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
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

export default function EditBtn() {
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
                <div onClick={handleToggle} className='p-2'>
                    <HiOutlineDotsHorizontal className='me-2' size={20} />
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
