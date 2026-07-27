import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function LanguagesSection() {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.languages.title,
  );
  const languages = useBuilderPreviewStore((state) =>
    state.resumeData.languages.items.join(', '),
  );

  const hasLanguages = languages.length > 0;

  if (!hasLanguages) return null;

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs">{languages}</SectionContent>
    </div>
  );
}
