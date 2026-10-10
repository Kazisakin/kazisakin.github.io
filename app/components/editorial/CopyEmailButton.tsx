'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export default function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
      className={
        className ||
        'inline-flex items-center gap-2 rounded-full border border-ed-line bg-ed-surface/80 px-4 py-2 text-xs font-semibold text-ed-text transition-colors hover:border-ed-accent hover:text-ed-accent'
      }
    >
      {copied ? (
        <>
          <Check size={14} className="text-ed-accent" />
          <span className="text-ed-accent">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy email</span>
        </>
      )}
    </button>
  );
}
