import type { useBuilderForm } from '../use-builder-form';

export interface FieldUpdateSideEffect {
  isExpectedField(): boolean;
  run(): Promise<void>;
}

export type FormApi = ReturnType<typeof useBuilderForm>;
