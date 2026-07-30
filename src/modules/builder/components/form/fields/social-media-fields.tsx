import { useIntlayer } from 'react-intlayer';

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
  const t = useIntlayer('social-media-fields');

  const form = useBuilderFormContext({
    ...builderFormOptions,
  });

  return (
    <ArrayFieldsLayout onRemoveItem={removeItem}>
      <FieldGroup>
        <form.AppField name={`socialMedia.items[${index}].socialMedia`}>
          {(field) => (
            <field.TextField
              label={t.fields.socialMedia.label}
              placeholder={t.fields.socialMedia.placeholder}
            />
          )}
        </form.AppField>

        <form.AppField name={`socialMedia.items[${index}].link`}>
          {(field) => (
            <field.TextField
              label={t.fields.link.label}
              placeholder={t.fields.link.placeholder}
            />
          )}
        </form.AppField>
      </FieldGroup>
    </ArrayFieldsLayout>
  );
}
