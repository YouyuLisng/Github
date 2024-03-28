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
import RepoEditIssuesForm from '@/components/Form/RepoEditIssuesForm';
import { useAuthContext } from '@/Context/auth'
import { GitHubIssue } from '@/type/type'
import MenuItem from '../Navbar/MenuItem';

interface EditIssuesFormModalProps {
    Type: "user" | "repo";
    reponame: string;
    issues: GitHubIssue;
}

export function EditIssuesFormModal({
    Type,
    reponame,
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
                        <DialogTitle>{Type === "user" ? "編輯文章" : "編輯留言"}</DialogTitle>
                    </DialogHeader>
                    {Type === "user" ? (
                        <UserEditIssuesForm currentUser={currentUser} accessToken={accessToken} handleCloseDialog={handleToggle} issues={issues} reponame={''} />
                    ) : (
                        <RepoEditIssuesForm currentUser={currentUser} reponame={reponame} accessToken={accessToken} handleCloseDialog={handleToggle} issues={issues} />
                    )}
                </DialogContent>
            </Dialog>
    )
}
