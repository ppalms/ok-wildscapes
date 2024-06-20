import { Container } from '@/components/ui/main/Container';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden border-y border-gray-300 bg-okw-green py-20 sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Request a Consultation
          </h2>
          <p className="mt-4 text-lg text-gray-50">
            Let us help you transform your yard into a thriving wildscape that
            benefits nature and provides you with a serene retreat. Reach out to
            us for a free consultation!
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/consultation"
              className="flex items-center rounded-lg bg-amber-800 px-4 py-2 font-semibold text-white shadow hover:bg-amber-900"
            >
              Request a Consultation{' '}
              <ArrowRightIcon className="h-5 w-5 -mr-0.5 ml-2" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
