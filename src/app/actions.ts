'use server';

import { listPlantSheets } from '@/graphql/queries';
import { ListPlantSheetsQuery, PlantSheet } from '@/graphql/types';
import { cookiesClient } from '@/utils/amplify-server-utils';
import { GraphQLResult } from 'aws-amplify/api';

export async function getPlantSheets(): Promise<PlantSheet[] | undefined> {
  try {
    const { data, errors }: GraphQLResult<ListPlantSheetsQuery> =
      await cookiesClient.graphql({
        query: listPlantSheets,
        variables: { maxKeys: 1000 } // TODO implement server side pagination
      });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return data.listPlantSheets;
  } catch (err) {
    console.log(err);
  }
}
