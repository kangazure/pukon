import type { Metadata } from 'next';
import './globals.css';
import './custom.css'; // you can add any additional custom utilities here
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/sections/Footer';
import InteractiveBackground from '@/components/background/InteractiveBackground';

export const metadata: Metadata = {
  title: {
    default: 'Riko Ardianto — Cyber Security',
    template: '%s — Riko Ardianto',
  },
  description: 'Cybersecurity enthusiast focusing on web security, networking, Linux, and building functional solutions.',
  openGraph: {
    title: 'Riko Ardianto — Cyber Security',
    description: 'Cybersecurity enthusiast focusing on web security, networking, Linux, and building functional solutions.',
    url: 'https://rikoardianto.web.id',
    siteName: 'Riko Ardianto',
    images: [{ url: '/images/og.png', width: 1200, height: 630 }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riko Ardianto — Cyber Security',
    description: 'Cybersecurity enthusiast focusing on web security, networking, Linux, and building functional solutions.',
    images: ['/images/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <head />
      <body className="min-h-screen bg-background text-primary antialiased">
        <ThemeProvider>
          <InteractiveBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
