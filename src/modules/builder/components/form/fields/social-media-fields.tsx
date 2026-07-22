import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';

import { ArrayFieldsLayout } from '../shared/array-fields-layout';

interface SocialMediaFieldsProps {
  index: number;
  removeItem: () => void;
}

export function SocialMediaFields({
  index,
  removeItem,
}: SocialMediaFieldsProps) {
  const form = useBuilderFormContext({
    ...builderFormOptions,
  });
  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup>
        <form.AppField name={`socialMedia.items[${index}].socialMedia`}>
          {(field) => (
            <field.TextField label="Social Media" placeholder="LinkedIn" />
          )}
        </form.AppField>

        <form.AppField name={`socialMedia.items[${index}].link`}>
          {(field) => (
            <field.TextField
              label="Link"
              placeholder="https://linkedin.com/in/username"
            />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
