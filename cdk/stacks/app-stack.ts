import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AmplifyNextjs } from '../constructs/amplify-nextjs';
import { PublicApi } from '../constructs/public-api';

export interface AppStackProps extends cdk.StackProps {
  amplifyAppName: string;
  owner: string;
  repository: string;
  branch: string;
  githubTokenName: string;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    const {
      amplifyAppName,
      owner,
      repository,
      branch,
      githubTokenName,
      ...stackProps
    } = props;

    super(scope, id, stackProps);

    new AmplifyNextjs(this, 'OkWildscapesNextJs', {
      amplifyAppName: amplifyAppName,
      owner: owner,
      repository: repository,
      branch: branch,
      githubTokenName: githubTokenName,
    });

    new PublicApi(this, 'OkWildscapesPublicApi');
  }
}
