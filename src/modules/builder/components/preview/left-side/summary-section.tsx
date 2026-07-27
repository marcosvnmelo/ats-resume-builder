import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function SummarySection() {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.summary.title,
  );
  const summary = useBuilderPreviewStore(
    (state) => state.resumeData.summary.text,
  );

  const hasSummary = summary.length > 0;

  if (!hasSummary) return null;

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="wrap-break-word">{summary}</SectionContent>
    </div>
  );
}
