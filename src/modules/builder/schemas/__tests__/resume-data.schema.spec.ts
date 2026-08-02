import { describe, expect, it } from 'vitest';

import v0ResumeData from '#tests/constants/json-resumes/v0-resume.json';

import { resumeDataSchema } from '../resume-data.schema';

describe('resumeDataSchema', () => {
  it('should parse a v0 resume', () => {
    const parsedData = resumeDataSchema.safeParse(v0ResumeData);

    expect(parsedData.success).toBe(true);
    expect(parsedData.data).toMatchSnapshot();
  });
});
