import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { DateRange } from '../shared/date-range';
import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function WorkExperienceSection() {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.workExperience.title,
  );
  const workExperiences = useBuilderPreviewStore(
    (state) => state.resumeData.workExperience.items,
  );

  const hasWorkExperiences = workExperiences.length > 0;

  if (!hasWorkExperiences) return null;

  return (
    <div className="space-y-1">
      <SectionTitle>{title}</SectionTitle>
      {workExperiences.map((item, index) => (
        <WorkExperience key={item.company + index} item={item} />
      ))}
    </div>
  );
}

interface WorkExperienceProps {
  item: ResumeData['workExperience']['items'][number];
}

function WorkExperience({ item }: WorkExperienceProps) {
  const keyAchievements = item.keyAchievements.split('\n');
  const hasAchievements = keyAchievements.length > 0;

  return (
    <div>
      <div className="flex flex-row justify-between space-y-1">
        <SectionContent className="font-bold">{item.company}</SectionContent>
        <DateRange startYear={item.startYear} endYear={item.endYear} />
      </div>
      <SectionContent>{item.position}</SectionContent>
      <SectionContent className="hyphens-auto">
        {item.description}
      </SectionContent>

      {hasAchievements && (
        <SectionContent render={<ul />} className="list-disc ps-3.5">
          {keyAchievements.map((achievement, index) => (
            <li key={achievement + index}>{achievement}</li>
          ))}
        </SectionContent>
      )}
    </div>
  );
}
