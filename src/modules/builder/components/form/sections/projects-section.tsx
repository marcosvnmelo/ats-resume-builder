import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';

import { ProjectFields } from '../fields/project-fields';
import { ArraySectionLayout } from '../shared/array-section-layout';

export const ProjectsSection = withBuilderFieldGroup({
  defaultValues: defaultValues.projects,
  render: function Render({ group }) {
    return (
      <ArraySectionLayout
        legend="Projects"
        onAddItem={() =>
          group.pushFieldValue('items', {
            name: '',
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
