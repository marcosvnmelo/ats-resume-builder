import { describe, expect, it } from 'vitest';

import v0ResumeData from '#tests/constants/json-resumes/v0-resume.json';
import v1ResumeData from '#tests/constants/json-resumes/v1-resume.json';

import { resumeDataSchema, resumeExportDataSchema } from '../resume-data.schema';

describe('resumeDataSchema', () => {
  it('should parse a v0 resume', () => {
    const parsedData = resumeDataSchema.safeParse(v0ResumeData);

    expect(parsedData.success).toBe(true);
    expect(parsedData.data).toMatchSnapshot();
  });
});

describe('resumeExportDataSchema', () => {
  it('should add keyAchievementsList extra property to workExperience items', async () => {
    const resumeData = resumeDataSchema.parse(v0ResumeData);
    const resumeExportData = resumeExportDataSchema.parse(v0ResumeData);

    expect(resumeData).not.toMatchObject(v1ResumeData);
    expect(resumeExportData).toMatchObject(v1ResumeData);

    expect(resumeExportData.workExperience.items.length).toBeGreaterThan(0);
    expect(resumeExportData.workExperience.items.at(0)).toHaveProperty('keyAchievementsList');
  });
});
