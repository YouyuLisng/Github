interface fetchIssueDeleteParams {
    token?: string;
    userName: string;
    repoName: string;
    issuesNumber: number,
}

async function fetchIssueDelete({
    token,
    userName,
    repoName,
    issuesNumber,
}: fetchIssueDeleteParams) {
    const request = new Request(
        `https://api.github.com/repos/${userName}/${repoName}/issues/${issuesNumber}`,
        {
            method: "PATCH",
            headers: new Headers({
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({
                state : "closed"
            }) 
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

export { fetchIssueDelete };
