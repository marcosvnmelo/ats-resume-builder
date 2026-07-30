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
  workExperience: resumeDataSchemaV1.shape.workExperience.required({ title: true }).extend({
    items: z.array(
      resumeDataSchemaV1.shape.workExperience.shape.items.def.element.required({
        showOnBottom: true,
      }),
    ),
  }),
  projects: resumeDataSchemaV1.shape.projects.required({ title: true, showOnBottom: true }),
  technicalSkills: resumeDataSchemaV1.shape.technicalSkills.required({ title: true }),
  softSkills: resumeDataSchemaV1.shape.softSkills.required({ title: true }),
  additionalSkills: resumeDataSchemaV1.shape.additionalSkills.required({ title: true }),
  languages: resumeDataSchemaV1.shape.languages.required({ title: true, showOnBottom: true }),
  certifications: resumeDataSchemaV1.shape.certifications.required({
    title: true,
    showOnBottom: true,
  }),

  options: resumeDataSchemaV1.shape.options.required({ locale: true }),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
