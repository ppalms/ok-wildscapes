import clsx from 'clsx';
import { forwardRef, useId } from 'react';

const formClasses =
  'form-field';

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
        className="form-label"
      >
        {text}
      </label>
      {description && (
        <p id={`${id}-description`} className="text-gray-500 text-sm">
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
            ? clsx(formClasses, 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500/20')
            : formClasses
        }
      />
      {error && (
        <div className="mt-2 text-sm text-red-600" role="alert">
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
