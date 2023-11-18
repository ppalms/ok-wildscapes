import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { EnvironmentConfig } from '../apps/app';
import { OkWildscapesStage } from '../constructs/pipeline-stage';

export interface PipelineProps extends StackProps {
  readonly owner: string;
  readonly repository: string;
  readonly branch: string;
  readonly githubTokenName: string;
  readonly devConfig: EnvironmentConfig;
  readonly prodConfig: EnvironmentConfig;
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id, props);

    const {
      owner,
      repository,
      branch,
      githubTokenName,
      devConfig: Dev,
      prodConfig: Prod
    } = props;

    const githubRepo = `${owner}/${repository}`;
    const source = pipelines.CodePipelineSource.gitHub(githubRepo, branch, {
      authentication: SecretValue.secretsManager(githubTokenName)
    });

    const synth = new pipelines.CodeBuildStep('SynthStep', {
      input: source,
      commands: [
        'cd cdk',
        'yarn install --frozen-lockfile',
        'yarn run package',
        'npx aws-cdk synth'
      ],
      primaryOutputDirectory: 'cdk/cdk.out'
    });

    const pipeline = new pipelines.CodePipeline(this, 'OkWildscapesPipeline', {
      pipelineName: 'OkWildscapesPipeline',
      synth: synth,
      crossAccountKeys: true
    });

    pipeline.addStage(
      new OkWildscapesStage(this, 'OkWildscapesDevStage', {
        stageName: 'Dev',
        config: Dev,
        env: {
          account: Dev.account.accountId,
          region: Dev.region
        }
      })
    );

    pipeline.addStage(
      new OkWildscapesStage(this, 'OkWildscapesProdStage', {
        stageName: 'Prod',
        config: Prod,
        env: {
          account: Prod.account.accountId,
          region: Prod.region
        }
      }),
      {
        pre: [
          new pipelines.ManualApprovalStep('ApproveDeploy', {
            comment: 'Please approve the deployment'
          })
        ]
      }
    );
  }
}
