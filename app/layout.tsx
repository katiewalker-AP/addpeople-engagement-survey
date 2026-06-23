import type { Metadata } from 'next';
import { Lexend, Playfair_Display } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Employee Engagement Survey · Add People',
  description: 'Help us make Add People a better place to work.',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
