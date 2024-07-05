import '~/styles/globals.css';

import { Poppins } from '@next/font/google';

import { TRPCReactProvider } from '~/trpc/react';
import { Toaster } from '~/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'To Do App',
  description: 'A simple to do app that will help you organize your tasks',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-base">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
