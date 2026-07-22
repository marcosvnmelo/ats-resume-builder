import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface WorkExperienceFieldsProps {
  index: number;
  removeItem: () => void;
}

export function WorkExperienceFields({
  index,
  removeItem,
}: WorkExperienceFieldsProps) {
  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup className="grid grid-cols-2">
        <form.AppField name={`workExperience.items[${index}].company`}>
          {(field) => (
            <field.TextField
              label="Company"
              placeholder="Torph TTC"
              fieldClassName="col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].position`}>
          {(field) => (
            <field.TextField
              label="Job Title"
              placeholder="Developer"
              fieldClassName="col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].description`}>
          {(field) => (
            <field.TextareaField
              label="Description"
              placeholder="Torph TTC is a global software company that offers user interface UI development tools and components for a range of developer applications across all platforms."
              fieldClassName="col-span-2 h-32"
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].keyAchievements`}>
          {(field) => (
            <field.TextareaField
              label="Key Achievements"
              placeholder={
                "Created and maintained 10 web applications for numerous national and foreign clients.\nEnsured that the user interfaces and user experience of the software applications developed by the team met at least 80% of users expectations.\nCreated and analyzed 500 unit test cases.\nDeveloped python scripts to automate image's noise-reduction process which helped improve research analysis time by 40%.\nEstablished and lead a team of 10 people; covering every key role in the early stages."
              }
              fieldClassName="col-span-2"
            />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].startYear`}>
          {(field) => (
            <field.DateField label="Start Year" fieldClassName="w-full" />
          )}
        </form.AppField>

        <form.AppField name={`workExperience.items[${index}].endYear`}>
          {(field) => (
            <field.DateField label="End Year" fieldClassName="w-full" />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
