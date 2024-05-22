'use client';

import '@aws-amplify/ui-react/styles.css';
import { Amplify, ResourcesConfig } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProvidersProps) => {
  const config: ResourcesConfig = {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
        identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID!
      }
    }
  };
  Amplify.configure(config, { ssr: true });

  return (
    <>
      <Authenticator loginMechanisms={['email']} hideSignUp>
        <Authenticator.Provider>{children}</Authenticator.Provider>
      </Authenticator>
    </>
  );
};
