import { Container } from '@/components/ui/main/Container';
import { GridPattern } from '@/components/ui/main/GridPattern';

export function Testimonial({
  id,
  author,
  children
}: {
  id: string;
  author: { name: string; role: string };
  children: React.ReactNode;
}) {
  return (
    <aside
      id={id}
      aria-label={`Testimonial from ${author.name}`}
      className="relative bg-slate-100 py-16 sm:py-32"
    >
      <div className="text-slate-900/10">
        <GridPattern x="50%" patternTransform="translate(0 80)" />
      </div>
      <Container className="relative">
        <figure>
          <blockquote className="mt-10 font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-center">
            {children}
          </blockquote>
          <figcaption className="mt-10 flex items-center sm:justify-center">
            <div className="ml-4">
              <div className="text-base font-medium leading-6 tracking-tight text-slate-900">
                {author.name}
              </div>
              <div className="mt-1 text-sm text-slate-600">{author.role}</div>
            </div>
          </figcaption>
        </figure>
      </Container>
    </aside>
  );
}
