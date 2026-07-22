import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { SocialMediaField } from '../fields/social-media-field';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const SocialMediaSection = withBuilderFieldGroup({
  defaultValues: defaultValues.socialMedia,
  render: function Render({ group }) {
    return (
      <ArraySectionLayout
        legend="Social Medias"
        onAddItem={() =>
          group.pushFieldValue('items', { socialMedia: '', link: '' })
        }
      >
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
      </ArraySectionLayout>
    );
  },
});
