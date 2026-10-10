import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold tracking-widest uppercase text-ed-accent mb-3">404 Error</p>
        <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4 text-ed-text">Page not found</h1>
        <p className="text-base text-ed-muted mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist, has been moved, or the link might be broken.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ed-accent px-6 py-3 font-semibold text-ed-ink transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

