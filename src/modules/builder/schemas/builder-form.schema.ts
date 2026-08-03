import * as z from 'zod';

import { resumeDataSchemaV1, type SkillType } from './resume-data.schema';

export const builderFormSchema = resumeDataSchemaV1.omit({ v: true }).extend({
  import: z.object({
    file: z.file().mime('application/json').nullable(),
  }),
  personalInformation: resumeDataSchemaV1.shape.personalInformation.required().extend({
    data: resumeDataSchemaV1.shape.personalInformation.shape.data.required().extend({
      email: z.literal('').or(resumeDataSchemaV1.shape.personalInformation.shape.data.shape.email),
    }),
  }),

  socialMedia: resumeDataSchemaV1.shape.socialMedia.required(),

  summary: resumeDataSchemaV1.shape.summary.required(),

  education: resumeDataSchemaV1.shape.education.required(),

  workExperience: resumeDataSchemaV1.shape.workExperience.required().extend({
    items: z.array(resumeDataSchemaV1.shape.workExperience.shape.items.def.element.required()),
  }),

  projects: resumeDataSchemaV1.shape.projects.required(),

  skills: z.object({
    technical: resumeDataSchemaV1.shape.skills.shape.technical.required(),
    soft: resumeDataSchemaV1.shape.skills.shape.soft.required(),
    additional: resumeDataSchemaV1.shape.skills.shape.additional.required(),
  } satisfies Record<SkillType, unknown>),

  languages: resumeDataSchemaV1.shape.languages.required(),

  certifications: resumeDataSchemaV1.shape.certifications.required(),

  options: resumeDataSchemaV1.shape.options.required(),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
