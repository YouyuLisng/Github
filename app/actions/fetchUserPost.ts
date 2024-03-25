async function fetchUserRepos() {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        const response = await fetch(`https://api.github.com/repos/YouyuLisng/Dcard/issues`, {
            headers: headers,
            cache: 'force-cache'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data; // Return the response data
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        return null;
    }
}

export default fetchUserRepos;
