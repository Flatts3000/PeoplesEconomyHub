'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Handle Escape key and focus trapping
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      // Focus trap within mobile menu
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Focus first menu item when menu opens
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
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
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral p-2 rounded-md"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden pb-4"
            role="menu"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-neutral hover:text-positive transition-colors py-2"
                onClick={closeMenu}
                role="menuitem"
              >
                Home
              </Link>
              <Link
                href="/learn"
                className="text-neutral hover:text-positive transition-colors py-2"
                onClick={closeMenu}
                role="menuitem"
              >
                Learn
              </Link>
              <Link
                href="/methodology"
                className="text-neutral hover:text-positive transition-colors py-2"
                onClick={closeMenu}
                role="menuitem"
              >
                Methodology
              </Link>
              <Link
                href="/resources"
                className="text-neutral hover:text-positive transition-colors py-2"
                onClick={closeMenu}
                role="menuitem"
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
