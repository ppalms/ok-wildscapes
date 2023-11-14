import { Logger } from '@aws-lambda-powertools/logger';
import * as lambda from 'aws-lambda';

export interface ConsultationRequestInput {
  firstName: string;
  lastName: string;
  email: string;
  yardSize: number;
  phone: string;
  message: string;
  expectedBudget: string;
}

const logger = new Logger({ serviceName: 'publicSite' });

export const handler = async (
  event: lambda.APIGatewayProxyEvent
): Promise<lambda.APIGatewayProxyResult> => {
  try {
    logger.info(`Received request ${event.body}`);

    // TODO notify people

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent',
        input: event.body,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error sending message',
        input: event.body,
      }),
    };
  }
};
