import { Activity } from 'react';

import { useBuilderStore } from '#builder/stores/use-builder-store.ts';

import { BuilderForm } from './form/builder-form';
import { BuilderFormToggle } from './form/builder-form-toggle';
import { BuilderPreview } from './preview/builder-preview';

export function Builder() {
  const isFormVisible = useBuilderStore((state) => state.isFormVisible);
  return (
    <>
      <div className="grid max-w-7xl justify-evenly gap-4 md:mx-auto md:h-screen md:grid-cols-10">
        <Activity mode={isFormVisible ? 'visible' : 'hidden'}>
          <BuilderForm />
        </Activity>

        <BuilderPreview />
      </div>

      <BuilderFormToggle />
    </>
  );
}
