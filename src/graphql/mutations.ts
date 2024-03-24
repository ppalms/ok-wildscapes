/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const requestConsultation = /* GraphQL */ `mutation RequestConsultation($consultationRequest: ConsultationRequestInput!) {
  requestConsultation(consultationRequest: $consultationRequest)
}
` as GeneratedMutation<
  APITypes.RequestConsultationMutationVariables,
  APITypes.RequestConsultationMutation
>;
