"use client";

import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  const reduce = useReducedMotion();
  const animationProps = reduce
    ? {}
    : {
        animate: { translateY: [0, 8, 0] },
        transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
      };

  return (
    <motion.div {...animationProps} className="mt-8 flex justify-center">
      <a href="#about" aria-label="Scroll down">
        <ChevronDown size={24} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)]" />
      </a>
    </motion.div>
  );
}
