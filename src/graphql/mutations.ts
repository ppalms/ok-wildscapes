/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
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
export const getPresignedUrl = /* GraphQL */ `mutation GetPresignedUrl($key: String!, $title: String!) {
  getPresignedUrl(key: $key, title: $title) {
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.GetPresignedUrlMutationVariables,
  APITypes.GetPresignedUrlMutation
>;
