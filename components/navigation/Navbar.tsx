"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang' },
    { href: '/projects', label: 'Proyek' },
    { href: '/skills', label: 'Keahlian' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl' : 'bg-transparent'}`}> 
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center no-underline">
          <Image src="/images/logo.svg" alt="Riko Ardianto" width={165} height={30} className="h-8 w-auto" priority unoptimized />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
              // simple active check (could use usePathname in real app)
              ''
            } text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)]`}>{l.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {mounted && theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-md p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors md:hidden" aria-label="Toggle menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
