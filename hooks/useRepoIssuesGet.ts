import type { GitHubIssue } from '@/type/type';
import useSWR from 'swr';
import fetchAllIssues from '@/app/actions/Repo/fetchAllIssues';
import { z } from 'zod';

const querySchema = z
    .object({
        page: z.number().optional(),
        perPage: z.number().optional(),
        sort: z.string().optional(),
    })
    .optional();

interface UseRepoIssuesGetProps {
    userName: string;
    repoName: string;
    query?: z.infer<typeof querySchema>;
    callback?: {
        // successCallback?: (response: Response) => void;
        // errorCallback?: (response: Response) => void;
        successCallback?: () => void;
        errorCallback?: () => void;
    };
}

type SWRData = GitHubIssue[];
type SWRError = Error;
type SWRKey = {
    page: number;
    perPage: number;
    sort: string;
} | null;

function useRepoIssuesGet({
    userName,
    repoName,
    query,
    callback,
}: UseRepoIssuesGetProps) {
    const {
        data: swrData,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR<SWRData, SWRError, SWRKey>(
        validateKey(query),
        (query) =>
            fetchAllIssues(userName, repoName, query.page).then((data) => {
                data
                    ? callback?.successCallback?.()
                    : callback?.errorCallback?.();

                return data;
            }),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        issuesData: swrData ?? [],
        isLoading,
        isValidating,
        refetchData: mutate,
    };
}

function validateKey(query: UseRepoIssuesGetProps['query']): SWRKey {
    if (querySchema.safeParse(query).success) {
        return {
            page: query?.page ?? 1,
            perPage: 10,
            sort: 'created',
        };
    }

    return null;
}

export { type UseRepoIssuesGetProps, useRepoIssuesGet };
