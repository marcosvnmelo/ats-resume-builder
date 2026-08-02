import { it, expect, describe } from 'vitest';
import { renderHook } from 'vitest-browser-react';

import { resumeDataSchema } from '#builder/schemas/resume-data.schema.ts';
import v1ResumeData from '#tests/constants/json-resumes/v1-resume.json';

import { useBuilderPreviewStore } from '../use-builder-preview-store';

describe('useBuilderPreviewStore', () => {
  it('should add keyAchievementsList extra property to workExperience items', async () => {
    const { result, act } = await renderHook(() => useBuilderPreviewStore());

    const resumeData = resumeDataSchema.parse(v1ResumeData);

    act(() => {
      result.current.setResumeData(resumeData);
    });

    expect(resumeData).not.toMatchObject(v1ResumeData);
    expect(result.current.resumeData).toMatchObject(v1ResumeData);

    expect(result.current.resumeData.workExperience.items.length).toBeGreaterThan(0);
    expect(result.current.resumeData.workExperience.items.at(0)).toHaveProperty(
      'keyAchievementsList',
    );
  });
});
