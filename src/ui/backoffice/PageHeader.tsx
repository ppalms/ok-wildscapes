'use client';

import { usePathname } from 'next/navigation';

const headers = new Map([
  ['/dashboard', 'Dashboard'],
  ['/jobs', 'Jobs'],
  ['/ledger', 'Ledger'],
  ['/plants', 'Plants']
]);

export default function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {headers.get(pathname)}
        </h1>
      </div>
    </header>
  );
}
