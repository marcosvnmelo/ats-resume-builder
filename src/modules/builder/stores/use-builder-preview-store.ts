import { create } from 'zustand';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';

type UnversionedResumeData = Omit<ResumeData, 'v'>;

interface State {
  resumeData: UnversionedResumeData;
}

interface Actions {
  setResumeData: (resumeData: UnversionedResumeData) => void;
}

export const useBuilderPreviewStore = create<State & Actions>((set) => ({
  resumeData: {
    v: 1,
    ...defaultValues,
  },
  setResumeData: (resumeData) =>
    set({
      resumeData,
    }),
}));
