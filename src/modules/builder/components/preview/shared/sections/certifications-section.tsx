import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../section-content';
import { SectionTitle } from '../section-title';
import type { SharedPreviewSectionProps } from './types';

export function CertificationsSection(props: SharedPreviewSectionProps) {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.certifications.title,
  );
  const certifications = useBuilderPreviewStore(
    (state) => state.resumeData.certifications.items,
  );
  const canShow = useBuilderPreviewStore(
    (state) =>
      state.resumeData.certifications.showOnBottom === props.showOnBottom,
  );

  const hasCertifications = certifications.length > 0;

  if (!hasCertifications) return null;

  if (!canShow) return null;

  return (
    <div className="print:break-inside-avoid">
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs" render={<ul />}>
        {certifications.map((certification, i) => (
          <li key={certification + i}>{certification}</li>
        ))}
      </SectionContent>
    </div>
  );
}
