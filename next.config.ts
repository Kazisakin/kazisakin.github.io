module.exports = {
  basePath: '',
  images: {
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; script-src 'self' 'unsafe-inline' https://your-project.vercel.app/_vercel/*;",
          },
        ],
      },
    ];
  },
};