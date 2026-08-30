"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const logos = [
  { src: '/images/logos/html5.svg', size: 48 },
  { src: '/images/logos/css3.svg', size: 48 },
  { src: '/images/logos/javascript.svg', size: 48 },
  { src: '/images/logos/typescript.svg', size: 48 },
  { src: '/images/logos/react.svg', size: 48 },
  { src: '/images/logos/nextdotjs.svg', size: 48 },
  { src: '/images/logos/nodedotjs.svg', size: 48 },
  { src: '/images/logos/php.svg', size: 48 },
  { src: '/images/logos/laravel.svg', size: 48 },
  { src: '/images/logos/git.svg', size: 48 },
  { src: '/images/logos/github.svg', size: 48 },
  { src: '/images/logos/docker.svg', size: 48 },
  { src: '/images/logos/linux.svg', size: 48 },
  { src: '/images/logos/mysql.svg', size: 48 },
  { src: '/images/logos/supabase.svg', size: 48 },
];

export default function InteractiveBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const getParallax = (i: number) => {
    const factor = (i + 1) * 0.015;
    return {
      x: `calc((var(--mouse-x) - 50vw) * ${factor})`,
      y: `calc((var(--mouse-y) - 50vh) * ${factor})`,
    };
  };

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-90" />
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2210%22 height=%2210%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M10 0 L0 0 0 10%22 stroke=%22rgba(255,255,255,0.04)%22 stroke-width=%220.5%22/%3E%3C/svg%3E')]"
      />
      {logos.map((logo, i) => (
        <motion.img
          key={i}
          src={logo.src}
          alt=""
          className="absolute opacity-10 blur-sm hidden sm:block"
          style={{
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translate(${getParallax(i).x}, ${getParallax(i).y})`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 120 + i * 20, ease: 'linear' }}
        />
      ))}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10 hidden sm:block"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: Math.random() * 8 + 6, ease: 'linear' }}
          />
        ))}
      </div>
    </div>
  );
}
