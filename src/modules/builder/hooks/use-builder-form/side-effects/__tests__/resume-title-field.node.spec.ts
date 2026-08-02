import type { DeepKeys } from '@tanstack/react-form';
import { it, vi, expect, describe, afterEach, beforeEach } from 'vitest';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { toTitleDashCase } from '@/lib/utils';

import { ResumeTitleFieldUpdateSideEffect } from '../resume-title-field';
import type { FormApi } from '../types';

type PartialFormApi = Pick<FormApi, 'getFieldValue'>;

describe('ResumeTitleFieldUpdateSideEffect', () => {
  let formApiMock: PartialFormApi;
  const defaultTitle = 'ats-resume-builder';

  beforeEach(() => {
    formApiMock = {
      getFieldValue: vi.fn(),
    } as unknown as PartialFormApi;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not run if the field name is not "personalInformation.data.name" or "options.resumeTitleTemplate"', async () => {
    const fieldName = 'import.file' satisfies DeepKeys<BuilderFormInput>;
    const setTitleCallback = vi.fn();

    const instance = new ResumeTitleFieldUpdateSideEffect(
      fieldName,
      defaultTitle,
      formApiMock,
      setTitleCallback,
    );

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledTimes(0);
  });

  it('should return the default title if the user name is empty', async () => {
    const fieldName = 'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>;
    const setTitleCallback = vi.fn();

    vi.mocked(formApiMock.getFieldValue).mockReturnValue('');

    const instance = new ResumeTitleFieldUpdateSideEffect(
      fieldName,
      defaultTitle,
      formApiMock,
      setTitleCallback,
    );

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledWith(defaultTitle);
  });

  it('should replace template variables with the user name and project url', async () => {
    const fieldName = 'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>;

    const userName = 'MARCOS MELO';
    const titleDashCasedUserName = toTitleDashCase(userName);

    const titleTemplate = '{{user_name}} - {{project_url}}';
    const expectedTitle = `${titleDashCasedUserName} - ${import.meta.env.VITE_PROJECT_URL}`;

    const setTitleCallback = vi.fn();

    vi.mocked(formApiMock.getFieldValue).mockImplementation((fieldName) => {
      if (fieldName === 'personalInformation.data.name') {
        return userName;
      } else if (fieldName === 'options.resumeTitleTemplate') {
        return titleTemplate;
      } else {
        return '';
      }
    });

    const instance = new ResumeTitleFieldUpdateSideEffect(
      fieldName,
      defaultTitle,
      formApiMock,
      setTitleCallback,
    );

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledWith(expectedTitle);
  });
});
