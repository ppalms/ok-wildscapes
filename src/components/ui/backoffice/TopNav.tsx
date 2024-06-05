'use client';

import NavLinks from '@/components/ui/backoffice/NavLinks';
import { Logomark } from '@/components/ui/main/Logo';
import { Disclosure, Menu } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import MobileNav, { MobileNavButton } from './MobileNav';
import UserNavLinks from './UserNavLinks';

export default function TopNav({ user }: { user: { username: string } }) {
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/plant-sheets" aria-label="Home">
                        <Logomark className="h-10 sm:h-12 w-auto" />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <NavLinks />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <p className="text-white">{user.username}</p>
                            {/* <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            /> */}
                          </Menu.Button>
                        </div>

                        <UserNavLinks />
                      </Menu>
                    </div>
                  </div>

                  <MobileNavButton open={open} />
                </div>
              </div>
            </div>

            <MobileNav user={user} />
          </>
        )}
      </Disclosure>
    </>
  );
}
