import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QOM — Export Quality, Factory Price. Egypt\'s Premier Group Fashion Brand.',
  description: 'Egypt\'s best factories, direct to your door. Export-quality fashion at factory prices. Build a capsule box or group buy with friends and save more together.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Cairo:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
