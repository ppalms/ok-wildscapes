import { Container } from '@/components/Container';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';

export function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden py-20 sm:py-28">
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900">
            Request a Consultation
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Let us help you transform your yard into a thriving wildscape that
            benefits nature and provides you with a serene retreat. Reach out to
            us for a free consultation! Please include the following
            information:
            <ul className="mt-4 text-left list-inside list-disc list-image-[url(/images/li-chevron.svg)]">
              <li className="font-bold">Your full name</li>
              <li className="font-bold">
                Contact email address and/or phone number
              </li>
              <li className="font-bold">Yard size</li>
              <li>
                <span className="font-bold">Describe your ideal yard:</span>{' '}
                Share your vision with us. What elements are most important to
                you? (Native plants, wildlife habitats, pollinator host plants,
                etc.)
              </li>
              <li>
                <span className="font-bold">Inspirations:</span> Are there any
                particular styles, themes, or examples of wildscaping that
                inspire you? Feel free to share links or descriptions.
              </li>
              <li>
                <span className="font-bold">Challenges and Concerns:</span> Do
                you have any concerns or challenges with your current yard?
                (Erosion, lack of privacy, maintenance, etc.)
              </li>
            </ul>
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="mailto:okwildscapes@gmail.com"
              className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-700"
              target="_blank">
              Request a Consultation{' '}
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 -mr-0.5 ml-2" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
