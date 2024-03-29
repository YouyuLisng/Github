
async function editIssues(username: string, reponame: string, issuesNumber: number, updatedData: any, accessToken: string) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('Authorization', `Bearer ${accessToken}`); // 加入 Authorization 標頭
        const response = await fetch(`https://api.github.com/repos/${username}/${reponame}/issues/${issuesNumber}`, {
            method: "PATCH",
            headers: headers,
            cache: 'no-store',
            body: JSON.stringify(updatedData) // 將更新的資料作為 body 傳遞
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

export default editIssues;
