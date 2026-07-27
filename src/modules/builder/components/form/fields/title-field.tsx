import { SquareCheckBigIcon, SquarePenIcon } from 'lucide-react';
import { Activity, useState } from 'react';

import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLegend } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface TitleFieldProps {
  id?: string;
}

export function TitleField(props: TitleFieldProps) {
  const field = useFieldContext<string>();

  const [isEditing, setIsEditing] = useState(false);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <>
      <Activity mode={!isEditing ? 'visible' : 'hidden'}>
        <FieldLegend>
          {field.state.value}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsEditing(true)}
          >
            <SquarePenIcon />
          </Button>
        </FieldLegend>
      </Activity>

      <Activity mode={isEditing ? 'visible' : 'hidden'}>
        <Field data-invalid={isInvalid} orientation="horizontal">
          <div className="flex gap-2">
            <Input
              id={inputId}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
            />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setIsEditing(false)}
            >
              <SquareCheckBigIcon />
            </Button>
          </div>

          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
      </Activity>
    </>
  );
}
