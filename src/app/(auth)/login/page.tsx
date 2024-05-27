'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

const Loading = () => {
  return <>Loading...</>;
};

const Redirecting = () => {
  const router = useRouter();
  router.push('/plant-sheets');
  return <>Redirecting...</>;
};

const Login = () => {
  // https://ui.docs.amplify.aws/react/connected-components/authenticator/advanced#access-auth-state
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  switch (authStatus) {
    case 'authenticated':
      return <Redirecting />;
    default:
      return <Loading />;
  }
};

export default Login;
