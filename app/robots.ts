import { MetadataRoute } from 'next';

// Required for a static export (output: 'export')
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://kazisakin.github.io/sitemap.xml',
  };
}
