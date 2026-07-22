import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';

import { DeleteButton } from '../shared/delete-button';

interface EducationFieldProps {
  index: number;
  removeItem: () => void;
}

export function EducationFields({ index, removeItem }: EducationFieldProps) {
  const form = useBuilderFormContext({
    ...builderFormOptions,
  });
  return (
    <div className="flex gap-3">
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`education.items[${index}].school`}>
          {(field) => (
            <field.TextField
              label="Degree"
              placeholder="Bachelor of Computer Science"
              fieldClassName="col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].school`}>
          {(field) => (
            <field.TextField
              label="School"
              placeholder="New York University"
              fieldClassName="col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].startYear`}>
          {(field) => (
            <field.DateField label="Start Year" fieldClassName="w-full" />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].endYear`}>
          {(field) => (
            <field.DateField label="End Year" fieldClassName="w-full" />
          )}
        </form.AppField>
      </FieldGroup>

      <DeleteButton className="mt-8" onClick={removeItem} />
    </div>
  );
}
