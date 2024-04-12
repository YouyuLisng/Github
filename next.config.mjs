/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    env: {
        GITHUB_ACCESS_TOKEN: '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',
        GITHUB_ID: '17198fef42367fe66e07',
        GITHUB_SECRET: 'b3f482fa957cbf87e184bf15cb576c280f77961e',
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
