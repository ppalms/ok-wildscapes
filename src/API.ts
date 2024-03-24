/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ConsultationRequestInput = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  // TODO use AWSPhoneNumber (requires formatting in client/resolver)
  zipCode: string,
  // TODO AWSPostalCode!
  projectSize: ProjectSize,
  message: string,
};

export enum ProjectSize {
  UNDER_1K = "UNDER_1K",
  _1K_TO_2K = "_1K_TO_2K",
  OVER_2K = "OVER_2K",
}


export type ConsultationRequest = {
  __typename: "ConsultationRequest",
  consultationId: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  zipCode: string,
  projectSize: ProjectSize,
  message: string,
};

export type RequestConsultationMutationVariables = {
  consultationRequest: ConsultationRequestInput,
};

export type RequestConsultationMutation = {
  requestConsultation?: string | null,
};

export type ListConsultationsQueryVariables = {
  limit: number,
};

export type ListConsultationsQuery = {
  listConsultations:  Array< {
    __typename: "ConsultationRequest",
    consultationId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    zipCode: string,
    projectSize: ProjectSize,
    message: string,
  } | null >,
};
