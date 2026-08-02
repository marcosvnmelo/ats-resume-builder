import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form/use-builder-form.ts';

import { ProjectFields } from '../fields/project-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const ProjectsSection = withBuilderFieldGroup({
  defaultValues: defaultValues.projects,
  render: function Render({ group }) {
    const t = useIntlayer('projects-section');

    return (
      <ArraySectionLayout
        legend={
          <>
            <group.AppField name="title">
              {(field) => (
                <field.TitleField
                  title={t.title}
                  defaultValue={t.title.toString()}
                />
              )}
            </group.AppField>

            <group.AppField name="showOnBottom">
              {(field) => <field.BooleanField label={t.showOnBottom.label} />}
            </group.AppField>
          </>
        }
        onAddItem={() =>
          group.pushFieldValue('items', {
            name: '',
            link: '',
            description: '',
            keyAchievements: '',
            startYear: '',
            endYear: '',
          })
        }
      >
        <group.Field name="items" mode="array">
          {(field) =>
            field.state.value.map((project, i) => (
              <ProjectFields
                key={project.name + i}
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
