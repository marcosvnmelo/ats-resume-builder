import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

export function NameAndPosition() {
  const name = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.name,
  );

  const position = useBuilderPreviewStore(
    (state) => state.resumeData.personalInformation.position,
  );

  return (
    <>
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-base font-medium">{position}</p>
    </>
  );
}
