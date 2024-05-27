import Image from 'next/image';
import { Container } from '@/components/ui/main/Container';

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 sm:py-28 bg-gray-100"
    >
      <Container className="relative">
        <div className="mx-auto pb-4 max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900">
            Our Projects
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Follow us on Instagram for updates and snapshots of our projects in
            action!
          </p>
          <div className="p-8">
            <div className="flex items-center justify-center">
              <a
                className="p-4 rounded-2xl shadow-neutral-700 shadow-lg border-4 border-dashed border-emerald-800 bg-emerald-600 hover:bg-emerald-700"
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
                <span className="script text-2xl sm:text-3xl text-white">
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
