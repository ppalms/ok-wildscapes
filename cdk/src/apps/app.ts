#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../stacks/pipeline-stack';
import { Account, Accounts } from '../../accounts';
// import { AppStack } from '../stacks/app-stack';

const app = new cdk.App();
const accounts = Accounts.load();

export interface EnvironmentConfig {
  account: Account;
  region: string;
}

const Dev: EnvironmentConfig = {
  account: accounts.development!,
  region: 'us-east-1'
};

const Prod: EnvironmentConfig = {
  account: accounts.production!,
  region: 'us-east-1'
};

new PipelineStack(app, 'OkWildscapesPipelineStack', {
  owner: 'ppalms',
  repository: 'ok-wildscapes',
  branch: 'main',
  githubTokenName: 'ok-wildscapes-cicd-token',
  devConfig: Dev,
  prodConfig: Prod,
  env: {
    account: accounts.toolchain!.accountId,
    region: 'us-east-1'
  }
});

// new AppStack(app, 'OkWildscapesStack', {
//   appName: 'OkWildscapes',
//   owner: 'ppalms',
//   repository: 'ok-wildscapes',
//   branch: 'sandbox',
//   githubTokenName: 'ok-wildscapes-cicd-token',
//   env: { account: 'xxxxxxxxxx', region: 'us-east-1' }
// });

app.synth();
