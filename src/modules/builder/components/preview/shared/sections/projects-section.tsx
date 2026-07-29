import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { DateRange } from '../date-range';
import { ExternalLink } from '../external-link';
import { SectionContent } from '../section-content';
import { SectionTitle } from '../section-title';
import type { SharedPreviewSectionProps } from './types';

export function ProjectsSection(props: SharedPreviewSectionProps) {
  const title = useBuilderPreviewStore(
    (state) => state.resumeData.projects.title,
  );
  const projects = useBuilderPreviewStore(
    (state) => state.resumeData.projects.items,
  );
  const canShow = useBuilderPreviewStore(
    (state) => state.resumeData.projects.showOnBottom === props.showOnBottom,
  );

  const hasProjects = projects.length > 0;

  if (!hasProjects) return null;

  if (!canShow) return null;

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      {projects.map((item, index) => (
        <Project key={item.name + index} item={item} />
      ))}
    </div>
  );
}

interface ProjectProps {
  item: ResumeData['projects']['items'][number];
}

function Project({ item }: ProjectProps) {
  const keyAchievements = item.keyAchievements.split('\n');
  const hasAchievements = keyAchievements.length > 0;

  return (
    <div className="print:break-inside-avoid">
      <div className="flex flex-row justify-between space-y-1">
        <SectionContent className="font-bold">{item.name}</SectionContent>
        <DateRange startYear={item.startYear} endYear={item.endYear} />
      </div>

      <SectionContent
        className="text-sm"
        render={<ExternalLink href={item.link} />}
      >
        {item.link}
      </SectionContent>
      <SectionContent>{item.description}</SectionContent>

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
