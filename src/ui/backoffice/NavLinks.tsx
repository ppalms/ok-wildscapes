'use client';

import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Jobs', href: '/jobs', current: false },
  { name: 'Ledger', href: '/ledger', current: false },
  { name: 'Plants', href: '/plants', current: false }
];

export default function NavLinks({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <>
        {links.map((item) => (
          <Disclosure.Button
            key={item.name}
            as={Link}
            href={item.href}
            className={clsx(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </>
    );
  } else {
    return (
      <>
        {links.map((item) => {
          item.current = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Link>
          );
        })}
      </>
    );
  }
}
