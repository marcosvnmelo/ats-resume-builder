import { CertificationsSection } from '../shared/sections/certifications-section';
import { LanguagesSection } from '../shared/sections/languages-section';
import { ProjectsSection } from '../shared/sections/projects-section';
import { WorkExperienceSection } from '../shared/sections/work-experience-section';

export function BottomSide() {
  return (
    <div className="col-span-3 space-y-2">
      <WorkExperienceSection showOnBottom={true} />

      <ProjectsSection showOnBottom={true} />

      <LanguagesSection showOnBottom={true} />

      <CertificationsSection showOnBottom={true} />
    </div>
  );
}
