import { createFormHook } from '@tanstack/react-form';

import { TextField } from '#builder/components/form/fields/text-field.tsx';
import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';

export const {
  useAppForm: useBuilderForm,
  useTypedAppFormContext: useBuilderFormContext,
  withForm: withBuilderForm,
  withFieldGroup: withBuilderFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
