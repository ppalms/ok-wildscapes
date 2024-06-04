'use client';

import { State, uploadPlantSheet } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(uploadPlantSheet, initialState);

  return (
    <form action={dispatch}>
      <FormFields state={state} />

      <Buttons />
    </form>
  );
};

function FormFields({ state }: { state: State }) {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending}>
      <div className="py-4 md:py-6">
        {/* Plant sheet document */}
        <div className="mb-4">
          <label
            htmlFor="plantSheet"
            className="mb-2 block text-sm font-medium"
          >
            Document
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="plantSheet"
                name="plantSheet"
                type="file"
                placeholder="Select a file"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="plantSheet-error"
              />
            </div>
            <div id="plantSheet-error" aria-live="polite" aria-atomic="true">
              {state.errors?.plantSheet &&
                state.errors.plantSheet.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title displayed on the resources page"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div id="field-errors" aria-live="polite" aria-atomic="false">
        {state.errors && (
          <p className="mt-2 text-sm text-red-500" key={state.message}>
            {state.message}
          </p>
        )}
      </div>
    </fieldset>
  );
}

function Buttons() {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/plant-sheets"
          className={cn(
            'flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200',
            pending && 'pointer-events-none'
          )}
          aria-disabled={pending}
        >
          Cancel
        </Link>
        {pending ? (
          <Button aria-disabled disabled>
            Uploading...
          </Button>
        ) : (
          <Button>
            Upload{' '}
            <ArrowUpTrayIcon className="-mr-1 ml-1 h-5 w-5 text-gray-50" />
          </Button>
        )}
      </div>
    </>
  );
}

export default Form;
