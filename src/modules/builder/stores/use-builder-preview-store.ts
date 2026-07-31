import { create } from 'zustand';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';

type UnversionedResumeData = Omit<ResumeData, 'v'>;

interface State {
  resumeData: ResumeData;
}

interface Actions {
  setResumeData: (resumeData: UnversionedResumeData) => void;
}

export const useBuilderPreviewStore = create<State & Actions>((set) => ({
  resumeData: {
    v: 1 as const,
    ...defaultValues,
  },
  setResumeData: (resumeData) =>
    set({
      resumeData: {
        v: 1,
        ...resumeData,
        workExperience: {
          ...resumeData.workExperience,
          items: resumeData.workExperience.items.map((workExperience) => ({
            company: workExperience.company,
            position: workExperience.position,
            description: workExperience.description,
            keyAchievements: workExperience.keyAchievements,
            keyAchievementsList: workExperience.keyAchievements
              .split('\n')
              .map((keyAchievement) => '• ' + keyAchievement.trim()),
            startYear: workExperience.startYear,
            endYear: workExperience.endYear,
            showOnBottom: workExperience.showOnBottom,
          })),
        },
      },
    }),
}));
