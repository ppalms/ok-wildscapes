# OkWildflowers CDK Project

## Requirements

- AWS CDK CLI
  - `npm install -g aws-cdk`
  - `cdk bootstrap <profile-name>`
- [yarn](https://yarnpkg.com/getting-started/install)

## Build commands

- `yarn build:cjs` bundle and minify CDK stacks and Lambdas
  - Build configuration: `esbuild.cjs.config.js`
- `yarn package` package for deployment: run type checking, bundle, and minify
- `yarn deploy` deploy with CDK to `<profile-name>`

# CDK Info

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
