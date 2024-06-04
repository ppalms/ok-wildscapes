'use server';

import { listPlantSheets } from '@/graphql/queries';
import { ListPlantSheetsQuery, PlantSheet } from '@/graphql/types';
import { cookiesClient } from '@/utils/amplify-server-utils';
import { GraphQLResult } from 'aws-amplify/api';
import { unstable_noStore as noStore } from 'next/cache';

export async function getPlantSheets(): Promise<PlantSheet[]> {
  noStore();
  let plantSheets: PlantSheet[] = [];
  try {
    const { data, errors }: GraphQLResult<ListPlantSheetsQuery> =
      await cookiesClient.graphql({
        query: listPlantSheets,
        variables: { maxKeys: 1000 } // TODO implement server side pagination
      });

    if (errors) {
      errors.map(({ message }) => console.error(message));
    }

    plantSheets = data.listPlantSheets;
  } catch (error) {
    console.error(error);
  } finally {
    return plantSheets;
  }
}
