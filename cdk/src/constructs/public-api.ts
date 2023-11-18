import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import * as path from 'path';

export interface PublicApiProps {
  table: dynamodb.Table;
}

export class PublicRestApi extends Construct {
  public baseUrl: string;

  constructor(scope: Construct, id: string, props: PublicApiProps) {
    super(scope, id);

    const apiLoggingRole = new iam.Role(this, 'ApiGatewayRole', {
      assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          'ApiGatewayLoggingPolicy',
          'arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs'
        )
      ]
    });

    const account = new apigateway.CfnAccount(this, 'ApiGatewayAccount', {
      cloudWatchRoleArn: apiLoggingRole.roleArn
    });

    const apiGatewayLogGroup = new logs.LogGroup(this, 'ApiGatewayLogGroup', {
      retention: logs.RetentionDays.ONE_WEEK
    });

    const api = new apigateway.RestApi(this, 'PublicApi', {
      restApiName: 'Public API',
      deployOptions: {
        accessLogDestination: new apigateway.LogGroupLogDestination(
          apiGatewayLogGroup
        ),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields()
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key'
        ]
      }
    });

    this.baseUrl = api.url;

    api.node.addDependency(account);

    const publicKey = api.addApiKey('PublicApiKey', {
      description: 'Public API key for unauthenticated users'
    });

    const publicUsagePlan = api.addUsagePlan('PublicUsagePlan', {
      name: 'Public Usage Plan',
      apiStages: [{ stage: api.deploymentStage }],
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    });

    publicUsagePlan.addApiKey(publicKey);

    // https://docs.powertools.aws.dev/lambda/typescript/latest/
    const powertoolsLambdaLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'PowertoolsLayer',
      `arn:aws:lambda:${
        cdk.Stack.of(this).region
      }:094274105915:layer:AWSLambdaPowertoolsTypeScript:23`
    );

    const requestConsultation = new lambda.Function(
      this,
      'RequestConsultation',
      {
        code: lambda.Code.fromAsset(
          path.join('esbuild.out', 'requestConsultation')
        ),
        handler: 'main.handler',
        layers: [powertoolsLambdaLayer],
        runtime: lambda.Runtime.NODEJS_18_X,
        architecture: lambda.Architecture.ARM_64,
        environment: {
          APP_TABLE_NAME: props.table.tableName,
          POWERTOOLS_SERVICE_NAME: 'requestConsultation'
        }
      }
    );

    props.table.grantReadData(requestConsultation);
    props.table.grantWriteData(requestConsultation);

    const consultationRequestIntegration = new apigateway.LambdaIntegration(
      requestConsultation
    );

    api.root
      .addResource('consultation-request')
      .addMethod('POST', consultationRequestIntegration, {
        apiKeyRequired: true
      });
  }
}
