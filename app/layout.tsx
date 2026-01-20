import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';

import './globals.css';
import SearchModal from '@/components/modals/SearchModal';
import SignInModal from '@/components/modals/SignInModal';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ThemeProvider } from '@/providers/ThemeProvider';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TechBlog',
  description: 'A modern blog platform for tech enthusiasts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={roboto.variable}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen w-full flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
            <SignInModal />
            <SearchModal />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
