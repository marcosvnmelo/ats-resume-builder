import { TrashIcon } from 'lucide-react';

import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderFormContext } from '#builder/hooks/use-builder-form.ts';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

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

      <Button
        type="button"
        size="icon"
        variant="destructive"
        className="mt-8"
        onClick={removeItem}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
