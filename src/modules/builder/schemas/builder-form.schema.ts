import * as z from 'zod';

import { resumeDataSchema } from './resume-data.schema';

export const builderFormSchema = z.object({
  import: z.object({
    file: z.file().mime('application/json').nullable(),
  }),
  personalInformation: resumeDataSchema.pick({
    name: true,
    position: true,
    contactInformation: true,
    email: true,
    address: true,
    profilePicture: true,
  }),
  socialMedia: z.object({
    items: resumeDataSchema.shape.socialMedia,
  }),
  summary: z.object({
    text: resumeDataSchema.shape.summary,
  }),
  education: z.object({
    items: resumeDataSchema.shape.education,
  }),
  workExperience: z.object({
    items: resumeDataSchema.shape.workExperience,
  }),
  projects: z.object({
    items: resumeDataSchema.shape.projects,
  }),
  skills: z.object({
    title: resumeDataSchema.shape.skills.def.items[0].shape.title,
    items: resumeDataSchema.shape.skills.def.items[0].shape.skills,
  }),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
