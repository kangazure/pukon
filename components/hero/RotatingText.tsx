'use client';

import { useEffect, useState } from 'react';

type TypingTextProps = {
  texts: string[];
  textColors?: string[];
  className?: string;
};

export function TypingText({ texts, textColors = [], className }: TypingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % texts.length), 2500);
    return () => clearInterval(t);
  }, [texts.length]);

  const color = textColors[index] || '';
  return (
    <span className={className} style={color ? { color } : undefined}>
      {texts[index]}
    </span>
  );
}
