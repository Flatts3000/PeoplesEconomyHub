'use client';

import { useState } from 'react';
import { Metric } from '@/lib/types';
import { formatDate } from '@/lib/formatters';

interface CiteButtonProps {
  metric: Metric;
}

export function CiteButton({ metric }: CiteButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateCitation = () => {
    const date = formatDate(metric.lastUpdated);
    const url = `https://peopleseconomyhub.github.io/#${metric.id}`;

    return `People's Economy Hub. "${metric.title}." Data as of ${date}. ${url}`;
  };

  const handleCopy = async () => {
    const citation = generateCitation();

    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = citation;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-positive transition-colors"
      aria-label={copied ? 'Citation copied' : 'Copy citation'}
    >
      {copied ? (
        <>
          <svg
            className="w-4 h-4 text-positive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-positive">Copied!</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          <span>Cite this</span>
        </>
      )}
    </button>
  );
}
