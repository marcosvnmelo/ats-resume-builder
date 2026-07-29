// cspell:words dont

import { createFormHook, type UpdateMetaOptions } from '@tanstack/react-form';

import { BooleanField } from '#builder/components/form/fields/boolean-field.tsx';
import { DateField } from '#builder/components/form/fields/date-field.tsx';
import { TextField } from '#builder/components/form/fields/text-field.tsx';
import { TextareaField } from '#builder/components/form/fields/textarea-field.tsx';
import { TitleField } from '#builder/components/form/fields/title-field.tsx';
import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';
import { builderFormSchema } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchema, type ResumeData } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

export const {
  useAppForm,
  useTypedAppFormContext: useBuilderFormContext,
  withForm: withBuilderForm,
  withFieldGroup: withBuilderFieldGroup,
} = createFormHook({
  fieldComponents: {
    BooleanField,
    DateField,
    TextField,
    TextareaField,
    TitleField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export function useBuilderForm() {
  return useAppForm({
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
        const isWorkExperienceShowOnBottomField = workExperienceShowOnBottomFieldRegex.test(
          fieldApi.name,
        );
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
}

type FormApi = ReturnType<typeof useBuilderForm>;

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

function setValuesFromFile(formApi: Pick<FormApi, 'setFieldValue'>, parsedData: ResumeData) {
  const options: UpdateMetaOptions = { dontRunListeners: true };

  formApi.setFieldValue('personalInformation', parsedData.personalInformation, options);

  formApi.setFieldValue('socialMedia', parsedData.socialMedia, options);

  formApi.setFieldValue('summary', parsedData.summary, options);

  formApi.setFieldValue('education', parsedData.education, options);

  formApi.setFieldValue('workExperience', parsedData.workExperience, options);

  formApi.setFieldValue('projects', parsedData.projects, options);

  formApi.setFieldValue('skills', parsedData.skills, options);

  formApi.setFieldValue('languages', parsedData.languages, options);

  formApi.setFieldValue('certifications', parsedData.certifications, options);
}

function forceFormUIRenderAfterGroupUpdate(formApi: Pick<FormApi, 'validateAllFields'>) {
  formApi.validateAllFields('change');
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = builderFormSchema.omit({ import: true }).parse(formApi.state.values);

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

  setValuesWithSideEffects(formApi, updatedWorkExperiences, isSomeWorkExperienceShowOnBottom);
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

  formApi.setFieldValue('workExperience.items', updatedWorkExperiences, options);

  if (isSomeWorkExperienceShowOnBottom) {
    formApi.setFieldValue('projects.showOnBottom', true, options);
  }
}
