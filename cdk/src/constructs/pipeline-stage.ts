/* eslint-disable no-console */
import { Stack, Stage, StageProps } from 'aws-cdk-lib';
import { AppStack } from '../stacks/app-stack';
import { EnvironmentConfig } from '../apps/app';

export interface OkWildscapesStageProps extends StageProps {
  readonly owner: string;
  readonly repository: string;
  readonly branch: string;
  readonly githubTokenName: string;
  readonly config: EnvironmentConfig;
}

export class OkWildscapesStage extends Stage {
  constructor(scope: Stack, id: string, props: OkWildscapesStageProps) {
    super(scope, id, props);

    const { owner, repository, branch, githubTokenName } = props;

    if (!props.stageName) {
      throw new Error('stageName is required');
    }

    if (this.account !== props.config.account.accountId) {
      throw new Error(
        'Environment config must match the pipeline stage account'
      );
    }

    console.log(
      `Deploying ${props.stageName} OkWildscapesStack to ${props.env!.account}`
    );

    new AppStack(this, 'OkWildscapesStack', {
      appName: 'OkWildscapes',
      owner: owner,
      repository: repository,
      branch: branch,
      githubTokenName: githubTokenName,
      env: {
        account: props.config.account.accountId,
        region: props.config.region
      }
    });
  }
}
