import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { FieldGroup } from '@/components/ui/field';

import { DeleteButton } from '../shared/delete-button';

interface SocialMediaFieldProps {
  index: number;
  removeItem: () => void;
}

export function SocialMediaField({ index, removeItem }: SocialMediaFieldProps) {
  const form = useBuilderFormContext({
    ...builderFormOptions,
  });
  return (
    <div className="flex gap-3">
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

      <DeleteButton className="mt-8" onClick={removeItem} />
    </div>
  );
}
