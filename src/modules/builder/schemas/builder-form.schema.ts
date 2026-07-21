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
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
