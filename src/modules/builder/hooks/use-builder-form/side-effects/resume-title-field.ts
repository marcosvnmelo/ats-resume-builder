import type { DeepKeys } from '@tanstack/react-form';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { toTitleDashCase } from '@/lib/utils';

import type { FieldUpdateSideEffect, FormApi } from './types';

type PartialFormApi = Pick<FormApi, 'getFieldValue'>;

export class ResumeTitleFieldUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private formApi: PartialFormApi;

  private static expectedFieldNames: string[] = [
    'personalInformation.data.name',
    'options.resumeTitleTemplate',
  ] satisfies DeepKeys<BuilderFormInput>[];

  constructor(fieldName: string, formApi: PartialFormApi) {
    this.fieldName = fieldName;
    this.formApi = formApi;
  }

  async run() {
    if (!this.isExpectedField()) return;

    const userName = toTitleDashCase(this.formApi.getFieldValue('personalInformation.data.name'));
    const projectUrl = import.meta.env.VITE_PROJECT_URL;
    const resumeTitleTemplate = this.formApi.getFieldValue('options.resumeTitleTemplate');

    if (userName.length === 0) {
      window.document.title = 'ats-resume-builder';
      return;
    }

    const resumeTitle = resumeTitleTemplate
      .replace('{{user_name}}', userName)
      .replace('{{project_url}}', projectUrl);

    window.document.title = resumeTitle;
  }

  private isExpectedField() {
    return ResumeTitleFieldUpdateSideEffect.expectedFieldNames.includes(this.fieldName);
  }
}
