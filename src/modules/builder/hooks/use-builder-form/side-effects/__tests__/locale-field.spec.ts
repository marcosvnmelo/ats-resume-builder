import type { DeepKeys } from '@tanstack/react-form';
import { it, expect, describe, vi } from 'vitest';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';

import { LocaleFieldUpdateSideEffect } from '../locale-field';

describe('LocaleFieldUpdateSideEffect', () => {
  it('should not run if the field name is not "options.locale"', async () => {
    const fieldName = 'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>;
    const locale = 'en';
    const setTitleCallback = vi.fn();

    const instance = new LocaleFieldUpdateSideEffect(fieldName, locale, setTitleCallback);

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledTimes(0);
  });

  it('should run if the field name is "options.locale"', async () => {
    const fieldName = 'options.locale' satisfies DeepKeys<BuilderFormInput>;
    const locale = 'en';
    const setTitleCallback = vi.fn();

    const instance = new LocaleFieldUpdateSideEffect(fieldName, locale, setTitleCallback);

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledWith(locale);
  });
});
