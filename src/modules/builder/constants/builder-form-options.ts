import { formOptions } from '@tanstack/react-form';

import { builderFormSchema, type BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchemaV1 } from '#builder/schemas/resume-data.schema.ts';

export const defaultValues: BuilderFormInput = {
  import: {
    file: null,
  },
  personalInformation: {
    title: resumeDataSchemaV1.shape.personalInformation.shape.title.def.defaultValue,
    data: {
      name: '',
      position: '',
      contactInformation: '',
      email: '',
      address: '',
      profilePicture: '',
    },
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
  projects: {
    items: [],
  },
  skills: {
    title: 'Technical Skills',
    items: [],
  },
  languages: {
    items: [],
  },
  certifications: {
    items: [],
  },
};

export const builderFormOptions = formOptions({
  formId: 'builder-form',
  defaultValues,
  validators: {
    onChange: builderFormSchema,
  },
});
