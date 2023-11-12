import { useId } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
// import logoBbc from '@/images/logos/bbc.svg'
// import logoCbs from '@/images/logos/cbs.svg'
// import logoCnn from '@/images/logos/cnn.svg'
// import logoFastCompany from '@/images/logos/fast-company.svg'
// import logoForbes from '@/images/logos/forbes.svg'
// import logoHuffpost from '@/images/logos/huffpost.svg'
// import logoTechcrunch from '@/images/logos/techcrunch.svg'
// import logoWired from '@/images/logos/wired.svg'

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow">
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower">
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">
            Bring your outdoor space to life
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Our landscaping company specializes in wildscaping, creating
            vibrant, eco-friendly habitats using native plants. Attract
            pollinators and birds while beautifying your yard. Explore our
            simple yet effective solutions for transforming your garden into a
            thriving ecosystem. Join us in nurturing nature one garden at a
            time.
          </p>
        </div>
      </Container>
    </div>
  );
}
