import fetchFirstRepo from "./fetchFirstRepo";

async function addIssues(username: string, newData: any, accessToken: string) {
    const repo = await fetchFirstRepo(username);
    console.log(accessToken)
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');
        headers.append('Authorization', `Bearer ${accessToken}`); // 加入 Authorization 標頭

        const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/issues`, {
            method: "POST",
            headers: headers,
            cache: 'no-store',
            body: JSON.stringify(newData) // 將更新的資料作為 body 傳遞
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

export default addIssues;
