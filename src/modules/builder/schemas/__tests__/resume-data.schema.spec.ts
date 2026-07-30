import { describe, expect, it } from 'vitest';

import { resumeDataSchema } from '../resume-data.schema';
import v0ResumeData from './v0-resume.json';

describe('resumeDataSchema', () => {
  it('should parse a v0 resume', () => {
    const parsedData = resumeDataSchema.safeParse(v0ResumeData);

    expect(parsedData.success).toBe(true);
    expect(parsedData.data).toMatchSnapshot();
  });
});
