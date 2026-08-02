import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form/use-builder-form.ts';

import { ArraySectionLayout } from '../shared/array-section-layout';
import { ArraySingleFieldLayout } from '../shared/array-single-field-layout';

export const LanguagesSection = withBuilderFieldGroup({
  defaultValues: defaultValues.languages,
  render: function Render({ group }) {
    const t = useIntlayer('languages-section');

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
        onAddItem={() => group.pushFieldValue('items', '')}
      >
        <group.AppField name="showOnBottom">
          {(field) => <field.BooleanField label={t.showOnBottom.label} />}
        </group.AppField>

        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((language, i) => (
              <ArraySingleFieldLayout
                key={language + i}
                onRemoveItem={() => field.removeValue(i)}
              >
                <group.AppField name={`items[${i}]`}>
                  {(field) => <field.TextField placeholder="English" />}
                </group.AppField>
              </ArraySingleFieldLayout>
            ))
          }
        </group.Field>
      </ArraySectionLayout>
    );
  },
});
