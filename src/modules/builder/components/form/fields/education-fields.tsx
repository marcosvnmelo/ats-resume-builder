import { useIntlayer } from 'react-intlayer';

import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface EducationFieldProps {
  index: number;
  removeItem: () => void;
}

export function EducationFields({ index, removeItem }: EducationFieldProps) {
  const t = useIntlayer('education-fields');

  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`education.items[${index}].degree`}>
          {(field) => (
            <field.TextField
              label={t.fields.degree.label}
              placeholder={t.fields.degree.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].school`}>
          {(field) => (
            <field.TextField
              label={t.fields.school.label}
              placeholder={t.fields.school.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].startYear`}>
          {(field) => (
            <field.DateField
              label={t.fields.startYear.label}
              fieldClassName={cn('w-full')}
            />
          )}
        </form.AppField>

        <form.AppField name={`education.items[${index}].endYear`}>
          {(field) => (
            <field.DateField
              label={t.fields.endYear.label}
              fieldClassName={cn('w-full')}
            />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
