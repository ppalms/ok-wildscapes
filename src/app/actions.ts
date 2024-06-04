'use server';

import { getPresignedUrl } from '@/graphql/mutations';
import { cookiesClient } from '@/utils/amplify-server-utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

/*
 * Form schema and action for uploading plant sheets.
 */
const allowedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const formSchema = z.object({
  // plantSheet: z
  //   .instanceof(File)
  //   .refine((doc) => allowedFileTypes.some((allowed) => doc.type === allowed), {
  //     message: 'Invalid file type. Must be PDF or Word document.'
  //   }),
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(256, 'Title must not exceed 256 characters.')
});

export type State = {
  errors?: {
    plantSheet?: string[];
    title?: string[];
  };
  message?: string | null;
};

export async function uploadPlantSheet(
  _prevState: State,
  formData: FormData
): Promise<State> {
  for (const value of formData.values()) {
    console.log(value);
  }

  const validatedFields = formSchema.safeParse({
    // plantSheet: formData.get('plantSheet'),
    title: formData.get('title')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to upload document.'
    };
  }

  const { /*plantSheet,*/ title } = formSchema.parse({
    // plantSheet: formData.get('plantSheet'),
    title: formData.get('title')
  });
  // console.log(`Uploading document ${plantSheet.name}`);
  console.log(`Uploading document ${title}`);

  try {
    //   console.log('Getting presigned URL');
    //   const { data, errors } = await cookiesClient.graphql({
    //     query: getPresignedUrl,
    //     variables: {
    //       key: `plant-sheets/${plantSheet.name}`,
    //       title
    //     }
    //   });

    //   if (errors) {
    //     errors.map(({ message }) => console.error(message));
    //     return {
    //       message: 'Server error: Failed to upload document.'
    //     };
    //   }

    //   console.log(
    //     `Uploading document using presigned URL\n${data.getPresignedUrl.url}`
    //   );
    //   const response = await fetch(data.getPresignedUrl.url, {
    //     method: 'PUT',
    //     body: plantSheet
    //   });
    //   console.log(`S3 put response: ${response.status}`);
    //   if (response.status !== 200) {
    //     return {
    //       errors: {},
    //       message: `Server error: ${response.statusText}`
    //     };
    //   }

    //   revalidatePath('/plant-sheets');
    return {
      message: 'TODO - REMOVE ME.'
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Server error: Failed to upload document.'
    };
  } finally {
    redirect(`/plant-sheets`);
  }
}
