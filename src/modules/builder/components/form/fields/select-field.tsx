import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string }>;
  fieldClassName?: string;
}

export function SelectField(props: SelectFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <Field data-invalid={isInvalid} className={props.fieldClassName}>
      {props.label && <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>}

      <Select
        id={field.name}
        name={field.name}
        items={props.items}
        value={field.state.value}
        onValueChange={(value) =>
          field.handleChange(value ?? field.state.value)
        }
        aria-invalid={isInvalid}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={true}>
          <SelectGroup>
            {props.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
