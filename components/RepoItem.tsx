import React from 'react'
import { format } from 'date-fns';
import { IoCodeSlashOutline } from 'react-icons/io5';
import Avatar from '@/components/Avatar';
import { Repository } from '@/type/type'
interface RepoItemProps {
    repo: Repository
}

export default function RepoItem({
    repo
}: RepoItemProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
    };
    return (
        <article className="border-b">
            <div className="py-2 px-3">
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        <Avatar src={repo.owner.avatar_url} width={20} height={20} />
                        <p className="px-2 text-sm text-zinc-500">{repo.owner.login}</p>
                    </div>
                    <div>
                        <p className='text-sm'>{formatDate(repo.created_at)}</p>
                    </div>
                </div>
                <div className="py-3">
                    <p className="text-xl mb-2">{repo.name}</p>
                    <p className="text-sm text-zinc-500 truncate">{repo.description}</p>
                </div>
                <div className='flex items-center'>
                    <IoCodeSlashOutline className='w-5 h-5 me-2 text-red-500' />
                    {repo.topics.length > 0 ? (
                        repo.topics.slice(0, 3).map((topic: string, index: number) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {topic}
                            </span>
                        ))
                    ) : (
                        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                            Null
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}
