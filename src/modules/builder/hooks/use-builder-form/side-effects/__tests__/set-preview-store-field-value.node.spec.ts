import type { DeepKeys } from '@tanstack/react-form';
import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';

import { SetPreviewStoreFieldValueUpdateSideEffect } from '../set-preview-store-field-value';
import type { FormApi } from '../types';

type PartialFormApi = Pick<FormApi, 'getFieldValue' | 'setFieldValue' | 'state'>;
type WorkExperienceItem = BuilderFormInput['workExperience']['items'][number];

describe('SetPreviewStoreFieldValueUpdateSideEffect', () => {
  let formApiMock: PartialFormApi;

  function setWorkExperienceItems(items: Pick<WorkExperienceItem, 'showOnBottom'>[]) {
    formApiMock.setFieldValue(
      'workExperience.items',
      items as BuilderFormInput['workExperience']['items'],
    );
  }

  beforeEach(() => {
    formApiMock = {
      getFieldValue: vi.fn().mockImplementation((fieldName) => {
        if (fieldName === 'workExperience.items') {
          return formApiMock.state.values.workExperience.items;
        }
        return undefined;
      }),
      setFieldValue: vi.fn().mockImplementation((fieldName, fieldValue) => {
        if (fieldName === 'workExperience.items') {
          formApiMock.state.values.workExperience.items =
            fieldValue as typeof formApiMock.state.values.workExperience.items;
        } else if (fieldName === 'projects.showOnBottom') {
          formApiMock.state.values.projects.showOnBottom = fieldValue as boolean;
        }
      }),
      state: vi.mocked({
        values: {
          workExperience: {
            items: [],
          },
          projects: {
            showOnBottom: false,
          },
        },
      }),
    } as unknown as PartialFormApi;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not run if the field name is not "workExperience.items[].showOnBottom"', async () => {
    const fieldName = 'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>;
    const fieldValue = true;
    const setTitleCallback = vi.fn();

    const instance = new SetPreviewStoreFieldValueUpdateSideEffect(
      fieldName,
      fieldValue,
      formApiMock,
    );

    await instance.run();

    expect(setTitleCallback).toHaveBeenCalledTimes(0);
  });

  it('should set previous work experience items showOnBottom to false if the fieldValue is false', async () => {
    const fieldName = 'workExperience.items[1].showOnBottom' satisfies DeepKeys<BuilderFormInput>;
    const fieldValue = false;

    const initialItemsState = [
      { showOnBottom: true },
      { showOnBottom: true },
      { showOnBottom: true },
    ];
    const expectedItemsState = [
      { showOnBottom: false },
      { showOnBottom: false },
      { showOnBottom: true },
    ];

    setWorkExperienceItems(initialItemsState);

    const instance = new SetPreviewStoreFieldValueUpdateSideEffect(
      fieldName,
      fieldValue,
      formApiMock,
    );

    await instance.run();

    expect(formApiMock.state.values.workExperience.items).toMatchObject(expectedItemsState);
  });

  it('should set next work experience items showOnBottom to true if fieldValue is true', async () => {
    const fieldName = 'workExperience.items[1].showOnBottom' satisfies DeepKeys<BuilderFormInput>;
    const fieldValue = true;

    const initialItemsState = [
      { showOnBottom: false },
      { showOnBottom: false },
      { showOnBottom: false },
    ];
    const expectedItemsState = [
      { showOnBottom: false },
      { showOnBottom: true },
      { showOnBottom: true },
    ];

    setWorkExperienceItems(initialItemsState);

    const instance = new SetPreviewStoreFieldValueUpdateSideEffect(
      fieldName,
      fieldValue,
      formApiMock,
    );

    await instance.run();

    expect(formApiMock.state.values.workExperience.items).toMatchObject(expectedItemsState);
  });

  it('should set projects showOnBottom to true if some work experience item showOnBottom is true', async () => {
    const fieldName = 'workExperience.items[0].showOnBottom' satisfies DeepKeys<BuilderFormInput>;
    const fieldValue = true;

    const initialItemsState = [
      { showOnBottom: false },
      { showOnBottom: false },
      { showOnBottom: false },
    ];
    const expectedItemsState = [
      { showOnBottom: true },
      { showOnBottom: true },
      { showOnBottom: true },
    ];

    setWorkExperienceItems(initialItemsState);

    const instance = new SetPreviewStoreFieldValueUpdateSideEffect(
      fieldName,
      fieldValue,
      formApiMock,
    );

    await instance.run();

    expect(formApiMock.state.values.workExperience.items).toMatchObject(expectedItemsState);
    expect(formApiMock.state.values.projects.showOnBottom).toBe(true);
  });
});
