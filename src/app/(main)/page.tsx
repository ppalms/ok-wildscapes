import { Carousel } from '@/ui/main/Carousel';
import { Consultation } from '@/ui/main/Consultation';
import { Hero } from '@/ui/main/Hero';
import { Logo } from '@/ui/main/Logo';
import { Projects } from '@/ui/main/Projects';

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
