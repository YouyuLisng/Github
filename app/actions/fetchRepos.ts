async function fetchRepos(pageNumber: number) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');

        // 將 GitHub Personal Access Token 添加到請求中的 Authorization 標頭
        headers.append('Authorization', 'Bearer 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');

        const response = await fetch(`https://api.github.com/search/repositories?q=react&per_page=10&page=${pageNumber}`, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data.items;
    } catch (error: any) {
        console.error('Error fetching public repositories:', error);
        return { error: error.message };
    }
}

export default fetchRepos;
