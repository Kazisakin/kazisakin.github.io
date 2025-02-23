import { Metadata } from 'next';

// Define Props type with params as a Promise
type Props = {
  params: Promise<{ slug: string }>; // Updated to match Next.js expectations
};

// 1. Use generateStaticParams to define possible slugs
export async function generateStaticParams() {
  const slugs = [
    'understanding-react-hooks',
    'css-in-js-vs-tailwind',
    'restful-apis-with-node',
    'top-10-vscode-extensions',
  ];

  return slugs.map((slug) => ({
    slug,
  }));
}

// 2. Optional: Use generateMetadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await the Promise to get the slug
  return {
    title: `Blog Post - ${slug}`,
    description: `Read our latest blog post about ${slug}.`,
  };
}

// 3. Default export for the blog post page
export default async function BlogPost({ params }: Props) {
  const { slug } = await params; // Await the Promise to get the slug

  // Example: Fetching data (adjust as needed)
  // const data = await fetch(`https://api.example.com/posts/${slug}`).then(res => res.json());

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-white">Blog Post: {slug}</h1>
      <p className="text-gray-400 mt-4">This is a dynamically generated blog post.</p>
    </main>
  );
}