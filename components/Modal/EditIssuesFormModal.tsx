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
import EditIssuesForm from '@/components/Form/EditIssuesForm';
import { useAuthContext } from '@/Context/auth'
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { GitHubIssue } from '@/type/type'
import fetchIssues from '@/app/actions/Issues/fetchIssues';

interface EditIssuesFormModalProps {
    issues: GitHubIssue;
}

export function EditIssuesFormModal({
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

    if (currentUser.login !== issues.user.login) {
        return null
    }

    return (
            <Dialog onOpenChange={handleToggle} open={isOpen}>
                <div onClick={handleToggle} className='p-2 cursor-pointer'>
                    <HiOutlineDotsHorizontal className='me-2' size={20} />
                </div>
                <DialogContent className="sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>編輯文章</DialogTitle>
                    </DialogHeader>
                    <EditIssuesForm currentUser={currentUser} accessToken={accessToken} handleCloseDialog={handleToggle} issues={issues} />
                </DialogContent>
            </Dialog>
    )
}
