/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    env: {
        GITHUB_ACCESS_TOKEN: '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',
        GITHUB_ID: '1d6c5925798aa7391380',
        GITHUB_SECRET: '9e733dd6bc55c1034ecf7b76796134f98e4e08ff',
    },
    async redirects() {
        return [
            {
                source: '/user/:userName',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
