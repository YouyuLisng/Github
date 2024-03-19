async function fetchUserRepos(username: string, pageNumber: number, perPage = 10) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');

        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${pageNumber}`, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data, `data: ${pageNumber}`)
        return data; // Return the response data
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        return null;
    }
}

export default fetchUserRepos;
