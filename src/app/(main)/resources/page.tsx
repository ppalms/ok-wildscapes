import { Container } from '@/components/ui/main/Container';
import { ExternalLink } from '@/components/ui/main/ExternalLink';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="w-full h-full bg-white border-t">
        <Container className="pt-12 pb-24">
          <div className="mb-4 mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <Link
              href="/"
              className="text-emerald-950 hover:text-emerald-700"
              aria-label="Home"
            >
              <div className="flex items-center">
                <ArrowLeftIcon className="h-5 w-5 mr-1" /> Home
              </div>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Information about native plants and wildscaping
          </p>
          <section>
            <div className="mt-6">
              <h2 className="font-semibold text-2xl tracking-tight text-gray-900">
                Links
              </h2>
              <p className="border-t pt-2">
                Explore Oklahoma native plants at the{' '}
                <ExternalLink
                  text="Lady Bird Johnson wildflower center database"
                  href="https://www.wildflower.org/collections/collection.php?collection=OK"
                />
              </p>
              <p className="pt-2">
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
              <h2 className="font-semibold text-2xl tracking-tight text-gray-900">
                Guides
              </h2>
              <p className="border-t pt-2">
                What to Expect and How to Maintain - tips and tricks for the
                early years of your wildscaping project{' '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/What%20to%20Expect%20and%20How%20to%20Maintain.pdf`}
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
