interface FetchIssuesParams {
    token?: string;
    userName: string;
    repoName: string;
    query?: {
        sort?: string;
        page?: number;
        perPage?: number;
    };
}

async function fetchIssues({
    userName,
    repoName,
    token,
    query = {
        sort: 'created',
        page: 1,
        perPage: 10,
    },
}: FetchIssuesParams) {
    const request = new Request(
        `https://api.github.com/repos/${userName}/${repoName}/issues?sort=${query.sort}&page=${query.page}&per_page=${query.perPage}`,
        {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
            }),
        }
    );

    return fetch(request, { cache: 'no-store' })
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

export { type FetchIssuesParams, fetchIssues };
