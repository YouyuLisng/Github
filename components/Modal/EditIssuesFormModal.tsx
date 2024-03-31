"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UserEditIssuesForm from '@/components/Form/UserEditIssuesForm';
import { useAuthContext } from '@/Context/auth'
import { GitHubIssue } from '@/type/type'
import MenuItem from '../Navbar/MenuItem';

interface EditIssuesFormModalProps {
    userName: string;
    repoName: string;
    issues: GitHubIssue;
}

export function EditIssuesFormModal({
    userName,
    repoName,
    issues,
}: EditIssuesFormModalProps) {
    const { currentUser, accessToken } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    if (!currentUser) {
        return null
    }

    return (
            <Dialog onOpenChange={handleToggle} open={isOpen}>
                <div onClick={handleToggle} className='cursor-pointer'>
                    <MenuItem label='編輯' />
                </div>
                <DialogContent className="sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>編輯文章</DialogTitle>
                    </DialogHeader>
                    <UserEditIssuesForm userName={userName} accessToken={accessToken} handleCloseDialog={handleToggle} issues={issues} repoName={repoName} />
                </DialogContent>
            </Dialog>
    )
}
