interface FetchIssueReposProps {
    token?: string;
    userName: string;
    query?: {
        sort?: string;
        page?: number;
        perPage?: number;
    };
}

async function fetchIssueRepos({
    userName,
    token = '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',
    query = {
        sort: 'created',
        page: 1,
        perPage: 10,
    },
}: FetchIssueReposProps) {
    const request = new Request(
        `https://api.github.com/users/${userName}/repos?sort=${query.sort}&page=${query.page}&per_page=${query.perPage}`,
        {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
            }),
        }
    );

    return fetch(request)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch data: ${res.status} ${res.statusText}`
                );
            }
            return res.json();
        })
        .catch((error) => null);
}

export { fetchIssueRepos };
