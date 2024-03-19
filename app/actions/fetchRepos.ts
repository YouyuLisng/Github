async function fetchPublicRepositories(pageNumber = 1, perPage = 10) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');

        const response = await fetch(`https://api.github.com/search/repositories?q=react&per_page=${perPage}&page=${pageNumber}`, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.items);
        return data.items; // Return only the items array from the response
    } catch (error) {
        console.error('Error fetching public repositories:', error);
        return null;
    }
}

export default fetchPublicRepositories;
