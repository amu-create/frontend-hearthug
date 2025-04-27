/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hearthug.netlify.app/api/:path*', // API 요청을 netlify 서버로 리다이렉트
      },
    ];
  },
};

module.exports = nextConfig;