import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

export function NameAndPosition() {
  const name = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.name,
  );

  const position = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.data.position,
  );

  return (
    <>
      <h1
        className="text-xl font-bold"
        data-testid="builder-preview.header.name"
      >
        {name}
      </h1>
      <p className="text-base font-medium">{position}</p>
    </>
  );
}
