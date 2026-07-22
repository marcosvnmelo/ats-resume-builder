import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { WorkExperienceFields } from '../fields/work-experience-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const WorkExperienceSection = withBuilderFieldGroup({
  defaultValues: defaultValues.workExperience,
  render: function Render({ group }) {
    return (
      <ArraySectionLayout
        legend="Work Experience"
        onAddItem={() =>
          group.pushFieldValue('items', {
            company: '',
            position: '',
            description: '',
            keyAchievements: '',
            startYear: '',
            endYear: '',
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
