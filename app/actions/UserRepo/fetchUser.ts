async function fetchRepos(username: string) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append(
            'Authorization',
            'Bearer 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'
        );
        const response = await fetch(
            `https://api.github.com/users/${username}`,
            {
                headers: headers,
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch data: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        return data; // Return the response data
    } catch (error) {
        // console.error('Error fetching user repositories:', error);
        return null;
    }
}

export default fetchRepos;
