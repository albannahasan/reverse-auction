// @ts-check

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    crossOrigin: 'anonymous',
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://api.example.com/:path*",
        },
      ];
    },
  };
  return nextConfig;
};
