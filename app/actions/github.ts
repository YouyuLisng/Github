function GithubLogin() {
    const clientId = '1d6c5925798aa7391380';
    const redirectUri = 'http://localhost:3000/callback';
    const scope = 'user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    // 重定向到 GitHub 登录页面
    window.location.href = authUrl;
}

export default GithubLogin;