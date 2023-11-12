import { SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import {
  App as AmplifyApp,
  GitHubSourceCodeProvider,
  RedirectStatus,
} from '@aws-cdk/aws-amplify-alpha';
import { CfnApp } from 'aws-cdk-lib/aws-amplify';

interface NextjsAppProps {
  amplifyAppName: string;
  owner: string;
  repository: string;
  branch: string;
  githubTokenName: string;
}

export class NextjsAmplify extends Construct {
  private readonly amplifyAppName: string;
  private readonly owner: string;
  private readonly repository: string;
  private readonly branch: string;
  private readonly githubTokenName: string;

  constructor(scope: Construct, id: string, props: NextjsAppProps) {
    super(scope, id);

    this.amplifyAppName = props.amplifyAppName;
    this.owner = props.owner;
    this.repository = props.repository;
    this.branch = props.branch;
    this.githubTokenName = props.githubTokenName;

    this.initialize();
  }

  private initialize() {
    this.createAmplifyApp();
  }

  private createAmplifyApp() {
    const amplifyApp = new AmplifyApp(this, 'OkWildscapesAmplifyApp', {
      appName: this.amplifyAppName,
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: this.owner,
        repository: this.repository,
        oauthToken: SecretValue.secretsManager(this.githubTokenName),
      }),
      autoBranchDeletion: true,
      customRules: [
        {
          source: '/<*>',
          target: '/index.html',
          status: RedirectStatus.NOT_FOUND_REWRITE,
        },
      ],
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'cd cdk',
                'yarn install --frozen-lockfile',
                'cd ..',
                'yarn install --frozen-lockfile',
              ],
            },
            build: {
              commands: ['yarn build'],
            },
          },
          artifacts: {
            baseDirectory: '.next',
            files: ['**/*'],
          },
          cache: {
            paths: ['node_modules/**/*'],
          },
        },
      }),
    });

    amplifyApp.addBranch(this.branch, {
      stage: 'PRODUCTION',
    });

    const cfnAmplifyApp = amplifyApp.node.defaultChild as CfnApp;
    cfnAmplifyApp.platform = 'WEB_COMPUTE';
  }
}
