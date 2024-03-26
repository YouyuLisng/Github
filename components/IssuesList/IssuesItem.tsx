import React from 'react';
import Avatar from '@/components/Avatar';
import { GitHubIssue } from '@/type/type';
import Time from '../Time';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

interface IssuesItemProps {
    repo: GitHubIssue;
}

function IssuesItem({
    repo,
}: IssuesItemProps) {
    return (
        <Link href={`/users/${repo.user.login}/issues/${repo.number}`}>
            <article className="border-b">
                <div className="py-2 md:py-4">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <Avatar src={repo.user.avatar_url} width={20} height={20} />
                            <p className="px-2 text-sm text-zinc-500">{repo.user.login}</p>
                        </div>
                        <Time time={repo.created_at} />
                    </div>
                    <div className="py-3">
                        <p className="text-md md:text-xl mb-2">{repo.title}</p>
                        <div className="text-xs md:text-sm text-zinc-500 truncate pointer-events-none">
                            {ReactHtmlParser(repo.body.replace(/<a/g, '<span').replace(/<\/a>/g, '</span>'))}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default React.memo(IssuesItem);