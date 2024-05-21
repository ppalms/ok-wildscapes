import { Container } from '@/ui/main/Container';
import { ExternalLink } from '@/ui/main/ExternalLink';

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
        </Container>
      </div>
    </>
  );
}
