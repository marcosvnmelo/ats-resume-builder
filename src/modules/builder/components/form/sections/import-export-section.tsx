import { DownloadIcon, UploadIcon } from 'lucide-react';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { resumeDataSchema } from '#builder/schemas/resume-data.schema.ts';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const ImportExportSection = withBuilderFieldGroup({
  defaultValues: defaultValues.import,
  render: function Render({ group }) {
    function downloadResumeData() {
      const resumeData = group.form.state.values;
      // TODO: download resume data as JSON
      console.log(resumeData);
    }

    return (
      <FieldSet>
        <FieldGroup className="flex-row justify-center *:w-auto">
          <group.Field
            name="file"
            listeners={{
              async onChange({ value, fieldApi }) {
                const file = value;

                if (!file) return;

                const fileContent = await file.text();

                const parsedJson = JSON.parse(fileContent);

                const parsedData = resumeDataSchema.parse(parsedJson);

                fieldApi.form.setFieldValue('personalInformation', {
                  name: parsedData.name,
                  position: parsedData.position,
                  contactInformation: parsedData.contactInformation,
                  email: parsedData.email,
                  address: parsedData.address,
                  profilePicture: parsedData.profilePicture,
                });

                fieldApi.form.setFieldValue(
                  'socialMedia.items',
                  parsedData.socialMedia,
                );

                fieldApi.form.setFieldValue('summary.text', parsedData.summary);

                fieldApi.form.setFieldValue(
                  'education.items',
                  parsedData.education,
                );

                fieldApi.form.setFieldValue(
                  'workExperience.items',
                  parsedData.workExperience,
                );

                fieldApi.form.setFieldValue(
                  'projects.items',
                  parsedData.projects,
                );

                fieldApi.form.setFieldValue(
                  'skills.title',
                  parsedData.skills[0].title,
                );
                fieldApi.form.setFieldValue(
                  'skills.items',
                  parsedData.skills[0].skills,
                );

                fieldApi.form.setFieldValue(
                  'languages.items',
                  parsedData.languages,
                );
              },
            }}
          >
            {(field) => (
              <Field orientation="horizontal">
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  className="hidden"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.files?.item(0) ?? null)
                  }
                  accept=".json"
                />
                <FieldLabel htmlFor={field.name} className="text-xl">
                  Import
                  <span className={buttonVariants({ size: 'icon-lg' })}>
                    <UploadIcon className="pointer-events-none size-5" />
                  </span>
                </FieldLabel>
              </Field>
            )}
          </group.Field>
          <Field orientation="horizontal">
            <FieldLabel className="text-xl" render={<span />}>
              Export
            </FieldLabel>
            <Button
              id="export-button"
              size="icon-lg"
              onClick={downloadResumeData}
            >
              <DownloadIcon className="size-5" />
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    );
  },
});
