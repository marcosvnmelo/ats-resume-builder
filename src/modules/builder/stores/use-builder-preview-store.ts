import { create } from 'zustand';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';

interface State {
  resumeData: ResumeData;
}

interface Actions {
  setResumeData: (resumeData: Omit<ResumeData, 'v'>) => void;
}

export const useBuilderPreviewStore = create<State & Actions>((set) => ({
  resumeData: {
    v: 1,
    ...defaultValues,
  },
  setResumeData: (resumeData) =>
    set({
      resumeData: {
        v: 1,
        ...resumeData,
      },
    }),
}));
