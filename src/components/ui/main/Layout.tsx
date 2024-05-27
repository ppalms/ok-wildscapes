import { Footer } from '@/components/ui/main/Footer';
import { Header } from '@/components/ui/main/Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
