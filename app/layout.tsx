import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteOrigin = process.env.APP_URL ?? 'http://localhost:3001';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OOPZ — Alliance Command',
  description: 'The private command center for OOPZ alliance members.',
  metadataBase: new URL(siteOrigin),
  openGraph: {
    title: 'OOPZ — Alliance Command',
    description: 'Personal progress, alliance intelligence and smarter decisions.',
    images: [{ url: new URL('/og.png', siteOrigin), width: 1672, height: 941 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OOPZ — Alliance Command',
    description: 'Personal progress, alliance intelligence and smarter decisions.',
    images: [new URL('/og.png', siteOrigin)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
