interface FetchReposParams {
    token?: string;
    userName: string;
    query?: {
        sort?: string;
        page?: number;
        perPage?: number;
    };
}

async function fetchRepos({
    userName,
    token = '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',
    query = {
        sort: 'created',
        page: 1,
        perPage: 10,
    },
}: FetchReposParams) {
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

    return fetch(request, { cache: 'force-cache' })
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

export { type FetchReposParams, fetchRepos };
