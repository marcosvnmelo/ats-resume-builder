import { PlusCircleIcon } from 'lucide-react';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { Button } from '@/components/ui/button';
import { FieldLegend, FieldSet } from '@/components/ui/field';

import { SocialMediaField } from './social-media-field';

export const SocialMediaFields = withBuilderFieldGroup({
  defaultValues: defaultValues.socialMedia,
  render: function Render({ group }) {
    return (
      <FieldSet>
        <FieldLegend>Social Medias</FieldLegend>
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((socialMedia, i) => (
              <SocialMediaField
                key={socialMedia.socialMedia + i}
                index={i}
                removeItem={() => field.removeValue(i)}
              />
            ))
          }
        </group.Field>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() =>
            group.pushFieldValue('items', { socialMedia: '', link: '' })
          }
        >
          <PlusCircleIcon />
        </Button>
      </FieldSet>
    );
  },
});
