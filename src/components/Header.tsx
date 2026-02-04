'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-neutral">
              People&apos;s Economy Hub
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-neutral hover:text-positive transition-colors"
            >
              Home
            </Link>
            <Link
              href="/learn"
              className="text-neutral hover:text-positive transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/methodology"
              className="text-neutral hover:text-positive transition-colors"
            >
              Methodology
            </Link>
            <Link
              href="/resources"
              className="text-neutral hover:text-positive transition-colors"
            >
              Resources
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-neutral hover:text-positive transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/learn"
                className="text-neutral hover:text-positive transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>
              <Link
                href="/methodology"
                className="text-neutral hover:text-positive transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
              <Link
                href="/resources"
                className="text-neutral hover:text-positive transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
