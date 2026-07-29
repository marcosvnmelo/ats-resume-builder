import { CertificationsSection } from '../shared/sections/certifications-section';
import { LanguagesSection } from '../shared/sections/languages-section';
import { EducationSection } from './education-section';
import { SkillsSection } from './skills-section';
import { SummarySection } from './summary-section';

export function LeftSide() {
  return (
    <div className="col-span-1 space-y-2">
      <SummarySection />

      <EducationSection />

      <SkillsSection />

      <LanguagesSection showOnBottom={false} />

      <CertificationsSection showOnBottom={false} />
    </div>
  );
}
