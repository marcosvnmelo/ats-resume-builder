// cspell:words dont

import { createFormHook } from '@tanstack/react-form';
import { localeInStorage, useLocale } from 'react-intlayer';

import { BooleanField } from '#builder/components/form/fields/boolean-field.tsx';
import { DateField } from '#builder/components/form/fields/date-field.tsx';
import { SelectField } from '#builder/components/form/fields/select-field.tsx';
import { TextField } from '#builder/components/form/fields/text-field.tsx';
import { TextareaField } from '#builder/components/form/fields/textarea-field.tsx';
import { TitleField } from '#builder/components/form/fields/title-field.tsx';
import { builderFormOptions } from '#builder/constants/builder-form-options.ts';
import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';
import { builderFormSchema } from '#builder/schemas/builder-form.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { ImportFileFieldUpdateSideEffect } from './side-effects/import-file-field';
import { LocaleFieldUpdateSideEffect } from './side-effects/locale-field';
import { ResumeTitleFieldUpdateSideEffect } from './side-effects/resume-title-field';
import { SetPreviewStoreFieldValueUpdateSideEffect } from './side-effects/set-preview-store-field-value';
import type { FieldUpdateSideEffect, FormApi } from './side-effects/types';

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
  const localeData = useLocale();

  return useAppForm({
    ...builderFormOptions,
    listeners: {
      onMount({ formApi }) {
        formApi.setFieldValue('options.locale', localeInStorage);
      },
      async onChange({ formApi, fieldApi }) {
        const fieldUpdateSideEffects: FieldUpdateSideEffect[] = [
          new ImportFileFieldUpdateSideEffect(
            fieldApi.name,
            fieldApi.state.value,
            formApi,
            localeData.setLocale,
          ),
          new SetPreviewStoreFieldValueUpdateSideEffect(
            fieldApi.name,
            fieldApi.state.value,
            formApi,
          ),
          new ResumeTitleFieldUpdateSideEffect(fieldApi.name, formApi, (title) => {
            window.document.title = title;
          }),
          new LocaleFieldUpdateSideEffect(
            fieldApi.name,
            fieldApi.state.value,
            localeData.setLocale,
          ),
        ];

        for (const fieldUpdateSideEffect of fieldUpdateSideEffects) {
          await fieldUpdateSideEffect.run();
        }

        if (formApi.state.isValid) {
          updatePreview(formApi);
        }
      },
      onChangeDebounceMs: 500,
    },
  });
}

function updatePreview(formApi: Pick<FormApi, 'state'>) {
  const resumeData = builderFormSchema.omit({ import: true }).parse(formApi.state.values);

  useBuilderPreviewStore.getState().setResumeData(resumeData);
}
