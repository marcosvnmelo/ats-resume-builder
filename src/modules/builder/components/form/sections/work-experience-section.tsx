import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { WorkExperienceFields } from '../fields/work-experience-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const WorkExperienceSection = withBuilderFieldGroup({
  defaultValues: defaultValues.workExperience,
  render: function Render({ group }) {
    const t = useIntlayer('work-experience-section');

    return (
      <ArraySectionLayout
        legend={
          <group.AppField name="title">
            {(field) => (
              <field.TitleField
                title={t.title}
                defaultValue={t.title.toString()}
              />
            )}
          </group.AppField>
        }
        onAddItem={() =>
          group.pushFieldValue('items', {
            company: '',
            position: '',
            description: '',
            keyAchievements: '',
            startYear: '',
            endYear: '',
            showOnBottom: false,
          })
        }
      >
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((workExperience, i) => (
              <WorkExperienceFields
                key={workExperience.company + i}
                index={i}
                removeItem={() => field.removeValue(i)}
              />
            ))
          }
        </group.Field>
      </ArraySectionLayout>
    );
  },
});
