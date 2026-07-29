import * as z from 'zod';

import { resumeDataSchemaV1 } from './resume-data.schema';

export const builderFormSchema = resumeDataSchemaV1.omit({ v: true }).extend({
  import: z.object({
    file: z.file().mime('application/json').nullable(),
  }),
  personalInformation: resumeDataSchemaV1.shape.personalInformation.required({ title: true }),
  socialMedia: resumeDataSchemaV1.shape.socialMedia.required({ title: true }),
  summary: resumeDataSchemaV1.shape.summary.required({ title: true }),
  education: resumeDataSchemaV1.shape.education.required({ title: true }),
  workExperience: resumeDataSchemaV1.shape.workExperience.required({ title: true }),
  projects: resumeDataSchemaV1.shape.projects.required({ title: true }),
  skills: resumeDataSchemaV1.shape.skills.required({ title: true }),
  languages: resumeDataSchemaV1.shape.languages.required({ title: true, showOnBottom: true }),
  certifications: resumeDataSchemaV1.shape.certifications.required({
    title: true,
    showOnBottom: true,
  }),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
