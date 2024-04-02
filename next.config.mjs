/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    env: {
        GITHUB_ACCESS_TOKEN: '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',
        GITHUB_ID: '5971d9d0ee9a1d49c617',
        GITHUB_SECRET: '1b84216e7345e577a744dbc60827027999de4aa3',
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
