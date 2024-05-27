import Providers from '@/app/providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
