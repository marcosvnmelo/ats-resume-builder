import type { UpdateMetaOptions } from '@tanstack/react-form';

import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';

import type { FieldUpdateSideEffect, FormApi } from './types';

type PartialFormApi = Pick<FormApi, 'getFieldValue' | 'setFieldValue'>;

export class SetPreviewStoreFieldValueUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private fieldValue: boolean;
  private fieldIndex: number;
  private formApi: PartialFormApi;

  private static expectedFieldNameRegex = /^workExperience\.items\[(\d+)\]\.showOnBottom$/;
  private static updateFormOptions: UpdateMetaOptions = { dontRunListeners: true };

  constructor(fieldName: string, fieldValue: boolean, formApi: PartialFormApi) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.fieldIndex = Number(
      SetPreviewStoreFieldValueUpdateSideEffect.expectedFieldNameRegex.exec(fieldName)?.[1],
    );
    this.formApi = formApi;
  }

  async run() {
    if (!this.isExpectedField()) return;

    const updatedWorkExperiences = this.getWorkExperienceWithAppliedSideEffects();

    this.setWorkExperiences(updatedWorkExperiences);

    this.updateProjects(updatedWorkExperiences);
  }

  private isExpectedField() {
    return SetPreviewStoreFieldValueUpdateSideEffect.expectedFieldNameRegex.test(this.fieldName);
  }

  private getWorkExperienceWithAppliedSideEffects() {
    const workExperiences = this.formApi.getFieldValue('workExperience.items');

    return workExperiences.map((workExperience, index) => {
      let showOnBottom: boolean;

      if (this.fieldValue === false) {
        if (index < this.fieldIndex) {
          showOnBottom = false;
        } else if (index === this.fieldIndex) {
          showOnBottom = this.fieldValue;
        } else {
          showOnBottom = workExperience.showOnBottom;
        }
      } else {
        if (index < this.fieldIndex) {
          showOnBottom = workExperience.showOnBottom;
        } else if (index === this.fieldIndex) {
          showOnBottom = this.fieldValue;
        } else {
          showOnBottom = true;
        }
      }

      return {
        ...workExperience,
        showOnBottom,
      };
    });
  }

  private setWorkExperiences(updatedWorkExperiences: ResumeData['workExperience']['items']) {
    this.formApi.setFieldValue(
      'workExperience.items',
      updatedWorkExperiences,
      SetPreviewStoreFieldValueUpdateSideEffect.updateFormOptions,
    );
  }

  private updateProjects(updatedWorkExperiences: ResumeData['workExperience']['items']) {
    const isSomeWorkExperienceShowOnBottom = updatedWorkExperiences.some(
      (workExperience) => workExperience.showOnBottom,
    );

    if (isSomeWorkExperienceShowOnBottom) {
      this.formApi.setFieldValue(
        'projects.showOnBottom',
        true,
        SetPreviewStoreFieldValueUpdateSideEffect.updateFormOptions,
      );
    }
  }
}
