/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
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
