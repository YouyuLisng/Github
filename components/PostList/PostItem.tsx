import React from 'react';
import Avatar from '@/components/Avatar';
import { GitHubIssue } from '@/type/type';
import Link from 'next/link';
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
        <Link href={`/user/${username}/issue/${post.number}`}>
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
                </div>
            </article>
        </Link>
    );
}

export default React.memo(PostItem);