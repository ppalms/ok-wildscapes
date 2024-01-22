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
