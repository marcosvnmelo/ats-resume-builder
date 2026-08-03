import { describe, expect, it } from 'vitest';

import { defaultValues } from '#builder/constants/builder-form-options.ts';

import { builderFormSchema } from '../builder-form.schema';

describe('builderFormSchema', () => {
  it("should parse the email field if it's a empty string", () => {
    const name = 'John Doe';
    const email = '';

    const parsedData = builderFormSchema.safeParse({
      ...defaultValues,
      personalInformation: {
        ...defaultValues.personalInformation,
        data: {
          ...defaultValues.personalInformation.data,
          name,
          email,
        },
      },
    });

    expect(parsedData.success).toBe(true);
    expect(parsedData.data?.personalInformation.data.name).toBe(name);
    expect(parsedData.data?.personalInformation.data.email).toBe(email);
  });
});
