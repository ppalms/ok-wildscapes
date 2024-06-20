'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButtons';
import { DotButton, useDotButton } from './CarouselDotButton';

const images = [
  {
    src: '/images/carousel/mockingbird-entrance.jpeg',
    alt: 'Path through meadow garden to front door'
  },
  {
    src: '/images/carousel/mockingbird-meadow-1.jpeg',
    alt: 'Meadow garden bed'
  },
  {
    src: '/images/carousel/mockingbird-meadow-2.jpeg',
    alt: 'Meadow garden bed'
  },
  {
    src: '/images/carousel/mockingbird-meadow-3.jpeg',
    alt: 'Meadow garden bed'
  },
  {
    src: '/images/carousel/mockingbird-spring-bloomers.jpeg',
    alt: 'Winecup and poppy mallow'
  },
  {
    src: '/images/carousel/mockingbird-blue-bonnet.jpeg',
    alt: 'Texas bluebonnet'
  },
  {
    src: '/images/carousel/mockingbird-coreopsis.jpeg',
    alt: 'Coreopsis'
  }
];

export const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      skipSnaps: false,
      inViewThreshold: 0.7
    },
    [Autoplay()]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla-container">
        {/* Slides */}
        {images.map((image, index) => (
          <div className="embla-slide" key={index}>
            <Image
              src={image.src}
              className="carousel-image"
              alt={image.alt}
              fill={true}
            />
          </div>
        ))}
      </div>

      <div className="embla-buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      <div className="embla-dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla-dot'.concat(
              index === selectedIndex ? ' embla-dot--selected' : ''
            )}
          />
        ))}
      </div>
    </div>
  );
};
