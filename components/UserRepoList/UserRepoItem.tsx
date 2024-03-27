import React from 'react';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { AiFillStar } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import Avatar from '@/components/Avatar';
import { Repository } from '@/type/type';
import Time from '../Time';
import Link from 'next/link';

interface RepoItemProps {
    repo: Repository;
}

function RepoItem({
    repo,
}: RepoItemProps) {
    return (
        <Link href={`/user/${repo.owner.login}/repos/${repo.name}`}>
            <article className="border-b">
                <div className="py-2 md:py-4">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <Avatar src={repo.owner.avatar_url} width={20} height={20} />
                            <p className="px-2 text-sm text-zinc-500">{repo.owner.login}</p>
                        </div>
                        <Time time={repo.created_at} />
                    </div>
                    <div className="py-3">
                        <p className="text-md md:text-xl mb-2">{repo.name}</p>
                        <p className="text-xs md:text-sm text-zinc-500 truncate">{repo.description}</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex items-center'>
                            <AiFillStar className='w-3 h-3 md:w-5 md:h-5 me-2 text-yellow-300' />
                            <span className="text-xs md:text-sm inline-block mr-2">
                                {repo.stargazers_count}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <LuEye className='w-3 h-3 md:w-5 md:h-5 me-2' />
                            <span className="text-xs md:text-sm inline-block mr-2">
                                {repo.watchers_count}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <IoCodeSlashOutline className='w-3 h-3 md:w-5 md:h-5 me-2 text-red-500' />
                            {repo.language ? (
                                <span className="text-xs md:text-sm inline-block mr-2">
                                    {repo.language}
                                </span>
                            ) : (
                                <span className="text-xs md:text-sm inline-block mr-2">
                                    Null
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default React.memo(RepoItem);