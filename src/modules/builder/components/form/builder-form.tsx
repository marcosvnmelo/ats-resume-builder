// cspell:words dont

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
import { FieldGroup, FieldSeparator } from '@/components/ui/field';

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

        const workExperienceShowOnBottomFieldRegex =
          /^workExperience\.items\[(\d+)\]\.showOnBottom$/;
        const isWorkExperienceShowOnBottomField =
          workExperienceShowOnBottomFieldRegex.test(fieldApi.name);
        if (isWorkExperienceShowOnBottomField) {
          const updatedFieldIndex = Number(
            workExperienceShowOnBottomFieldRegex.exec(fieldApi.name)?.[1],
          );

          const updatedFieldShowOnBottomValue: boolean = fieldApi.state.value;

          applyShowOnBottomValueChangeSideEffects(
            formApi,
            updatedFieldShowOnBottomValue,
            updatedFieldIndex,
          );

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

  forceFormUIRenderAfterGroupUpdate(formApi);
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

function forceFormUIRenderAfterGroupUpdate(
  formApi: Pick<FormApi, 'validateAllFields'>,
) {
  formApi.validateAllFields('change');
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = builderFormSchema
    .omit({ import: true })
    .parse(formApi.state.values);

  useBuilderPreviewStore.getState().setResumeData(resumeData);
}

function applyShowOnBottomValueChangeSideEffects(
  formApi: Pick<FormApi, 'getFieldValue' | 'setFieldValue'>,
  updatedFieldShowOnBottomValue: boolean,
  updatedFieldIndex: number,
) {
  const updatedWorkExperiences = getWorkExperienceWithAppliedSideEffects(
    formApi,
    updatedFieldShowOnBottomValue,
    updatedFieldIndex,
  );

  const isSomeWorkExperienceShowOnBottom = updatedWorkExperiences.some(
    (workExperience) => workExperience.showOnBottom,
  );

  setValuesWithSideEffects(
    formApi,
    updatedWorkExperiences,
    isSomeWorkExperienceShowOnBottom,
  );
}

function getWorkExperienceWithAppliedSideEffects(
  formApi: Pick<FormApi, 'getFieldValue'>,
  updatedFieldShowOnBottomValue: boolean,
  updatedFieldIndex: number,
) {
  const workExperiences = formApi.getFieldValue('workExperience.items');

  return workExperiences.map((workExperience, index) => {
    let showOnBottom: boolean;

    if (updatedFieldShowOnBottomValue === false) {
      if (index < updatedFieldIndex) {
        showOnBottom = false;
      } else if (index === updatedFieldIndex) {
        showOnBottom = updatedFieldShowOnBottomValue;
      } else {
        showOnBottom = workExperience.showOnBottom;
      }
    } else {
      if (index < updatedFieldIndex) {
        showOnBottom = workExperience.showOnBottom;
      } else if (index === updatedFieldIndex) {
        showOnBottom = updatedFieldShowOnBottomValue;
      } else {
        showOnBottom = true;
      }
    }

    return {
      ...workExperience,
      showOnBottom,
    };
  });
}

function setValuesWithSideEffects(
  formApi: Pick<FormApi, 'setFieldValue'>,
  updatedWorkExperiences: ResumeData['workExperience']['items'],
  isSomeWorkExperienceShowOnBottom: boolean,
) {
  const options: UpdateMetaOptions = { dontRunListeners: true };

  formApi.setFieldValue(
    'workExperience.items',
    updatedWorkExperiences,
    options,
  );

  if (isSomeWorkExperienceShowOnBottom) {
    formApi.setFieldValue('projects.showOnBottom', true, options);
  }
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
