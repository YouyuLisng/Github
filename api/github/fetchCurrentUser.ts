interface FetchCurrentUserParams {
    token?: string;
}

async function fetchCurrentUser({
    token,
}: FetchCurrentUserParams) {
    const request = new Request(`https://api.github.com/user`, {
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

export { type FetchCurrentUserParams, fetchCurrentUser };
