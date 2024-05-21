import PageHeader from '@/ui/backoffice/PageHeader';
import TopNav from '@/ui/backoffice/TopNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <TopNav />
          <PageHeader />
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
