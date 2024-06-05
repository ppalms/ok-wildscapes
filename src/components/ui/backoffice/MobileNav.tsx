'use client';

import { Disclosure } from '@headlessui/react';
import { BellIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
import NavLinks from '@/components/ui/backoffice/NavLinks';
import UserNavLinks from './UserNavLinks';
import Image from 'next/image';

export default function MobileNav({ user }: { user: { username: string } }) {
  return (
    <>
      <Disclosure.Panel className="border-b border-gray-700 md:hidden">
        <div className="space-y-1 px-2 py-3 sm:px-3">
          <NavLinks mobile={true} />
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                src="/images/indian-blanket.jpg"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                {user.username}
              </div>
              {/* <div className="text-sm font-medium leading-none text-gray-400">
                {user.email}
              </div> */}
            </div>
            <button
              type="button"
              className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <UserNavLinks mobile={true} />
        </div>
      </Disclosure.Panel>
    </>
  );
}

export function MobileNavButton({ open }: { open: boolean }) {
  return (
    <div className="-mr-2 flex md:hidden">
      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
  );
}
