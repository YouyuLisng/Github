interface FetchUserParams {
    userName: string;
    token?: string;
}

async function fetchUser({
    userName,
    token = process.env.GITHUB_ACCESS_TOKEN,
}: FetchUserParams) {
    const request = new Request(`https://api.github.com/users/${userName}`, {
        method: 'GET',
        headers: new Headers({
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        }),
    });

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

export { type FetchUserParams, fetchUser };
