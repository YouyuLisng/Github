async function fetchRepos(pageNumber: number, perPage: number) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/vnd.github.v3+json');

        // 將 GitHub Personal Access Token 添加到請求中的 Authorization 標頭
        // headers.append('Authorization', 'Bearer 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');

        const response = await fetch(`https://api.github.com/search/repositories?q=react&per_page=${perPage}&page=${pageNumber}`, {
            headers: headers
        });

        if (!response.ok) {
            // 如果请求失败，抛出一个带有错误信息的 Error 对象
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.items; // 仅返回响应中的 items 数组
    } catch (error: any) {
        console.error('Error fetching public repositories:', error);
        // 在捕获到异常时返回错误信息
        return { error: error.message };
    }
}

export default fetchRepos;
