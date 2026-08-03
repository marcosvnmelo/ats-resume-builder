import type { DeepKeys } from '@tanstack/react-form';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, type Locator } from 'vitest/browser';

import { ImportExportSection } from '#builder/components/form/sections/import-export-section.tsx';
import { PersonalInformationSection } from '#builder/components/form/sections/personal-information-section.tsx';
import { BuilderPreview } from '#builder/components/preview/builder-preview.tsx';
import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchema } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';
import v0ResumeData from '#tests/constants/json-resumes/v0-resume.json';
import v1ResumeData from '#tests/constants/json-resumes/v1-resume.json';
import { toTitleDashCase } from '@/lib/utils';

import { useBuilderForm } from '../use-builder-form';

describe('useBuilderForm', () => {
  afterEach(() => {
    resetBuilderPreviewStore();
  });

  it('should update the form when importing a file', async () => {
    const { locator } = await render(
      <MockBuilder renderImportExportSection renderRawStateValues />,
    );

    const formDataSpanLocator = locator.getByTestId('state.values');
    const parsedResumeData = resumeDataSchema.parse(v1ResumeData);

    await uploadResumeDataToFileInput(locator, v0ResumeData);

    await expect.element(formDataSpanLocator).toBeVisible();

    const parsedSpanData = await parseElementContent(formDataSpanLocator);

    expect(parsedSpanData).toMatchObject(parsedResumeData);
  });

  it('should update the preview store when the form is updated', async () => {
    const { locator } = await render(
      <MockBuilder renderPersonalInformationSection renderPreview />,
    );

    const userName = v0ResumeData.name;

    await assetPreviewTitleContent(locator, '');

    await fillNameInput(locator, userName);

    await assetPreviewTitleContent(locator, userName);
  });

  it('should update the page tile when side effect is triggered', async () => {
    const { locator } = await render(
      <MockBuilder renderPersonalInformationSection />,
    );

    const userName = 'MARCOS MELO';
    const titleDashCasedUserName = toTitleDashCase(userName);
    const initialTitle = window.document.title;

    await fillNameInput(locator, userName);

    await vi.waitUntil(() => window.document.title !== initialTitle);
    await expect
      .poll(() => window.document.title)
      .toContain(titleDashCasedUserName);
  });
});

function resetBuilderPreviewStore() {
  useBuilderPreviewStore.setState(
    useBuilderPreviewStore.getInitialState(),
    true,
  );
}

interface MockBuilderProps {
  renderImportExportSection?: boolean;
  renderPersonalInformationSection?: boolean;
  renderRawStateValues?: boolean;
  renderPreview?: boolean;
}

function MockBuilder(props: MockBuilderProps) {
  const form = useBuilderForm();

  return (
    <form.AppForm>
      {props.renderImportExportSection && (
        <ImportExportSection form={form} fields="import" />
      )}
      {props.renderPersonalInformationSection && (
        <PersonalInformationSection form={form} fields="personalInformation" />
      )}

      {props.renderRawStateValues && <RawStateValues />}

      {props.renderPreview && <BuilderPreview />}
    </form.AppForm>
  );
}

function RawStateValues() {
  const resumeData = useBuilderPreviewStore((s) => s.resumeData);
  const resumeDataString = JSON.stringify(resumeData);

  if (!resumeData.personalInformation.data.name) return null;

  return <span data-testid="state.values">{resumeDataString}</span>;
}

async function uploadResumeDataToFileInput(rootLocator: Locator, data: object) {
  const inputName = 'import.file' satisfies DeepKeys<BuilderFormInput>;
  const fileInputLocator = rootLocator.getByTestId(`input-${inputName}`);

  const file = new File([JSON.stringify(data)], 'resume.json', {
    type: 'application/json',
  });

  await userEvent.upload(fileInputLocator, file);
}

async function fillNameInput(rootLocator: Locator, userName: string) {
  const inputName =
    'personalInformation.data.name' satisfies DeepKeys<BuilderFormInput>;
  const nameInputLocator = rootLocator.getByTestId(`input-${inputName}`);

  await userEvent.fill(nameInputLocator, userName);
}

async function assetPreviewTitleContent(rootLocator: Locator, content: string) {
  const previewTitleLocator = rootLocator.getByTestId(
    'builder-preview.header.name',
  );

  await expect.element(previewTitleLocator).toHaveTextContent(content);
}

async function parseElementContent(locator: Locator): Promise<object> {
  const elementText = locator.element().textContent;

  return JSON.parse(elementText);
}
