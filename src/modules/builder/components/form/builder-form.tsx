import type { UpdateMetaOptions } from '@tanstack/react-form';
import React from 'react';

import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';
import { builderFormSchema } from '#builder/schemas/builder-form.schema.ts';
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
    <ScrollArea className="md:col-span-4 md:h-screen print:hidden">
      <Card className="m-(--card-spacing)">
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
              <SeparatedSections>
                <ImportExportSection form={form} fields="import" />

                <PersonalInformationSection
                  form={form}
                  fields="personalInformation"
                />

                <SocialMediaSection form={form} fields="socialMedia" />

                <SummarySection form={form} fields="summary" />

                <EducationSection form={form} fields="education" />

                <WorkExperienceSection form={form} fields="workExperience" />

                <ProjectsSection form={form} fields="projects" />

                <SkillsSection form={form} fields="skills" />

                <LanguagesSection form={form} fields="languages" />

                <CertificationsSection form={form} fields="certifications" />
              </SeparatedSections>
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
  const options: UpdateMetaOptions = { dontRunListeners: true };

  formApi.setFieldValue(
    'personalInformation',
    parsedData.personalInformation,
    options,
  );

  formApi.setFieldValue('socialMedia', parsedData.socialMedia, options);

  formApi.setFieldValue('summary', parsedData.summary, options);

  formApi.setFieldValue('education', parsedData.education, options);

  formApi.setFieldValue('workExperience', parsedData.workExperience, options);

  formApi.setFieldValue('projects', parsedData.projects, options);

  formApi.setFieldValue('skills', parsedData.skills, options);

  formApi.setFieldValue('languages', parsedData.languages, options);

  formApi.setFieldValue('certifications', parsedData.certifications, options);
}

function forceUIUpdate(formApi: Pick<FormApi, 'validateAllFields'>) {
  formApi.validateAllFields('change');
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = builderFormSchema
    .omit({ import: true })
    .parse(formApi.state.values);

  useBuilderPreviewStore.getState().setResumeData(resumeData);
}

interface SeparatedSectionsProps {
  children: React.ReactNode;
}

function SeparatedSections(props: SeparatedSectionsProps) {
  const sections = React.Children.map(props.children, (child, index) => {
    const isLastChild =
      Array.isArray(props.children) && index === props.children.length - 1;

    if (isLastChild) return child;

    return (
      <>
        {child}
        <FieldSeparator />
      </>
    );
  });

  return <FieldGroup>{sections}</FieldGroup>;
}
