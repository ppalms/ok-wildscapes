import clsx from 'clsx';
import { forwardRef, useId } from 'react';

const formClasses =
  'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6';

function Label({
  id,
  text,
  description
}: {
  id: string;
  text: string;
  description?: string | undefined;
}) {
  return (
    <div className="flex justify-between text-sm leading-6">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-900"
      >
        {text}
      </label>
      {description && (
        <p id={`${id}-description`} className="text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * TextField for use with react-hook-form
 */
export const TextField = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithRef<'input'>, 'id'> & {
    label?: string;
    description?: string;
    error?: string;
  }
>(({ label, description, type = 'text', className, error, ...props }, ref) => {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id} text={label} description={description} />}
      <input
        ref={ref}
        id={id}
        type={type}
        {...props}
        className={
          error
            ? clsx(formClasses, 'ring-red-300 text-red-900 focus:ring-red-500')
            : formClasses
        }
      />
      {error && (
        <div className="text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export function SelectField({
  label,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> & { label?: string }) {
  const id = useId();

  return (
    <div className={className}>
      {label && <Label id={id} text={label} />}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
}
