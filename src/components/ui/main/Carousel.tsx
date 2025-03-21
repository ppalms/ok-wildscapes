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
    src: '/images/carousel/1.jpg'
  },
  {
    src: '/images/carousel/2.jpg'
  },
  {
    src: '/images/carousel/3.jpg'
  },
  {
    src: '/images/carousel/4.jpg'
  },
  {
    src: '/images/carousel/5.jpg'
  },
  {
    src: '/images/carousel/6.jpg'
  },
  {
    src: '/images/carousel/7.jpg'
  },
  {
    src: '/images/carousel/8.jpg'
  },
  {
    src: '/images/carousel/9.jpg'
  },
  {
    src: '/images/carousel/10.jpg'
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
              alt=""
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
