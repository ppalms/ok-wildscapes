import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');
import { Construct } from 'constructs';

export class PublicApi extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const powertoolsLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'PowertoolsLayer',
      `arn:aws:lambda:${
        cdk.Stack.of(this).region
      }:094274105915:layer:AWSLambdaPowertoolsTypeScript:23`
    );

    const consultationRequestHandler = new lambda.Function(
      this,
      'ConsultationRequestHandler',
      {
        code: lambda.Code.fromAsset(
          path.join('esbuild.out', 'sendConsultationRequest')
        ),
        handler: 'sendConsultationRequest.handler',
        layers: [powertoolsLayer],
        runtime: lambda.Runtime.NODEJS_18_X,
        architecture: lambda.Architecture.ARM_64,
      }
    );

    const api = new apigateway.RestApi(this, 'PublicApi', {
      restApiName: 'Public API',
    });

    const publicKey = api.addApiKey('PublicApiKey', {
      description: 'Public API key for unauthenticated website visitors',
    });

    const publicUsagePlan = api.addUsagePlan('PublicUsagePlan', {
      name: 'Public Usage Plan',
      apiStages: [{ stage: api.deploymentStage }],
      throttle: {
        rateLimit: 10,
        burstLimit: 2,
      },
    });

    publicUsagePlan.addApiKey(publicKey);

    const consultationRequestIntegration = new apigateway.LambdaIntegration(
      consultationRequestHandler
    );

    api.root
      .addResource('consultation-request')
      .addMethod('POST', consultationRequestIntegration, {
        apiKeyRequired: true,
      });
  }
}
