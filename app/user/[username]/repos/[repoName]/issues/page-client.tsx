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
}: IssuesClientPgaeProps) {
    const { issuesData } = useRepoIssuesGet({
        userName,
        repoName,
        query: { page: 1 },
    });
    
    if (issuesData.length === 0) {
        return(
            <EmptyState
                title={`${repoName} 目前沒有文章`}
                subtitle="Not Found"
                showReaet={true}
            />
        )
    }

    return (
        <>
            <IssuesList userName={userName} repoName={repoName} />
        </>
    );
}

export { type IssuesClientPgaeProps, IssuesClientPage };
