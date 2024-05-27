import Providers from '@/app/providers';
import PageHeader from '@/ui/backoffice/PageHeader';
import TopNav from '@/ui/backoffice/TopNav';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec)
  });

  return (
    <>
      <Providers>
        <div className="min-h-full">
          <div className="bg-gray-800 pb-32">
            <TopNav user={currentUser} />
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
      </Providers>
    </>
  );
}
