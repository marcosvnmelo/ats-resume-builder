import * as z from 'zod';

export const builderFormSchema = z.object({
  import: z.object({
    file: z.file().mime('application/json').nullable(),
  }),
});

export type BuilderFormInput = z.input<typeof builderFormSchema>;
export type BuilderFormOutput = z.infer<typeof builderFormSchema>;
