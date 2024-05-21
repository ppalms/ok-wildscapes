import { Footer } from '@/ui/main/Footer';
import { Header } from '@/ui/main/Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
