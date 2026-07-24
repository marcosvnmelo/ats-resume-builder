import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface ProjectFieldsProps {
  index: number;
  removeItem: () => void;
}

export function ProjectFields({ index, removeItem }: ProjectFieldsProps) {
  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`projects.items[${index}].name`}>
          {(field) => (
            <field.TextField
              label="Project Name"
              placeholder="ATS Resume Builder"
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].name`}>
          {(field) => (
            <field.TextField
              label="Link"
              placeholder="https://github.com/marcosvnmelo/ats-resume-builder"
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].description`}>
          {(field) => (
            <field.TextareaField
              label="Description"
              placeholder="ATS Resume Builder is a web application that allows users to create and manage their resumes."
              fieldClassName={cn('col-span-2 h-32')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].keyAchievements`}>
          {(field) => (
            <field.TextareaField
              label="Key Achievements"
              placeholder={
                'Allow users to create and manage their resumes.\nAllow users to import and export their resumes.'
              }
              fieldClassName={cn('col-span-2')}
            />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].startYear`}>
          {(field) => (
            <field.DateField label="Start Year" fieldClassName={cn('w-full')} />
          )}
        </form.AppField>

        <form.AppField name={`projects.items[${index}].endYear`}>
          {(field) => (
            <field.DateField label="End Year" fieldClassName={cn('w-full')} />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
