// cspell:words dont

import { Activity } from 'react';

import { useBuilderForm } from '#builder/hooks/use-builder-form.ts';
import { useBuilderStore } from '#builder/stores/use-builder-store.ts';

import { BuilderFormSections } from './builder-form-sections';
import { BuilderFormTabs } from './builder-form-tabs';
import { BuilderOptions } from './builder-options';

export function BuilderForm() {
  const form = useBuilderForm();

  const sidebarView = useBuilderStore((state) => state.sidebarView);

  return (
    <form.AppForm>
      <BuilderFormTabs>
        <Activity mode={sidebarView === 'builder' ? 'visible' : 'hidden'}>
          <BuilderFormSections form={form} />
        </Activity>

        <Activity mode={sidebarView === 'options' ? 'visible' : 'hidden'}>
          <BuilderOptions form={form} fields="options" />
        </Activity>
      </BuilderFormTabs>
    </form.AppForm>
  );
}
