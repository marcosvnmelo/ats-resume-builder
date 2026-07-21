import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from '#builder/contexts/builder-form-context.ts';

export const {
  useAppForm: useBuilderForm,
  useTypedAppFormContext: useBuilderFormContext,
  withForm: withBuilderForm,
  withFieldGroup: withBuilderFieldGroup,
} = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});
