import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface TextFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
}

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <Field data-invalid={isInvalid}>
      {props.label && <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>}

      <Input
        id={inputId}
        name={field.name}
        type="text"
        placeholder={props.placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
