import type { DeepKeys } from '@tanstack/react-form';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchema, type ResumeData } from '#builder/schemas/resume-data.schema.ts';
import v1ResumeData from '#tests/constants/json-resumes/v1-resume.json';

import { ImportFileFieldUpdateSideEffect } from '../import-file-field';
import type { FormApi } from '../types';

const v1ResumeDataString = JSON.stringify(v1ResumeData);
const parsedV1ResumeData = resumeDataSchema.parse(v1ResumeData);

type PartialFormApi = Pick<
  FormApi,
  'getFieldValue' | 'setFieldValue' | 'validateAllFields' | 'state'
>;

vi.mock('#builder/schemas/resume-data.schema.ts', { spy: true });

describe('ImportFileFieldUpdateSideEffect', () => {
  let formApiMock: PartialFormApi;

  function findSetFieldValueCall(fieldName: string) {
    const call = vi.mocked(formApiMock.setFieldValue).mock.calls.find(([k]) => k === fieldName);

    if (!call) return null;

    return {
      fieldName: call[0],
      value: call[1],
    };
  }

  beforeEach(() => {
    formApiMock = {
      getFieldValue: vi.fn().mockImplementation((fieldName) => {
        if (fieldName === 'options.locale') {
          return formApiMock.state.values.options.locale;
        }

        return undefined;
      }),
      setFieldValue: vi.fn().mockImplementation((fieldName, value) => {
        formApiMock.state.values[fieldName as keyof BuilderFormInput] = value;
      }),
      validateAllFields: vi.fn(),
      state: vi.mocked({
        values: {
          personalInformation: {
            data: {},
          },
        },
      }),
    } as unknown as PartialFormApi;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not run if the field name is not "import.file"', async () => {
    const instance = new ImportFileFieldUpdateSideEffect(
      'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>,
      new File([v1ResumeDataString], 'resume.json'),
      formApiMock,
      () => {},
    );

    await instance.run();

    expect(formApiMock.getFieldValue).toHaveBeenCalledTimes(0);
    expect(formApiMock.setFieldValue).toHaveBeenCalledTimes(0);
    expect(formApiMock.validateAllFields).toHaveBeenCalledTimes(0);
  });

  it('should not run if the file value is not a File', async () => {
    const instance = new ImportFileFieldUpdateSideEffect(
      'import.file' satisfies DeepKeys<BuilderFormInput>,
      undefined,
      formApiMock,
      () => {},
    );

    await instance.run();

    expect(formApiMock.getFieldValue).toHaveBeenCalledTimes(0);
    expect(formApiMock.setFieldValue).toHaveBeenCalledTimes(0);
    expect(formApiMock.validateAllFields).toHaveBeenCalledTimes(0);
  });

  it('should parse the file correctly', async () => {
    const instance = new ImportFileFieldUpdateSideEffect(
      'import.file',
      new File([v1ResumeDataString], 'resume.json'),
      formApiMock,
      () => {},
    );

    await instance.run();

    expect(resumeDataSchema.parse).toHaveBeenCalledWith(v1ResumeData);
    expect(vi.mocked(resumeDataSchema.parse).mock.results[0]?.value).toMatchObject(
      parsedV1ResumeData,
    );
  });

  it('should set the values from the file', async () => {
    const instance = new ImportFileFieldUpdateSideEffect(
      'import.file' satisfies DeepKeys<BuilderFormInput>,
      new File([v1ResumeDataString], 'resume.json'),
      formApiMock,
      () => {},
    );

    await instance.run();

    Object.keys(v1ResumeData)
      .filter((k) => k !== 'v')
      .forEach((k) => {
        const key = k as Exclude<keyof ResumeData, 'v'>;
        const call = findSetFieldValueCall(key);

        expect(call).toBeTruthy();
        expect(call?.value).toMatchObject(parsedV1ResumeData[key]);
      });
  });

  it('should trigger the name update side effect', async () => {
    const expectedName = parsedV1ResumeData.personalInformation.data.name;

    const instance = new ImportFileFieldUpdateSideEffect(
      'import.file' satisfies DeepKeys<BuilderFormInput>,
      new File([v1ResumeDataString], 'resume.json'),
      formApiMock,
      () => {},
    );

    await instance.run();

    const call = findSetFieldValueCall('personalInformation.data.name');

    expect(call).toBeTruthy();
    expect(call?.value).toEqual(expectedName);
  });

  it('should call setLocale callback with the locale value', async () => {
    const setLocaleCallback = vi.fn();
    const expectedLocale = parsedV1ResumeData.options.locale;

    const instance = new ImportFileFieldUpdateSideEffect(
      'import.file' satisfies DeepKeys<BuilderFormInput>,
      new File([v1ResumeDataString], 'resume.json'),
      formApiMock,
      setLocaleCallback,
    );

    await instance.run();

    expect(formApiMock.getFieldValue).toHaveBeenCalledWith('options.locale');
    expect(setLocaleCallback).toHaveBeenCalledWith(expectedLocale);
  });
});
