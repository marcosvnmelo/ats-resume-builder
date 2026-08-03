import { useIntlayer } from 'react-intlayer';

import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface WorkExperienceFieldsProps {
  index: number;
  removeItem: () => void;
}

export function WorkExperienceFields({
  index,
  removeItem,
}: WorkExperienceFieldsProps) {
  const t = useIntlayer('work-experience-fields');

  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`workExperience.items[${index}].company`}>
          {(field) => (
            <field.TextField
              label={t.fields.company.label}
              placeholder={t.fields.company.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].position`}>
          {(field) => (
            <field.TextField
              label={t.fields.position.label}
              placeholder={t.fields.position.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].description`}>
          {(field) => (
            <field.TextareaField
              label={t.fields.description.label}
              placeholder={t.fields.description.placeholder}
              fieldClassName={cn('col-span-2 h-32')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].keyAchievements`}>
          {(field) => (
            <field.TextareaField
              label={t.fields.keyAchievements.label}
              placeholder={t.fields.keyAchievements.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].startYear`}>
          {(field) => (
            <field.DateField
              label={t.fields.startYear.label}
              fieldClassName={cn('w-full')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].endYear`}>
          {(field) => (
            <field.DateField
              label={t.fields.endYear.label}
              fieldClassName={cn('w-full')}
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].showOnBottom`}>
          {(field) => (
            <field.BooleanField label={t.fields.showOnBottom.label} />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
