import { cn } from '@/lib/utils';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans ({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['300','400','500','600', '700'],
});



export const metadata: Metadata = {
  title: "HealU",
  description: "A health and wellness app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
