'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const Carousel = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      skipSnaps: false,
      inViewThreshold: 0.7
    },
    [Autoplay()]
  );

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla-container">
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-entrance.jpeg"
            className="carousel-image"
            alt="Path through meadow garden to front door"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-meadow-1.jpeg"
            className="carousel-image"
            alt="Meadow garden bed"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-meadow-2.jpeg"
            className="carousel-image"
            alt="Meadow garden bed"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-meadow-3.jpeg"
            className="carousel-image"
            alt="Meadow garden bed"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-spring-bloomers.jpeg"
            className="carousel-image"
            alt="Winecup and poppy mallow"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-blue-bonnet.jpeg"
            className="carousel-image"
            alt="Texas bluebonnet"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-coreopsis.jpeg"
            className="carousel-image"
            alt="Plains Coreopsis"
            fill={true}
          />
        </div>
        <div className="embla-slide">
          <Image
            src="/images/carousel/mockingbird-bouquet.jpeg"
            className="carousel-image"
            alt="Wildflower bouquet"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
};
