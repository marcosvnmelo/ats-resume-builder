import { DownloadIcon, UploadIcon } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form/use-builder-form.ts';
import { resumeExportDataSchema } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const ImportExportSection = withBuilderFieldGroup({
  defaultValues: defaultValues.import,
  render: function Render({ group }) {
    const t = useIntlayer('import-export-section');

    function downloadResumeData() {
      const resumeData = useBuilderPreviewStore.getState().resumeData;
      const resumeExportData = resumeExportDataSchema.parse(resumeData);

      const jsonData = JSON.stringify(resumeExportData, null, 2);

      const blob = new Blob([jsonData], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = window.document.title + '.json';

      link.click();
    }

    return (
      <FieldSet>
        <FieldGroup className="flex-row justify-center *:w-auto">
          <group.Field name="file">
            {(field) => (
              <Field orientation="horizontal">
                <Input
                  id={field.name}
                  name={field.name}
                  data-testid={`input-${field.name}`}
                  type="file"
                  className="hidden"
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.files?.item(0) ?? null)
                  }
                  accept=".json"
                />
                <FieldLabel htmlFor={field.name} className="text-xl">
                  {t.import}
                  <span className={buttonVariants({ size: 'icon-lg' })}>
                    <UploadIcon className="pointer-events-none size-5" />
                  </span>
                </FieldLabel>
              </Field>
            )}
          </group.Field>
          <Field orientation="horizontal">
            <FieldLabel className="text-xl" render={<span />}>
              {t.export}
            </FieldLabel>
            <Button
              id="export-button"
              type="button"
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
