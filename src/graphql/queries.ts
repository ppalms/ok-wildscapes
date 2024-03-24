/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listConsultations = /* GraphQL */ `query ListConsultations($limit: Int!) {
  listConsultations(limit: $limit) {
    consultationId
    firstName
    lastName
    email
    phone
    zipCode
    projectSize
    message
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConsultationsQueryVariables,
  APITypes.ListConsultationsQuery
>;
