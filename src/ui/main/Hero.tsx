import { Container } from '@/ui/main/Container';

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900">
            Bring Your Outdoor Space to Life
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Oklahoma Wildscapes specializes in creating vibrant, eco-friendly
            habitats using native plants. Attract pollinators and birds while
            beautifying your yard!
          </p>
        </div>
      </Container>
    </div>
  );
}
