'use client';

import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Container } from '@/components/ui/main/Container';
import { Logomark } from '@/components/ui/main/Logo';
import { NavLinks } from '@/components/ui/main/NavLinks';

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >
) {
  return (
    <Popover.Button
      as={Link}
      className="nav-link-mobile"
      {...props}
    />
  );
}

export function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logomark className="h-10 sm:h-12 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-3 hover:bg-okw-green/10 hover:stroke-okw-green active:stroke-okw-green-darker transition-all duration-200 ui-not-focus-visible:outline-none min-h-[44px] min-w-[44px]"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 }
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-white px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20 border border-gray-200"
                        >
                          <div className="space-y-2">
                            <MobileNavLink href="/">Home</MobileNavLink>
                            <MobileNavLink href="/resources">
                              Resources
                            </MobileNavLink>
                            <MobileNavLink href="/consultation">
                              Consultation
                            </MobileNavLink>
                          </div>
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <a 
                              href="/consultation" 
                              className="btn-primary w-full justify-center"
                            >
                              Get Free Consultation
                            </a>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {/* TODO <Button href="/login" variant="outline" className="hidden lg:block">
              Log in
            </Button>
            <Button href="#" className="hidden lg:block">
              Download
            </Button> */}
          </div>
        </Container>
      </nav>
    </header>
  );
}
