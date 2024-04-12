interface FetchIssuesIdParams {
    token?: string;
    userName: string;
    repoName: string;
    issuesNumber: number,
}

async function fetchIssuesId({
    token = process.env.GITHUB_ACCESS_TOKEN,
    userName,
    repoName,
    issuesNumber
}: FetchIssuesIdParams) {
    const request = new Request(
        `https://api.github.com/repos/${userName}/${repoName}/issues/${issuesNumber}`,
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

export { type FetchIssuesIdParams, fetchIssuesId };
