import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "People's Economy Hub",
  description:
    'Understanding how the economy affects American households through clear, household-centered metrics.',
  metadataBase: new URL('https://peopleseconomyhub.github.io'),
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
