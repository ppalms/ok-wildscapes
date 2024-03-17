import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppStack } from '../src/stacks/app-stack';

test('Amplify App Created', () => {
  const app = new cdk.App();
  const appName = 'TestApp';

  const stack = new AppStack(app, 'MyTestStack', {
    owner: 'XXXXXXXXXXXXX',
    repository: 'XXXXXXXXXXXXX',
    branch: 'main',
    githubTokenName: 'XXXXXXXXXXXXX',
    appName: appName,
    sharedServicesRoleArn: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    env: { account: '123456789012', region: 'us-east-1' }
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Amplify::App', {
    Name: appName
  });
});
