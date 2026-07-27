import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function CertificationsSection() {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.certifications.title,
  );
  const certifications = useBuilderPreviewStore(
    (state) => state.resumeData.certifications.items,
  );

  const hasCertifications = certifications.length > 0;

  if (!hasCertifications) return null;

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs" render={<ul />}>
        {certifications.map((certification, i) => (
          <li key={certification + i}>{certification}</li>
        ))}
      </SectionContent>
    </div>
  );
}
