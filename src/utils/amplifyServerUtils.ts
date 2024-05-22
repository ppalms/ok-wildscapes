import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { ResourcesConfig } from 'aws-amplify';

const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID!
    }
  }
};

export const { runWithAmplifyServerContext } = createServerRunner({
  config
});
