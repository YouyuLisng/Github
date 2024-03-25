import React from 'react';
import { IoCodeSlashOutline } from 'react-icons/io5';
import Avatar from '@/components/Avatar';
import { GitHubIssue } from '@/type/type';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { LuEye } from 'react-icons/lu';
import Time from '../Time';

interface PostItemProps {
    post: GitHubIssue;
    username: string;
}

function PostItem({
    post,
    username
}: PostItemProps) {
    return (
        <Link href={`/post/${username}/issue/${post.number}`}>
            <article className="border-b">
                <div className="py-2 md:py-4">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <Avatar src={post.user.avatar_url} width={20} height={20} />
                            <p className="px-2 text-sm text-zinc-500">{post.user.login}</p>
                        </div>
                        <Time time={post.created_at} />
                    </div>
                    <div className="py-3">
                        <p className="text-md md:text-xl mb-2 truncate">{post.title}</p>
                    </div>
                    {/* <div className='flex items-center'>
                        <div className='flex items-center'>
                            <AiFillStar className='w-3 h-3 md:w-5 md:h-5 me-2 text-yellow-300' />
                            <span className="text-xs md:text-sm inline-block mr-2">
                                {post.stargazers_count}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <LuEye className='w-3 h-3 md:w-5 md:h-5 me-2' />
                            <span className="text-xs md:text-sm inline-block mr-2">
                                {post.watchers_count}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <IoCodeSlashOutline className='w-3 h-3 md:w-5 md:h-5 me-2 text-red-500' />
                            {post.language ? (
                                <span className="text-xs md:text-sm inline-block mr-2">
                                    {post.language}
                                </span>
                            ) : (
                                <span className="text-xs md:text-sm inline-block mr-2">
                                    Null
                                </span>
                            )}
                        </div>
                    </div> */}
                </div>
            </article>
        </Link>
    );
}

export default React.memo(PostItem);