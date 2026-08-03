import type { DeepKeys } from '@tanstack/react-form';
import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent, type Locator } from 'vitest/browser';

import { ImportExportSection } from '#builder/components/form/sections/import-export-section.tsx';
import { BuilderPreview } from '#builder/components/preview/builder-preview.tsx';
import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';
import { resumeDataSchema } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';
import v0ResumeData from '#tests/constants/json-resumes/v0-resume.json';
import v1ResumeData from '#tests/constants/json-resumes/v1-resume.json';

import { useBuilderForm } from '../use-builder-form';

describe('useBuilderForm', () => {
  afterEach(() => {
    resetBuilderPreviewStore();
  });

  it('should update the form when importing a file', async () => {
    const { locator } = await render(<MockBuilder renderRawStateValues />);

    await uploadResumeData(locator);

    const parsedResumeData = resumeDataSchema.parse(v1ResumeData);

    const formDataSpanLocator = locator.getByTestId('state.values');

    await expect.element(formDataSpanLocator).toBeVisible();

    const spanText = formDataSpanLocator.element().textContent;

    const parsedSpanText = JSON.parse(spanText);

    expect(parsedSpanText).toMatchObject(parsedResumeData);
  });

  it('should update the preview store when the form is updated', async () => {
    const { locator } = await render(<MockBuilder renderPreview />);

    const previewTitleLocator = locator.getByTestId(
      'builder-preview.header.name',
    );

    await expect.element(previewTitleLocator).toHaveTextContent('');

    await uploadResumeData(locator);

    await expect
      .element(previewTitleLocator)
      .toHaveTextContent(v0ResumeData.name);
  });
});

function resetBuilderPreviewStore() {
  useBuilderPreviewStore.setState(
    useBuilderPreviewStore.getInitialState(),
    true,
  );
}

interface MockBuilderProps {
  renderPreview?: boolean;
  renderRawStateValues?: boolean;
}

function MockBuilder(props: MockBuilderProps) {
  const form = useBuilderForm();

  return (
    <form.AppForm>
      <ImportExportSection form={form} fields="import" />

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

async function uploadResumeData(rootLocator: Locator) {
  const inputName = 'import.file' satisfies DeepKeys<BuilderFormInput>;
  const fileInputLocator = rootLocator.getByTestId(`input-${inputName}`);

  const file = new File([JSON.stringify(v0ResumeData)], 'resume.json', {
    type: 'application/json',
  });

  await userEvent.upload(fileInputLocator, file);
}
