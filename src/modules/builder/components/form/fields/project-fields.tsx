import { useIntlayer } from 'react-intlayer';

import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface ProjectFieldsProps {
  index: number;
  removeItem: () => void;
}

export function ProjectFields({ index, removeItem }: ProjectFieldsProps) {
  const t = useIntlayer('project-fields');

  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`projects.items[${index}].name`}>
          {(field) => (
            <field.TextField
              label={t.fields.name.label}
              placeholder={t.fields.name.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].link`}>
          {(field) => (
            <field.TextField
              label={t.fields.link.label}
              placeholder={t.fields.link.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].description`}>
          {(field) => (
            <field.TextareaField
              label={t.fields.description.label}
              placeholder={t.fields.description.placeholder}
              fieldClassName={cn('col-span-2 h-32')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].keyAchievements`}>
          {(field) => (
            <field.TextareaField
              label={t.fields.keyAchievements.label}
              placeholder={t.fields.keyAchievements.placeholder}
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].startYear`}>
          {(field) => (
            <field.DateField
              label={t.fields.startYear.label}
              fieldClassName={cn('w-full')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].endYear`}>
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
