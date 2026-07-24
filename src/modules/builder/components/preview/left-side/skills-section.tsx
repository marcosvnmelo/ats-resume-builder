import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function SkillsSection() {
  const skills = useBuilderPreviewStore((state) =>
    state.resumeData.skills.items.join(', '),
  );

  const title = useBuilderPreviewStore(
    (state) => state.resumeData.skills.title,
  );

  const hasSkills = skills.length > 0;

  if (!hasSkills) return null;

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs">{skills}</SectionContent>
    </div>
  );
}
