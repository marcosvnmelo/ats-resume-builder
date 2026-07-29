import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';

interface BooleanFieldProps {
  id?: string;
  type?: 'text' | 'email';
  label?: string;
  placeholder?: string;
  fieldClassName?: string;
}

export function BooleanField(props: BooleanFieldProps) {
  const field = useFieldContext<boolean>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <Field
      data-invalid={isInvalid}
      className={props.fieldClassName}
      orientation="horizontal"
    >
      <Checkbox
        id={inputId}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />

      {props.label && (
        <FieldLabel htmlFor={inputId} className="font-normal">
          {props.label}
        </FieldLabel>
      )}
    </Field>
  );
}
