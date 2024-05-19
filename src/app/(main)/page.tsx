import { Carousel } from '@/components/Carousel';
import { Consultation } from '@/components/Consultation';
import { Hero } from '@/components/Hero';
import { Logo } from '@/components/Logo';
import { Projects } from '@/components/Projects';

export default function Home() {
  return (
    <>
      <Logo className="w-64 sm:w-max sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto" />
      <Hero />
      <Consultation />
      <Projects />
      <Carousel />
    </>
  );
}
