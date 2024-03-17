import { Logger } from '@aws-lambda-powertools/logger';
import * as lambda from 'aws-lambda';
import * as sts from '@aws-sdk/client-sts';
import * as ses from '@aws-sdk/client-ses';
import * as dynamodb from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 } from 'uuid';

export interface ConsultationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectSize: string;
  message: string;
}

const logger = new Logger();

export const handler = async (
  event: lambda.APIGatewayProxyEvent
): Promise<lambda.APIGatewayProxyResult> => {
  logger.info(`Received consultation request ${JSON.stringify(event.body)}`);
  let consultationRequest: ConsultationRequest;

  try {
    consultationRequest = <ConsultationRequest>JSON.parse(event.body!);
  } catch (error) {
    logger.error('Invalid request', error as Error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid request',
        input: event.body
      })
    };
  }

  const consultationId = v4();
  logger.info(`Creating consultation ${consultationId}`);

  try {
    const stsClient = new sts.STSClient({ region: 'us-east-1' });
    const assumedRole = await stsClient.send(
      new sts.AssumeRoleCommand({
        RoleArn: process.env.SHARED_SERVICES_ROLE_ARN,
        RoleSessionName: `WorkloadAccess_${consultationId}`
      })
    );

    const accessKeyId = assumedRole.Credentials?.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials?.SecretAccessKey;
    const sessionToken = assumedRole.Credentials?.SessionToken;

    if (!accessKeyId || !secretAccessKey || !sessionToken) {
      logger.critical(
        'Failed to assume shared services role',
        JSON.stringify(assumedRole)
      );
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Internal server error',
          input: event.body
        })
      };
    }

    logger.info('Emailing consultation request');
    const sesClient = new ses.SESClient({
      credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken
      },
      region: 'us-east-1'
    });
    await sesClient.send(
      new ses.SendEmailCommand({
        Source: 'no-reply@okwildscapes.com',
        Destination: {
          ToAddresses: ['contact@okwildscapes.com']
        },
        Message: {
          Subject: {
            Data: 'New consultation request'
          },
          Body: {
            Html: {
              Data: `<h1>New consultation request</h1>
<div>
  <p>
    Name: ${consultationRequest.firstName} ${consultationRequest.lastName}<br />
    Email: ${consultationRequest.email}<br />
    Phone: ${consultationRequest.phone}<br />
    Project Size: ${consultationRequest.projectSize}<br />
    Message: ${consultationRequest.message}<br />
    Consultation ID: ${consultationId}<br />
  </p>
</div>`
            }
          }
        }
      })
    );
  } catch (error) {
    logger.critical('Consultation request email failed', error as Error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        input: event.body
      })
    };
  }

  try {
    const dbClient = new dynamodb.DynamoDBClient();

    const consultationRequestItem = {
      PK: `CONSULTATION#${consultationId}`,
      SK: 'REQUEST',
      ...consultationRequest,
      createdAt: new Date().toISOString()
    };

    const putItemCommand = new dynamodb.PutItemCommand({
      TableName: process.env.APP_TABLE_NAME!,
      Item: marshall(consultationRequestItem)
    });

    await dbClient.send(putItemCommand);
    logger.info(`Saved consultation request ${consultationRequestItem.PK}`);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Consultation request sent',
        result: { consultationId, ...consultationRequest }
      })
    };
  } catch (error) {
    logger.error('Error saving consultation request', error as Error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        input: event.body
      })
    };
  }
};
