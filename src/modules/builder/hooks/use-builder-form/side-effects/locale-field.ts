import type { DeepKeys } from '@tanstack/react-form';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';

import type { FieldUpdateSideEffect } from './types';

export class LocaleFieldUpdateSideEffect implements FieldUpdateSideEffect {
  private fieldName: string;
  private fieldValue: string;
  private setLocaleCallback: (locale: string) => void;

  private static expectedFieldName = 'options.locale' satisfies DeepKeys<BuilderFormInput>;

  constructor(fieldName: string, fieldValue: string, setLocaleCallback: (locale: string) => void) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.setLocaleCallback = setLocaleCallback;
  }

  async run() {
    if (!this.isExpectedField()) return;

    this.setLocaleCallback(this.fieldValue);
  }

  private isExpectedField() {
    return LocaleFieldUpdateSideEffect.expectedFieldName === this.fieldName;
  }
}
