interface FetchUserParams {
    userName: string;
    token?: string;
}

async function fetchUser({
    userName,
    token = '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',
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
