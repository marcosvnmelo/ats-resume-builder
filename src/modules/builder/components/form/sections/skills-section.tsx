import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form/use-builder-form.ts';
import type { SkillType } from '#builder/schemas/resume-data.schema.ts';

import { ArraySectionLayout } from '../shared/array-section-layout';
import { ArraySingleFieldLayout } from '../shared/array-single-field-layout';

type DefaultValues = (typeof defaultValues.skills)[SkillType];

export const SkillsSection = withBuilderFieldGroup({
  defaultValues: {} as DefaultValues,
  render: function Render({ group }) {
    const { technical, additional, soft } = useIntlayer('skills-section');

    const skillType = String(group.fieldsMap).slice(
      'skills.'.length,
    ) as SkillType;

    const t = {
      technical,
      additional,
      soft,
    };

    return (
      <ArraySectionLayout
        legend={
          <group.AppField name="title">
            {(field) => (
              <field.TitleField
                title={t[skillType].title}
                defaultValue={t[skillType].title.toString()}
              />
            )}
          </group.AppField>
        }
        onAddItem={() => group.pushFieldValue('items', '')}
      >
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((skill, i) => (
              <ArraySingleFieldLayout
                key={skill + i}
                onRemoveItem={() => field.removeValue(i)}
              >
                <group.AppField name={`items[${i}]`}>
                  {(field) => (
                    <field.TextField placeholder={t[skillType].placeholder} />
                  )}
                </group.AppField>
              </ArraySingleFieldLayout>
            ))
          }
        </group.Field>
      </ArraySectionLayout>
    );
  },
});
