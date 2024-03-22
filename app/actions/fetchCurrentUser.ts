async function fetchCurrentUser(accessToken: string) {
    try {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        headers.append('Accept', 'application/vnd.github.v3+json');

        const response = await fetch('https://api.github.com/user', {
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export default fetchCurrentUser;
