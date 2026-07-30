import type { SkillType } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

interface SkillsSectionProps {
  skillType: SkillType;
}

export function SkillsSection(props: SkillsSectionProps) {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.skills[props.skillType].title,
  );
  const skills = useBuilderPreviewStore((state) =>
    state.resumeData.skills[props.skillType].items.join(', '),
  );

  const hasSkills = skills.length > 0;

  if (!hasSkills) return null;

  return (
    <div className="print:break-inside-avoid">
      <SectionTitle>{title}</SectionTitle>
      <SectionContent className="text-xs">{skills}</SectionContent>
    </div>
  );
}
