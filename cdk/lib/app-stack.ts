import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NextjsAmplify } from './nextjs-amplify';

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

    new NextjsAmplify(this, 'OkWildscapesHostingStack', {
      amplifyAppName: amplifyAppName,
      owner: owner,
      repository: repository,
      branch: branch,
      githubTokenName: githubTokenName,
    });
  }
}
