import { Container } from '@/components/ui/main/Container';

export function Hero() {
  return (
    <div className="overflow-hidden section-padding-y">
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="heading-hero text-gray-900 mb-6">
            Bring Your Outdoor Space to Life
          </h1>
          <p className="text-body-large text-gray-600 mx-auto max-w-2xl">
            Oklahoma Wildscapes specializes in creating vibrant, eco-friendly
            habitats using native plants. Attract pollinators and birds while
            beautifying your yard!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/consultation" className="btn-primary">
              Get Your Free Consultation
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
            <a href="/resources" className="btn-secondary">
              Explore Resources
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
