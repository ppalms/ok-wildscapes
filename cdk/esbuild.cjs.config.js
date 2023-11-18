/* eslint-disable */
// CommonJS build configuration for NodeJS Lambda functions and CDK app
const glob = require('glob');
const path = require('path');
const esbuild = require('esbuild');
const outputDir = 'esbuild.out';

// Clean output directory before building
// https://github.com/isaacs/rimraf#readme
console.log('Cleaning esbuild.out');
require('rimraf').sync(outputDir);

// Lambda functions must be under the cdk/src/handlers folder and named
// "[functionName].ts" for esbuild to pick them up
const lambdaEntryPoints = glob.sync('./src/handlers/**/*.ts');
lambdaEntryPoints.forEach((entry) => {
  const functionName = path.basename(entry, '.ts');

  console.log(`Building Lambda function ${functionName}`);
  esbuild
    .build({
      entryPoints: [entry],
      bundle: true,
      minify: true,
      platform: 'node',
      target: 'node20',
      external: [
        'aws-sdk',
        '@aws-lambda-powertools/commons',
        '@aws-lambda-powertools/logger',
        '@aws-lambda-powertools/metrics',
        '@aws-lambda-powertools/tracer'
      ],
      outfile: `${outputDir}/${functionName}/main.js`,
      format: 'cjs'
      // sourcemap: true,
    })
    .catch(() => process.exit(1));
});

console.log(`Building CDK app`);
esbuild.build({
  entryPoints: ['./src/apps/app.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node20',
  external: ['aws-sdk'],
  outfile: `${outputDir}/app.js`,
  format: 'cjs'
  // sourcemap: true,
});
