import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup, FieldSet } from '@/components/ui/field';

export const SummarySection = withBuilderFieldGroup({
  defaultValues: defaultValues.summary,
  render: function Render({ group }) {
    return (
      <FieldSet>
        <group.AppField name="title">
          {(field) => <field.TitleField />}
        </group.AppField>

        <FieldGroup>
          <group.AppField name="text">
            {(field) => <field.TextareaField maxLength={500} />}
          </group.AppField>
        </FieldGroup>
      </FieldSet>
    );
  },
});
