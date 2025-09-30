import { Container } from '@/components/ui/main/Container';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
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
            We have reached our client limit for now. Please check out other local native plant landscapers at <a href="https://www.onpn.org/service-directory" className="underline">ONPN</a>!
          </p>
        </div>
      </Container>
    </section>
  );
}
