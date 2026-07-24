import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

import { DateRange } from '../shared/date-range';
import { SectionContent } from '../shared/section-content';
import { SectionTitle } from '../shared/section-title';

export function EducationSection() {
  const education = useBuilderPreviewStore(
    (state) => state.resumeData.education.items,
  );

  const hasEducation = education.length > 0;

  if (!hasEducation) return null;

  return (
    <div>
      <SectionTitle>Education</SectionTitle>
      {education.map((item, index) => (
        <div key={index} className="mb-1">
          <SectionContent className="font-bold">{item.degree}</SectionContent>
          <SectionContent>{item.school}</SectionContent>
          <DateRange startYear={item.startYear} endYear={item.endYear} />
        </div>
      ))}
    </div>
  );
}
