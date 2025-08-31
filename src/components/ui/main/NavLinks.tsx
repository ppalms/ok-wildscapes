'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export function NavLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  return [
    ['Home', '/'],
    ['Resources', '/resources'],
    ['Consultation', '/consultation']
  ].map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className="nav-link relative -mx-3 -my-2 rounded-lg px-4 py-3 transition-all duration-200 hover:text-okw-green"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        setHoveredIndex(index);
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null);
        }, 200);
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-okw-green/10"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 }
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{label}</span>
    </Link>
  ));
}
