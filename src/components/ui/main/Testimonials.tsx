import clsx from 'clsx';

import { Container } from '@/components/ui/main/Container';
import {
  Expandable,
  ExpandableButton,
  ExpandableItems
} from '@/components/ui/main/Expandable';

const testimonials = [
  [
    {
      content:
        'Mira’s teaching style is second to none. Everything was easy to follow every step of the way.',
      author: {
        name: 'Antonio Littel',
        role: 'Frontend Developer'
      }
    },
    {
      content:
        'Even though I was excited to learn, I was pessimistic that I wouldn’t actually ever get good enough to design my own icons. I was wrong — this book is all I needed.',
      author: {
        name: 'Lynn Nolan',
        role: 'Growth Marketer'
      }
    },
    {
      content:
        'I’ve been employed as a professional icon designer for years and still learned tons of new tricks that have made my work even better',
      author: {
        name: 'Krista Prosacco',
        role: 'Professional Designer'
      }
    }
  ],
  [
    {
      content:
        'I run an ecommerce store selling rare vintage gummy bears and could never find a good gummy bear icon. Now I can design my own in minutes.',
      author: {
        name: 'Cameron Considine',
        role: 'Entrepreneur'
      }
    },
    {
      content:
        'The complete package is worth it for the weekly teardown videos alone. I’ve learned so much watching Mira take apart other icons and recreate them from scratch.',
      author: {
        name: 'Regina Wisoky',
        role: 'Design Student'
      }
    },
    {
      content:
        'I didn’t expect to find a lot of value in the community but now I’m in there for at least an hour every day picking up tips from other designers.',
      author: {
        name: 'Vernon Cummerata',
        role: 'UI Engineer'
      }
    }
  ],
  [
    {
      content:
        'I couldn’t believe how fast Mira moved in Figma compared to my own workflow. I’m designing icons more accurately in half the time with the shortcuts I learned from her videos.',
      author: {
        name: 'Steven Hackett',
        role: 'Bootcamp Instructor'
      }
    },
    {
      content:
        'I never thought I would enjoy designing icons but using the ideas in this book, it’s become a great way for me to relax while still being creative.',
      author: {
        name: 'Carla Schoen',
        role: 'Startup Founder'
      }
    },
    {
      content:
        'All I can say is wow — this is easily the best icon design resource I’ve ever encountered.',
      author: {
        name: 'Leah Kiehn',
        role: 'Creative Director'
      }
    }
  ]
];

function Testimonial({
  author,
  children
}: {
  author: { name: string; role: string };
  children: React.ReactNode;
}) {
  return (
    <figure className="rounded-4xl p-8 shadow-md ring-1 ring-gray-900/5">
      <blockquote>
        <p className="text-lg tracking-tight text-gray-900 before:content-['“'] after:content-['”']">
          {children}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center">
        <div>
          <div className="text-base font-medium leading-6 tracking-tight text-gray-900">
            {author.name}
          </div>
          <div className="mt-1 text-sm text-gray-600">{author.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="pt-20 pb-10 sm:pt-28 sm:pb-14">
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900">
            Some kind words from early customers...
          </h2>
          <p className="mt-4 text-lg tracking-tight text-gray-600">
            I worked with a small group of early access customers to make sure
            all of the content in the book was exactly what they needed. Hears
            what they had to say about the finished product.
          </p>
        </div>
      </Container>
      <Expandable className="group mt-6">
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
        >
          {testimonials
            .map((column) => column[0])
            .map((testimonial, testimonialIndex) => (
              <li key={testimonialIndex} className="lg:hidden">
                <Testimonial author={testimonial.author}>
                  {testimonial.content}
                </Testimonial>
              </li>
            ))}
          {testimonials.map((column, columnIndex) => (
            <li
              key={columnIndex}
              className="hidden group-data-[expanded]:list-item lg:list-item"
            >
              <ul role="list">
                <ExpandableItems>
                  {column.map((testimonial, testimonialIndex) => (
                    <li
                      key={testimonialIndex}
                      className={clsx(
                        testimonialIndex === 0 && 'hidden lg:list-item',
                        testimonialIndex === 1 && 'lg:mt-8',
                        testimonialIndex > 1 && 'mt-8'
                      )}
                    >
                      <Testimonial author={testimonial.author}>
                        {testimonial.content}
                      </Testimonial>
                    </li>
                  ))}
                </ExpandableItems>
              </ul>
            </li>
          ))}
        </ul>
        <ExpandableButton>Read more testimonials</ExpandableButton>
      </Expandable>
    </section>
  );
}
