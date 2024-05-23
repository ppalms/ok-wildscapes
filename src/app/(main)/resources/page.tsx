import { Container } from '@/ui/main/Container';
import { ExternalLink } from '@/ui/main/ExternalLink';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="w-full h-full bg-white border-t">
        <Container className="py-12">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900">
            Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Information about native plants and wildscaping
          </p>
          <section>
            <div className="mt-6">
              <h2 className="font-display text-3xl tracking-tight text-gray-900">
                Links
              </h2>
              <p className="border-t pt-2">
                Learn about invasive plants at the Oklahoma Invasive Plant
                Council's{' '}
                <ExternalLink
                  text="invasive plant database"
                  href="https://www.okinvasives.org/plants-database"
                />
              </p>
            </div>
          </section>
          <section>
            <div className="mt-6">
              <h2 className="font-display text-3xl tracking-tight text-gray-900">
                Documents
              </h2>
              <p className="border-t pt-2">
                What to Expect and How to Maintain{' - '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/what-to-expect-and-how-to-maintain.pdf`}
                  className="text-emerald-600 hover:text-emerald-700"
                  target="_blank"
                >
                  Download PDF
                </Link>
              </p>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
