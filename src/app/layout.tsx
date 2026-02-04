import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3d7c47',
};

export const metadata: Metadata = {
  title: "People's Economy Hub",
  description:
    'Understanding how the economy affects American households through clear, household-centered metrics.',
  metadataBase: new URL('https://peopleseconomyhub.github.io'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "People's Economy Hub",
    description:
      'Understanding how the economy affects American households through clear, household-centered metrics.',
    type: 'website',
    siteName: "People's Economy Hub",
  },
  twitter: {
    card: 'summary_large_image',
    title: "People's Economy Hub",
    description:
      'Understanding how the economy affects American households through clear, household-centered metrics.',
  },
  other: {
    'format-detection': 'telephone=no',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "People's Economy Hub",
  description:
    'Understanding how the economy affects American households through clear, household-centered metrics.',
  url: 'https://peopleseconomyhub.github.io',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="dns-prefetch" href="//api.bls.gov" />
        <link rel="preconnect" href="https://api.bls.gov" crossOrigin="anonymous" />

        {/* Optimize font loading with font-display: swap */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'system-ui';
                font-display: swap;
              }
            `,
          }}
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
