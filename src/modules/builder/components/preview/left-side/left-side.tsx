import { CertificationsSection } from './certifications-section';
import { EducationSection } from './education-section';
import { LanguagesSection } from './languages-section';
import { SkillsSection } from './skills-section';
import { SummarySection } from './summary-section';

export function LeftSide() {
  return (
    <div className="col-span-1 space-y-2">
      <SummarySection />

      <EducationSection />

      <SkillsSection />

      <LanguagesSection />

      <CertificationsSection />
    </div>
  );
}
