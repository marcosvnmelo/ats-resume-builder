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
  skills: {
    technical: {
      title: resumeDataSchemaV1.shape.skills.shape.technical.shape.title.def.defaultValue,
      items: [],
    },
    additional: {
      title: resumeDataSchemaV1.shape.skills.shape.additional.shape.title.def.defaultValue,
      items: [],
    },
    soft: {
      title: resumeDataSchemaV1.shape.skills.shape.soft.shape.title.def.defaultValue,
      items: [],
    },
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
    resumeTitleTemplate: resumeDataSchemaV1.shape.options.shape.resumeTitleTemplate.def.defaultValue,
    locale: resumeDataSchemaV1.shape.options.shape.locale.def.defaultValue,
    dateRangeMonthFormat:
      resumeDataSchemaV1.shape.options.shape.dateRangeMonthFormat.def.defaultValue,
  },
};

export const builderFormOptions = formOptions({
  formId: 'builder-form',
  defaultValues,
  validators: {
    onChange: builderFormSchema,
  },
});
