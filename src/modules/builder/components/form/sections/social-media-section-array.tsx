import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { SocialMediaFields } from '../fields/social-media-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const SocialMediaSection = withBuilderFieldGroup({
  defaultValues: defaultValues.socialMedia,
  render: function Render({ group }) {
    return (
      <ArraySectionLayout
        legend={
          <group.AppField name="title">
            {(field) => <field.TitleField />}
          </group.AppField>
        }
        onAddItem={() =>
          group.pushFieldValue('items', { socialMedia: '', link: '' })
        }
      >
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((socialMedia, i) => (
              <SocialMediaFields
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
