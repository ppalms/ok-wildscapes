import { Container } from '@/components/Container';
import ExternalLink from '@/components/ExternalLink';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Container className="relative bg-white h-full py-12 border-t">
        <div className="mx-auto max-w-xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900">
            Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Information about native plants and wildscaping
          </p>
          <section>
            <div className="mt-4">
              <p>
                Learn about invasive plants at the Oklahoma Invasive Plant
                Council's{' '}
                <ExternalLink
                  text="invasive plant database"
                  href="https://www.okinvasives.org/plants-database"
                />
              </p>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
