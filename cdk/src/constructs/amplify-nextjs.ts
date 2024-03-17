import { SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import {
  App as AmplifyApp,
  CustomRule,
  GitHubSourceCodeProvider,
  Platform,
  RedirectStatus
} from '@aws-cdk/aws-amplify-alpha';

interface NextjsAppProps {
  amplifyAppName: string;
  owner: string;
  repository: string;
  branch: string;
  githubTokenName: string;
  apiBaseUrl: string;
}

export class AmplifyNextjs extends Construct {
  private readonly amplifyAppName: string;
  private readonly owner: string;
  private readonly repository: string;
  private readonly branch: string;
  private readonly githubTokenName: string;
  private readonly apiBaseUrl: string;

  constructor(scope: Construct, id: string, props: NextjsAppProps) {
    super(scope, id);

    this.amplifyAppName = props.amplifyAppName;
    this.owner = props.owner;
    this.repository = props.repository;
    this.branch = props.branch;
    this.githubTokenName = props.githubTokenName;
    this.apiBaseUrl = props.apiBaseUrl;

    this.initialize();
  }

  private initialize() {
    this.createAmplifyApp();
  }

  private createAmplifyApp() {
    const amplifyApp = new AmplifyApp(this, 'OkWildscapesAmplifyApp', {
      appName: this.amplifyAppName,
      platform: Platform.WEB_COMPUTE,
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: this.owner,
        repository: this.repository,
        oauthToken: SecretValue.secretsManager(this.githubTokenName) // TODO pass ARN to shared secret
      }),
      environmentVariables: {
        NEXT_PUBLIC_API_BASE_URL: this.apiBaseUrl
      },
      autoBranchDeletion: true,
      customRules: [
        new CustomRule({
          source: '/<*>',
          target: 'index.html',
          status: RedirectStatus.NOT_FOUND_REWRITE
        })
      ],
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'cd cdk && yarn install --frozen-lockfile && cd ..',
                'yarn install --frozen-lockfile'
              ]
            },
            build: {
              commands: ['yarn build']
            }
          },
          artifacts: {
            baseDirectory: '.next',
            files: ['**/*']
          },
          cache: {
            paths: ['node_modules/**/*', '.next/cache/**/*']
          }
        }
      })
    });

    amplifyApp.addBranch(this.branch, {
      stage: 'PRODUCTION'
    });
  }
}
