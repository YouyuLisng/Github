
async function addIssues(username: string, reponame: string, newData: any, accessToken: string) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('Authorization', `Bearer ${accessToken}`);
        const response = await fetch(`https://api.github.com/repos/${username}/${reponame}/issues`, {
            method: "POST",
            headers: headers,
            cache: 'no-store',
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        return null;
    }
}

export default addIssues;
