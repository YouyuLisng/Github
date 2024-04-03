interface fetchIssueUpdateParams {
    token?: string;
    userName: string;
    repoName: string;
    issuesNumber: number,
    data: {
        title: string,
        body: string,
    },
}

async function fetchIssueUpdate({
    userName,
    repoName,
    issuesNumber,
    token,
    data
}: fetchIssueUpdateParams) {
    const request = new Request(
        `https://api.github.com/repos/${userName}/${repoName}/issues/${issuesNumber}`,
        {
            method: 'PATCH',
            headers: new Headers({
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify(data)
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

export { fetchIssueUpdate };
