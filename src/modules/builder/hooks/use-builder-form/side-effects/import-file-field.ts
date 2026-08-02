import type { DeepKeys } from '@tanstack/react-form';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchema, type ResumeData } from '#builder/schemas/resume-data.schema.ts';

import type { FieldUpdateSideEffect, FormApi } from './types';

export class ImportFileFieldUpdateSideEffect<
  TForm extends Pick<FormApi, 'getFieldValue' | 'setFieldValue' | 'validateAllFields' | 'state'>,
> implements FieldUpdateSideEffect {
  private fieldName: string;
  private fieldValue: File | undefined;
  private setLocaleCallback: (locale: string) => void;

  private static expectedFieldName = 'import.file' satisfies DeepKeys<BuilderFormInput>;

  private formApi: TForm;

  constructor(
    fieldName: string,
    fieldValue: File | undefined,
    formApi: TForm,
    setLocaleCallback: (locale: string) => void,
  ) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.formApi = formApi;
    this.setLocaleCallback = setLocaleCallback;
  }

  isExpectedField() {
    return this.fieldName === ImportFileFieldUpdateSideEffect.expectedFieldName;
  }

  async run() {
    if (!this.fieldValue) return;

    const parsedData = await this.parseFile(this.fieldValue);

    this.setValuesFromFile(parsedData);

    this.forceFormUIRenderAfterGroupUpdate();

    this.triggerLocaleUpdate();

    this.triggerNameUpdate();
  }

  private async parseFile(file: File) {
    const fileContent = await file.text();

    const parsedJson = JSON.parse(fileContent);

    return resumeDataSchema.parse(parsedJson);
  }

  private setValuesFromFile(parsedData: ResumeData) {
    Object.keys(parsedData).forEach((key) => {
      const dataKey = key as keyof ResumeData;
      if (dataKey !== 'v') {
        this.formApi.setFieldValue(dataKey, parsedData[dataKey]);
      }
    });
  }

  private forceFormUIRenderAfterGroupUpdate() {
    this.formApi.validateAllFields('change');
  }

  private triggerLocaleUpdate() {
    const locale = this.formApi.getFieldValue('options.locale');

    this.setLocaleCallback(locale);
  }

  private triggerNameUpdate() {
    this.formApi.setFieldValue(
      'personalInformation.data.name',
      this.formApi.state.values.personalInformation.data.name,
    );
  }
}
