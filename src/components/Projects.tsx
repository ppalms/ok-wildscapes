import { Container } from '@/components/Container';
import Image from 'next/image';

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-emerald-950 py-20 sm:py-28">
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Our Projects
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Discover the vibrant, eco-friendly landscapes we've cultivated
            across Oklahoma! Our gallery is a showcase of our dedication to
            transforming spaces into thriving ecosystems that buzz with life.
          </p>
          <div className="mt-8">
            <p className="mt-4 text-lg text-gray-300">
              Explore our work on Instagram to see how we bring a touch of wild
              to the modern world, one garden at a time.
            </p>
            <div className="pt-6 flex items-center justify-center">
              <a
                href="https://www.instagram.com/oklahomawildscapes/?utm_source=ig_embed&amp;utm_campaign=loading"
                target="_blank">
                <Image
                  className="w-32 mx-auto"
                  priority
                  src="images/logos/instagram-solid.svg"
                  alt="Instagram logo"
                  width={32}
                  height={32}
                />
                <span className="script text-2xl sm:text-3xl text-gray-300">
                  @oklahomawildscapes
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
