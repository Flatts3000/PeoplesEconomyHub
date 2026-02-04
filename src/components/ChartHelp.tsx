'use client';

import { useState } from 'react';

interface ChartHelpProps {
  howToRead: string;
}

export function ChartHelp({ howToRead }: ChartHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted hover:text-positive transition-colors"
        aria-expanded={isOpen}
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span>How to read this chart</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-surface rounded-lg border border-gray-200">
          <p className="text-sm text-muted leading-relaxed">{howToRead}</p>
        </div>
      )}
    </div>
  );
}
