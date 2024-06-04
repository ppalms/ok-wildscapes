import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { ResourcesConfig } from 'aws-amplify';
import { cookies } from 'next/headers';

const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID!
    }
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_URL!,
      region: process.env.NEXT_PUBLIC_REGION,
      defaultAuthMode: 'apiKey',
      apiKey: process.env.NEXT_PUBLIC_API_KEY
    }
  }
};

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config
});
