import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';
import {
  resumeDataSchema,
  type ResumeData,
} from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { ScrollArea } from '@/components/ui/scroll-area';

import { CertificationsSection } from './sections/certifications-section';
import { EducationSection } from './sections/education-section';
import { ImportExportSection } from './sections/import-export-section';
import { LanguagesSection } from './sections/languages-section';
import { PersonalInformationSection } from './sections/personal-information-section';
import { ProjectsSection } from './sections/projects-section';
import { SkillsSection } from './sections/skills-section';
import { SocialMediaSection } from './sections/social-media-section-array';
import { SummarySection } from './sections/summary-section';
import { WorkExperienceSection } from './sections/work-experience-section';

export function BuilderForm() {
  const form = useBuilderForm({
    ...builderFormOptions,
    listeners: {
      async onChange({ formApi, fieldApi }) {
        const isImportFileField = fieldApi.name === 'import.file';
        if (isImportFileField) {
          const file = fieldApi.state.value;

          await importResumeDataFromFile(file, formApi);

          updatePreview(formApi);
          return;
        }

        if (formApi.state.isValid) {
          updatePreview(formApi);
        }
      },
      onChangeDebounceMs: 500,
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
                <ImportExportSection form={form} fields="import" />
                <FieldSeparator />
                <PersonalInformationSection
                  form={form}
                  fields="personalInformation"
                />
                <FieldSeparator />
                <SocialMediaSection form={form} fields="socialMedia" />
                <FieldSeparator />
                <SummarySection form={form} fields="summary" />
                <FieldSeparator />
                <EducationSection form={form} fields="education" />
                <FieldSeparator />
                <WorkExperienceSection form={form} fields="workExperience" />
                <FieldSeparator />
                <ProjectsSection form={form} fields="projects" />
                <FieldSeparator />
                <SkillsSection form={form} fields="skills" />
                <FieldSeparator />
                <LanguagesSection form={form} fields="languages" />
                <FieldSeparator />
                <CertificationsSection form={form} fields="certifications" />
              </FieldGroup>
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

function inferFormApiType() {
  // oxlint-disable-next-line react-hooks/rules-of-hooks
  return useBuilderForm(builderFormOptions);
}

type FormApi = ReturnType<typeof inferFormApiType>;

async function importResumeDataFromFile(
  file: File | undefined,
  formApi: Pick<FormApi, 'setFieldValue' | 'validateAllFields'>,
) {
  if (!file) return;

  const parsedData = await parseFile(file);

  setValuesFromFile(formApi, parsedData);

  forceUIUpdate(formApi);
}

async function parseFile(file: File) {
  const fileContent = await file.text();

  const parsedJson = JSON.parse(fileContent);

  return resumeDataSchema.parse(parsedJson);
}

function setValuesFromFile(
  formApi: Pick<FormApi, 'setFieldValue'>,
  parsedData: ResumeData,
) {
  const setFieldOptions = { dontRunListeners: true };

  formApi.setFieldValue(
    'personalInformation',
    parsedData.personalInformation,
    setFieldOptions,
  );

  formApi.setFieldValue('socialMedia', parsedData.socialMedia, setFieldOptions);

  formApi.setFieldValue('summary', parsedData.summary, setFieldOptions);

  formApi.setFieldValue('education', parsedData.education, setFieldOptions);

  formApi.setFieldValue(
    'workExperience',
    parsedData.workExperience,
    setFieldOptions,
  );

  formApi.setFieldValue('projects', parsedData.projects, setFieldOptions);

  formApi.setFieldValue('skills', parsedData.skills, setFieldOptions);

  formApi.setFieldValue('languages', parsedData.languages, setFieldOptions);

  formApi.setFieldValue(
    'certifications',
    parsedData.certifications,
    setFieldOptions,
  );
}

function forceUIUpdate(formApi: Pick<FormApi, 'validateAllFields'>) {
  formApi.validateAllFields('change');
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = {
    ...formApi.state.values,
    import: undefined,
  };

  useBuilderPreviewStore.getState().setResumeData(resumeData);
}
