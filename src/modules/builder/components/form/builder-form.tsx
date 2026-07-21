import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ImportExportFields } from './fields/import-export-fields';
import { PersonalInformationFields } from './fields/personal-information-fields';
import { SocialMediaFields } from './fields/social-media-fields-array';

export function BuilderForm() {
  const form = useBuilderForm({
    ...builderFormOptions,
    onSubmit({ value }) {
      console.log('Submitted', value);
    },
  });

  return (
    <ScrollArea className="dark md:col-span-4 md:h-screen print:hidden">
      <Card className="min-h-full rounded-none">
        <CardHeader>
          <CardTitle>ATS Resume Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppForm>
              <FieldGroup>
                <ImportExportFields form={form} fields="import" />
                <FieldSeparator />
                <PersonalInformationFields
                  form={form}
                  fields="personalInformation"
                />
                <FieldSeparator />
                <SocialMediaFields form={form} />
              </FieldGroup>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
