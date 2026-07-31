// cspell:words dont

import { createFormHook, type UpdateMetaOptions } from '@tanstack/react-form';
import type { DeepKeys } from '@tanstack/react-form';

import { BooleanField } from '#builder/components/form/fields/boolean-field.tsx';
import { DateField } from '#builder/components/form/fields/date-field.tsx';
import { SelectField } from '#builder/components/form/fields/select-field.tsx';
import { TextField } from '#builder/components/form/fields/text-field.tsx';
import { TextareaField } from '#builder/components/form/fields/textarea-field.tsx';
import { TitleField } from '#builder/components/form/fields/title-field.tsx';
import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';
import { builderFormSchema, type BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
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
    SelectField,
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
        const fieldUpdateSideEffects: FieldUpdateSideEffect[] = [
          new ImportFileFieldUpdateSideEffect(fieldApi.name, fieldApi.state.value, formApi),
          new SetPreviewStoreFieldValueUpdateSideEffect(
            fieldApi.name,
            fieldApi.state.value,
            formApi,
          ),
          new ResumeTitleFieldUpdateSideEffect(fieldApi.name, formApi),
        ];

        for (const fieldUpdateSideEffect of fieldUpdateSideEffects) {
          if (fieldUpdateSideEffect.isExpectedField()) {
            await fieldUpdateSideEffect.run();
            break;
          }
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

interface FieldUpdateSideEffect {
  isExpectedField(): boolean;
  run(): Promise<void>;
}

class ImportFileFieldUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private fieldValue: File | undefined;

  private static expectedFieldName = 'import.file' satisfies DeepKeys<BuilderFormInput>;

  private formApi: Pick<FormApi, 'setFieldValue' | 'validateAllFields'>;

  constructor(
    fieldName: string,
    fieldValue: File | undefined,
    formApi: Pick<FormApi, 'setFieldValue' | 'validateAllFields'>,
  ) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.formApi = formApi;
  }

  isExpectedField() {
    return this.fieldName === ImportFileFieldUpdateSideEffect.expectedFieldName;
  }

  async run() {
    if (!this.fieldValue) return;

    const parsedData = await this.parseFile(this.fieldValue);

    this.setValuesFromFile(parsedData);

    this.forceFormUIRenderAfterGroupUpdate();
  }

  private async parseFile(file: File) {
    const fileContent = await file.text();

    const parsedJson = JSON.parse(fileContent);

    return resumeDataSchema.parse(parsedJson);
  }

  private setValuesFromFile(parsedData: ResumeData) {
    const options: UpdateMetaOptions = { dontRunListeners: true };

    Object.keys(parsedData).forEach((key) => {
      const dataKey = key as keyof ResumeData;
      if (dataKey !== 'v') {
    this.formApi.setFieldValue(dataKey, parsedData[dataKey], options);
}
    });
  }

  private forceFormUIRenderAfterGroupUpdate() {
    this.formApi.validateAllFields('change');
  }
}

class SetPreviewStoreFieldValueUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private fieldValue: boolean;
  private fieldIndex: number;

  private static expectedFieldNameRegex = /^workExperience\.items\[(\d+)\]\.showOnBottom$/;

  private formApi: Pick<FormApi, 'getFieldValue' | 'setFieldValue'>;

  private static updateFormOptions: UpdateMetaOptions = { dontRunListeners: true };

  constructor(
    fieldName: string,
    fieldValue: boolean,
    formApi: Pick<FormApi, 'getFieldValue' | 'setFieldValue'>,
  ) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.fieldIndex = Number(
      SetPreviewStoreFieldValueUpdateSideEffect.expectedFieldNameRegex.exec(fieldName)?.[1],
    );
    this.formApi = formApi;
  }

  isExpectedField() {
    return SetPreviewStoreFieldValueUpdateSideEffect.expectedFieldNameRegex.test(this.fieldName);
  }

  async run() {
    const updatedWorkExperiences = this.getWorkExperienceWithAppliedSideEffects();

    this.updateWorkExperiences(updatedWorkExperiences);

    this.updateProjects(updatedWorkExperiences);
  }

  private getWorkExperienceWithAppliedSideEffects() {
    const workExperiences = this.formApi.getFieldValue('workExperience.items');

    return workExperiences.map((workExperience, index) => {
      let showOnBottom: boolean;

      if (this.fieldValue === false) {
        if (index < this.fieldIndex) {
          showOnBottom = false;
        } else if (index === this.fieldIndex) {
          showOnBottom = this.fieldValue;
        } else {
          showOnBottom = workExperience.showOnBottom;
        }
      } else {
        if (index < this.fieldIndex) {
          showOnBottom = workExperience.showOnBottom;
        } else if (index === this.fieldIndex) {
          showOnBottom = this.fieldValue;
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

  private updateWorkExperiences(updatedWorkExperiences: ResumeData['workExperience']['items']) {
    this.formApi.setFieldValue(
      'workExperience.items',
      updatedWorkExperiences,
      SetPreviewStoreFieldValueUpdateSideEffect.updateFormOptions,
    );
  }

  private updateProjects(updatedWorkExperiences: ResumeData['workExperience']['items']) {
    const isSomeWorkExperienceShowOnBottom = updatedWorkExperiences.some(
      (workExperience) => workExperience.showOnBottom,
    );

    if (isSomeWorkExperienceShowOnBottom) {
      this.formApi.setFieldValue(
        'projects.showOnBottom',
        true,
        SetPreviewStoreFieldValueUpdateSideEffect.updateFormOptions,
      );
    }
  }
}

class ResumeTitleFieldUpdateSideEffect<
  TForm extends Pick<FormApi, 'getFieldValue'> = FormApi,
> implements FieldUpdateSideEffect {
  private fieldName: string;

  private static expectedFieldNames: string[] = [
    'personalInformation.data.name',
    'options.resumeTitleTemplate',
  ] satisfies DeepKeys<BuilderFormInput>[];

  private formApi: TForm;

  constructor(fieldName: string, formApi: TForm) {
    this.fieldName = fieldName;
    this.formApi = formApi;
  }

  isExpectedField() {
    return ResumeTitleFieldUpdateSideEffect.expectedFieldNames.includes(this.fieldName);
  }

  async run() {
    const userName = this.formApi.getFieldValue('personalInformation.data.name');
    const projectUrl = import.meta.env.VITE_PROJECT_URL;
    const resumeTitleTemplate = this.formApi.getFieldValue('options.resumeTitleTemplate');

    if (userName.length === 0) {
      window.document.title = 'ats-resume-builder';
      return;
    }

    const resumeTitle = resumeTitleTemplate
      .replace('{{user_name}}', userName)
      .replace('{{project_url}}', projectUrl);

    window.document.title = resumeTitle;
  }
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = builderFormSchema.omit({ import: true }).parse(formApi.state.values);

  useBuilderPreviewStore.getState().setResumeData(resumeData);
}
