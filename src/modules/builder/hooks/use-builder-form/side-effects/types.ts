import type { useBuilderForm } from '../use-builder-form';

export interface FieldUpdateSideEffect {
  run(): Promise<void>;
}

export type FormApi = ReturnType<typeof useBuilderForm>;
