import { Carousel } from '@/components/ui/main/Carousel';
import { Consultation } from '@/components/ui/main/Consultation';
import { Hero } from '@/components/ui/main/Hero';
import { Logo } from '@/components/ui/main/Logo';
import { Projects } from '@/components/ui/main/Projects';

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
