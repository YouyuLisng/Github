'use client';

import EmptyState from '@/components/EmptyState';
import { IssuesList } from '@/components/IssuesList/IssuesList';
import {
    useRepoIssuesGet,
    type UseRepoIssuesGetProps,
} from '@/hooks/useRepoIssuesGet';

interface IssuesClientPgaeProps
    extends Pick<UseRepoIssuesGetProps, 'userName' | 'repoName'> {}

function IssuesClientPage({
    userName,
    repoName,
    ...props
}: IssuesClientPgaeProps) {
    const { issuesData } = useRepoIssuesGet({
        userName,
        repoName,
        query: { page: 1 },
    });

    return (
        <>
            {issuesData.length !== 0 ? (
                <IssuesList username={userName} />
            ) : (
                <EmptyState
                    title={`${userName} 目前尚未發佈文章`}
                    subtitle="Not Found"
                    showReaet={true}
                />
            )}
        </>
    );
}

export { type IssuesClientPgaeProps, IssuesClientPage };
