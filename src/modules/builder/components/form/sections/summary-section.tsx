import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field';

export const SummarySection = withBuilderFieldGroup({
  defaultValues: defaultValues.summary,
  render: function Render({ group }) {
    return (
      <FieldSet>
        <FieldLegend>Summary</FieldLegend>

        <FieldGroup>
          <group.AppField name="text">
            {(field) => <field.TextareaField maxLength={500} />}
          </group.AppField>
        </FieldGroup>
      </FieldSet>
    );
  },
});
