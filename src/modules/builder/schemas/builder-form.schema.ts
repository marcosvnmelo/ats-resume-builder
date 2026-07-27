import * as z from 'zod';

import { resumeDataSchemaV1 } from './resume-data.schema';

export const builderFormSchema = resumeDataSchemaV1.omit({ v: true }).extend({
  import: z.object({
    file: z.file().mime('application/json').nullable(),
  }),
  personalInformation: resumeDataSchemaV1.shape.personalInformation.required({ title: true }),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
