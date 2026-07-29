import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../section-content';
import { SectionTitle } from '../section-title';
import type { SharedPreviewSectionProps } from './types';

export function LanguagesSection(props: SharedPreviewSectionProps) {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.languages.title,
  );
  const languages = useBuilderPreviewStore((state) =>
    state.resumeData.languages.items.join(', '),
  );
  const canShow = useBuilderPreviewStore(
    (state) => state.resumeData.languages.showOnBottom === props.showOnBottom,
  );

  const hasLanguages = languages.length > 0;

  if (!hasLanguages) return null;

  if (!canShow) return null;

  return (
    <div className="print:break-inside-avoid">
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs">{languages}</SectionContent>
    </div>
  );
}
