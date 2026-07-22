import type React from 'react';

import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TextFieldProps extends Pick<
  React.ComponentProps<'textarea'>,
  'className' | 'maxLength' | 'placeholder'
> {
  id?: string;
  label?: string;
  fieldClassName?: string;
}

export function TextareaField(props: TextFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <Field data-invalid={isInvalid} className={props.fieldClassName}>
      {props.label && <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>}

      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={props.placeholder}
        aria-invalid={isInvalid}
        className={cn('h-40', props.className)}
        maxLength={props.maxLength}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
