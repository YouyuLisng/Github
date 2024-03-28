import React, { useCallback, useState } from 'react';
import Avatar from '@/components/Avatar';
import { GitHubIssue } from '@/type/type';
import Time from '../Time';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { EditIssuesFormModal } from '../Modal/EditIssuesFormModal';
import MenuItem from '../Navbar/MenuItem';
import { useAuthContext } from '@/Context/auth';
import closeIssues from '@/app/actions/Markdown/closeIssues';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface MarkdownIssuesItemProps {
    issue: GitHubIssue;
    username: string;
    reponame: string
}
function MarkdownIssuesItem({
    issue,
    username,
    reponame
}: MarkdownIssuesItemProps) {
    const router = useRouter();
    const { currentUser, accessToken } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    const closeIssue = async () => {
        try {
            await closeIssues(username, reponame, issue.number, accessToken);
            toast.success('成功');
            router.push(`/user/${username}`)
        } catch (error) {
            console.error('Error closing issue:', error);
        }
    };
    return (
        <article className="border-b">
            <div className="py-2 md:py-4">
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        <Avatar src={issue.user.avatar_url} width={20} height={20} />
                        <p className="px-2 text-sm text-zinc-500">{issue.user.login}</p>
                        <Time time={issue.created_at} />
                    </div>
                    <div className='flex items-center'>
                        {currentUser && currentUser.login === issue.user.login && (
                            <div className='relative'>
                                <HiOutlineDotsHorizontal onClick={toggleOpen} className='me-2 cursor-pointer' size={20} />
                                {isOpen && (
                                    <div className="absolute rounded-xl shadow-md w-[100px] bg-white overflow-hidden right-0 top-10 text-sm">
                                        <div className='flex flex-col cursor-pointer text-center'>
                                            <EditIssuesFormModal issues={issue} Type={'repo'} reponame={reponame} />
                                            <MenuItem  onClick={closeIssue} label='刪除'/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="py-3">
                    <p className="text-md md:text-xl mb-2">{issue.title}</p>
                    <div className="text-xs md:text-sm text-zinc-500 max-h-[40px] overflow-hidden" dangerouslySetInnerHTML={{ __html: issue.body }}>
                            
                    </div>
                </div>
            </div>
        </article>
    );
}

export default React.memo(MarkdownIssuesItem);