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
        <footer className="border-t border-[#222838] bg-[#080b12] px-5 py-8 text-center text-white">
          <p className="text-sm font-black">Want to help with the running costs?</p>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#7f899f]">Voluntary contributions can be sent as Gold Bricks through the official Last War store. Log in with UID <strong className="text-white">1126541695002294</strong> and verify that UID before paying; Gold Bricks cannot be transferred to another character.</p>
          <a href="https://store.lastwar.com/en/order" target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-xl bg-[#7c5cff] px-5 py-3 text-sm font-black">Buy Queen Gold Bricks ↗</a>
        </footer>
      </body>
    </html>
  );
}
