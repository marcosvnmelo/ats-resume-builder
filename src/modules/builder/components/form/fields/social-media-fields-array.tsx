import { PlusIcon } from 'lucide-react';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderForm } from '#builder/hooks/use-builder-form.ts';
import { Button } from '@/components/ui/button';
import { FieldLegend, FieldSet } from '@/components/ui/field';

import { SocialMediaField } from './social-media-fields';

export const SocialMediaFields = withBuilderForm({
  defaultValues,
  render: function Render({ form }) {
    return (
      <FieldSet>
        <FieldLegend>Social Medias</FieldLegend>
        <form.Field name="socialMedia" mode="array">
          {(field) =>
            field.state.value.map((socialMedia, i) => (
              <SocialMediaField
                key={socialMedia.socialMedia + i}
                index={i}
                removeItem={() => field.removeValue(i)}
              />
            ))
          }
        </form.Field>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() =>
            form.pushFieldValue('socialMedia', { socialMedia: '', link: '' })
          }
        >
          <PlusIcon className="" />
        </Button>
      </FieldSet>
    );
  },
});
