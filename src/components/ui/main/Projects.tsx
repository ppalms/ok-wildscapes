import Image from 'next/image';
import { Container } from '@/components/ui/main/Container';

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden section-padding-y bg-gray-50"
    >
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="heading-section text-gray-900 mb-6">
            See Our Work in Action
          </h2>
          <p className="text-body-large text-gray-600 mx-auto max-w-2xl mb-8">
            Follow our journey as we transform outdoor spaces across Oklahoma. 
            Get inspired by our native plant gardens and wildscape projects!
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
            <a
              className="group block transition-all duration-200 hover:scale-105"
              href="https://www.instagram.com/oklahomawildscapes/?utm_source=ig_embed&amp;utm_campaign=loading"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-3 shadow-lg">
                  <Image
                    className="w-12 h-12 brightness-0 invert"
                    priority
                    src="/images/logos/instagram-solid.svg"
                    alt="Instagram logo"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="script text-2xl sm:text-3xl text-gray-800 group-hover:text-okw-green transition-colors duration-200">
                  @oklahomawildscapes
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Follow for project updates & inspiration
                </p>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
