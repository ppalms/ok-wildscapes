import Link from 'next/link';

export default function ExternalLink({
  href,
  text
}: {
  href: string;
  text: string;
}) {
  return (
    <>
      <Link
        href={href}
        className="text-emerald-600 hover:text-emerald-700"
        target="_blank"
      >
        {text}
        <span className="inline-flex">
          <svg
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="24"
            style={{
              color: 'currentColor',
              width: '14px',
              height: '14px'
            }}
          >
            <path d="M7 17L17 7"></path>
            <path d="M7 7h10v10"></path>
          </svg>
        </span>
      </Link>
    </>
  );
}
