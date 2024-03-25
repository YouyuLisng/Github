async function fetchUserRepos(username: string, pageNumber: number, per_page: number) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('Authorization', 'Bearer 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');
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&page=${pageNumber}&per_page=${per_page}`, {
            headers: headers,
            cache: 'force-cache'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data[0]; // Return the response data
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        return null;
    }
}

export default fetchUserRepos;
