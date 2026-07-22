import { formOptions } from '@tanstack/react-form';

import { builderFormSchema, type BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';

export const defaultValues: BuilderFormInput = {
  import: {
    file: null,
  },
  personalInformation: {
    name: '',
    position: '',
    contactInformation: '',
    email: '',
    address: '',
    profilePicture: '',
  },
  socialMedia: {
    items: [],
  },
  summary: {
    text: '',
  },
  education: {
    items: [],
  },
  workExperience: {
    items: [],
  },
};

export const builderFormOptions = formOptions({
  formId: 'builder-form',
  defaultValues,
  validators: {
    onSubmit: builderFormSchema,
  },
});
