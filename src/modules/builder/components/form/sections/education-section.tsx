import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { EducationFields } from '../fields/education-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const EducationSection = withBuilderFieldGroup({
  defaultValues: defaultValues.education,
  render: function Render({ group }) {
    const t = useIntlayer('education-section');

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
            degree: '',
            school: '',
            startYear: '',
            endYear: '',
          })
        }
      >
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((education, i) => (
              <EducationFields
                key={education.school + i}
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
