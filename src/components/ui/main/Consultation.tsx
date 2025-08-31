import { Container } from '@/components/ui/main/Container';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-okw-green section-padding-y"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
      
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="heading-section text-white mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-body-large text-white/90 mx-auto max-w-2xl mb-8">
            Let us help you create a thriving wildscape that benefits nature and 
            provides you with a serene retreat. Our expert team specializes in 
            native plant gardens that attract pollinators and wildlife.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-okw-green shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-okw-green min-h-[48px]"
            >
              Get Your Free Consultation
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <div className="text-center sm:text-left">
              <p className="text-white/80 text-sm">
                ✓ No commitment required<br />
                ✓ Expert native plant guidance
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
