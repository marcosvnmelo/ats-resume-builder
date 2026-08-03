import type { DeepKeys } from '@tanstack/react-form';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { toTitleDashCase } from '@/lib/utils';

import type { FieldUpdateSideEffect, FormApi } from './types';

type PartialFormApi = Pick<FormApi, 'getFieldValue'>;

export class ResumeTitleFieldUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private defaultTitle: string;
  private projectUrl: string;
  private formApi: PartialFormApi;
  setTitleCallback: (title: string) => void;

  private static expectedFieldNames: string[] = [
    'personalInformation.data.name',
    'options.resumeTitleTemplate',
  ] satisfies DeepKeys<BuilderFormInput>[];

  constructor(
    fieldName: string,
    defaultTitle: string,
    formApi: PartialFormApi,
    setTitleCallback: (title: string) => void,
  ) {
    this.fieldName = fieldName;
    this.defaultTitle = defaultTitle;
    this.projectUrl = import.meta.env.VITE_PROJECT_URL;
    this.formApi = formApi;
    this.setTitleCallback = setTitleCallback;
  }

  async run() {
    if (!this.isExpectedField()) return;

    const resumeTitle = this.buildResumeTitle();

    this.setTitleCallback(resumeTitle);
  }

  private isExpectedField() {
    return ResumeTitleFieldUpdateSideEffect.expectedFieldNames.includes(this.fieldName);
  }

  private buildResumeTitle() {
    const userName = this.getTitleDashCasedUserName();

    const isUserNameEmpty = userName.length === 0;
    if (isUserNameEmpty) {
      return this.defaultTitle;
    }

    const resumeTitleTemplate = this.getResumeTitleTemplate();

    return resumeTitleTemplate
      .replace('{{user_name}}', userName)
      .replace('{{project_url}}', this.projectUrl);
  }

  private getTitleDashCasedUserName() {
    return toTitleDashCase(this.formApi.getFieldValue('personalInformation.data.name'));
  }

  private getResumeTitleTemplate() {
    return this.formApi.getFieldValue('options.resumeTitleTemplate');
  }
}
