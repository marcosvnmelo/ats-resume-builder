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
      phone: '',
      email: '',
      address: '',
      profilePicture: '',
    },
  },
  socialMedia: {
    title: resumeDataSchemaV1.shape.socialMedia.shape.title.def.defaultValue,
    items: [],
  },
  summary: {
    title: resumeDataSchemaV1.shape.summary.shape.title.def.defaultValue,
    text: '',
  },
  education: {
    title: resumeDataSchemaV1.shape.education.shape.title.def.defaultValue,
    items: [],
  },
  workExperience: {
    title: resumeDataSchemaV1.shape.workExperience.shape.title.def.defaultValue,
    items: [],
  },
  projects: {
    title: resumeDataSchemaV1.shape.projects.shape.title.def.defaultValue,
    items: [],
    showOnBottom: false,
  },
  technicalSkills: {
    title: resumeDataSchemaV1.shape.technicalSkills.shape.title.def.defaultValue,
    items: [],
  },
  additionalSkills: {
    title: resumeDataSchemaV1.shape.additionalSkills.shape.title.def.defaultValue,
    items: [],
  },
  softSkills: {
    title: resumeDataSchemaV1.shape.softSkills.shape.title.def.defaultValue,
    items: [],
  },
  languages: {
    title: resumeDataSchemaV1.shape.languages.shape.title.def.defaultValue,
    items: [],
    showOnBottom: false,
  },
  certifications: {
    title: resumeDataSchemaV1.shape.certifications.shape.title.def.defaultValue,
    items: [],
    showOnBottom: false,
  },

  options: {
    locale: 'en',
  },
};

export const builderFormOptions = formOptions({
  formId: 'builder-form',
  defaultValues,
  validators: {
    onChange: builderFormSchema,
  },
});
