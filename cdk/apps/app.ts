#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../stacks/app-stack';

const app = new cdk.App();
new AppStack(app, 'OkWildscapesStack', {
  amplifyAppName: 'OkWildscapes',
  owner: 'ppalms',
  repository: 'ok-wildscapes',
  branch: 'main',
  githubTokenName: 'ok-wildscapes-cicd-token',
  env: { account: '311541930391', region: 'us-east-1' },
});

app.synth();
