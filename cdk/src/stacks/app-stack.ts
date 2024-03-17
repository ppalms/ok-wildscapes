import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDbTable } from '../constructs/dynamodb-table';
import { PublicRestApi } from '../constructs/public-api';
import { AmplifyNextjs } from '../constructs/amplify-nextjs';

export interface AppStackProps extends cdk.StackProps {
  appName: string;
  owner: string;
  repository: string;
  branch: string;
  githubTokenName: string;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    const {
      appName,
      owner,
      repository,
      branch,
      githubTokenName,
      ...stackProps
    } = props;

    super(scope, id, stackProps);

    const okWildscapesDb = new DynamoDbTable(this, 'OkWildscapesDatabase');

    const api = new PublicRestApi(this, 'OkWildscapesPublicApi', {
      table: okWildscapesDb.table
    });

    new AmplifyNextjs(this, 'OkWildscapesNextJs', {
      amplifyAppName: appName,
      owner: owner,
      repository: repository,
      branch: branch,
      githubTokenName: githubTokenName,
      apiBaseUrl: api.baseUrl
    });
  }
}
