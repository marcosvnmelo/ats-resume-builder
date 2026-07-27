import { createFormHook } from '@tanstack/react-form';

import { DateField } from '#builder/components/form/fields/date-field.tsx';
import { TextField } from '#builder/components/form/fields/text-field.tsx';
import { TextareaField } from '#builder/components/form/fields/textarea-field.tsx';
import { TitleField } from '#builder/components/form/fields/title-field.tsx';
import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';

export const {
  useAppForm: useBuilderForm,
  useTypedAppFormContext: useBuilderFormContext,
  withForm: withBuilderForm,
  withFieldGroup: withBuilderFieldGroup,
} = createFormHook({
  fieldComponents: {
    DateField,
    TextField,
    TextareaField,
    TitleField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
