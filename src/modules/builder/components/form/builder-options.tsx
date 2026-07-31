import type { __DeclaredLocalesRegistry } from 'intlayer';
import { localeMap } from 'intlayer';
import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { resumeDataSchemaV1 } from '#builder/schemas/resume-data.schema.ts';
import { FieldGroup, FieldSet } from '@/components/ui/field';

export const BuilderOptions = withBuilderFieldGroup({
  defaultValues: defaultValues.options,
  render: function Render({ group }) {
    const t = useIntlayer('builder-options');

    const localeItems = localeMap(({ locale }) => ({
      label: t.fields.locale.options[locale as keyof __DeclaredLocalesRegistry],
      value: locale,
    }));

    const monthFormatItems =
      resumeDataSchemaV1.shape.options.shape.dateRangeMonthFormat.def.innerType.options.map(
        (monthFormat) => ({
          label: t.fields.dateRangeMonthFormat.options[monthFormat],
          value: monthFormat,
        }),
      );

    return (
      <FieldSet>
        <FieldGroup>
          <group.AppField name="resumeTitleTemplate">
            {(field) => (
              <field.TitleField
                label={t.fields.resumeTitleTemplate.label}
                title={t.fields.resumeTitleTemplate.defaultValue}
                defaultValue={t.fields.resumeTitleTemplate.defaultValue.toString()}
                description={t.fields.resumeTitleTemplate.description}
                isEditing
              />
            )}
          </group.AppField>

          <group.AppField name="locale">
            {(field) => (
              <field.SelectField
                label={t.fields.locale.label}
                items={localeItems}
              />
            )}
          </group.AppField>

          <group.AppField name="dateRangeMonthFormat">
            {(field) => (
              <field.SelectField
                label={t.fields.dateRangeMonthFormat.label}
                items={monthFormatItems}
              />
            )}
          </group.AppField>
        </FieldGroup>
      </FieldSet>
    );
  },
});
