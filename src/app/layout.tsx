import '@/styles/globals.css';
import { type Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    template: '%s - OK Wildscapes',
    default: 'OK Wildscapes - Bring your outdoor space to life'
  },
  description: `Bring your outdoor space to life! Our landscaping company specializes in wildscaping, creating vibrant, eco-friendly habitats using native plants. Attract pollinators and birds while beautifying your yard. Explore our simple yet effective solutions for transforming your garden into a thriving ecosystem. Join us in nurturing nature one garden at a time.`
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex h-full flex-col">
        <div className="flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
