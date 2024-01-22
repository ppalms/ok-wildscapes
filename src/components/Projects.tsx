import Image from 'next/image';
import { Container } from '@/components/Container';
import { Carousel } from '@/components/Carousel';

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-emerald-950 pt-20 sm:pt-28"
    >
      <Container className="relative">
        <div className="mx-auto pb-4 max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Our Projects
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Explore the vibrant, eco-friendly landscapes we're cultivating
            across Oklahoma! Follow us on Instagram for regular updates and
            snapshots of our projects in action.
          </p>
          <div className="p-8">
            <div className="flex items-center justify-center">
              <a
                className="p-4 rounded-2xl shadow-neutral-950 shadow-lg border-4 border-dashed border-emerald-800 hover:bg-emerald-900"
                href="https://www.instagram.com/oklahomawildscapes/?utm_source=ig_embed&amp;utm_campaign=loading"
                target="_blank"
              >
                <Image
                  className="w-32 mx-auto"
                  priority
                  src="/images/logos/instagram-solid.svg"
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

      <Carousel />
    </section>
  );
}
